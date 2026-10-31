
import approvedImages from "../data/approvedImages.json";

export function getApprovedCarImage(car) {
  const key = `${car.brand} | ${car.name}`;

  return approvedImages[key] || null;
}


const API_URL = "https://commons.wikimedia.org/w/api.php";

const CACHE_PREFIX = "garage_z_image_v3_";
const CHOICE_PREFIX = "garage_z_choice_v1_";

const pendingRequests = new Map();

function cacheKey(car) {
  return `${CACHE_PREFIX}${car.brand}_${car.name}`;
}

function choiceKey(car) {
  return `${CHOICE_PREFIX}${car.brand}_${car.name}`;
}

function normalize(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function scoreImage(image, car) {
  const title = normalize(image.title);
  const brand = normalize(car.brand);
  const modelWords = normalize(car.name)
    .split(" ")
    .filter((word) => word.length > 1);

  const blocked = [
    "portrait",
    "statue",
    "sculpture",
    "logo",
    "badge",
    "wheel",
    "rim",
    "engine",
    "interior",
    "toy",
    "drawing",
    "sketch",
    "poster",
    "headlight",
    "tail light",
    "grille",
  ];

  if (blocked.some((word) => title.includes(word))) {
    return -100;
  }

  let score = 0;

  if (title.includes(brand)) score += 10;

  for (const word of modelWords) {
    if (title.includes(word)) score += 6;
  }

  if (title.includes(String(car.year))) score += 2;

  if (title.includes("car")) score += 2;

  return score;
}

export async function searchCarImages(car, customQuery = "") {
  const term =
    customQuery.trim() || car.imageQuery || `${car.brand} ${car.name} car`;

  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `${term} -portrait -statue`,
    gsrnamespace: "6",
    gsrlimit: "30",
    prop: "imageinfo",
    iiprop: "url|mime|extmetadata",
    iiextmetadatafilter: "LicenseShortName",
    iiurlwidth: "850",
    format: "json",
    origin: "*",
  });

  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Erro ao consultar Wikimedia Commons");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.info || "Erro na API");
  }

  const pages = Object.values(data.query?.pages || {});

  return pages
    .filter((page) => {
      const info = page.imageinfo?.[0];

      return (
        info?.thumburl &&
        ["image/jpeg", "image/png", "image/webp"].includes(info.mime)
      );
    })
    .map((page) => {
      const info = page.imageinfo[0];

      return {
        url: info.thumburl,
        source: info.descriptionurl,
        title: page.title,
        license:
          info.extmetadata?.LicenseShortName?.value ||
          "Verificar licença na fonte",
      };
    })
    .map((image) => ({
      ...image,
      score: scoreImage(image, car),
    }))
    .filter((image) => image.score >= 0)
    .sort((a, b) => b.score - a.score);
}

export function getSelectedCarImage(car) {
  try {
    const saved = localStorage.getItem(choiceKey(car));
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function saveSelectedCarImage(car, image) {
  localStorage.setItem(choiceKey(car), JSON.stringify(image));
}

export function clearSelectedCarImage(car) {
  localStorage.removeItem(choiceKey(car));
  localStorage.removeItem(cacheKey(car));
}


export async function getCarImage(car) {
  // 1. Alterações manuais feitas no navegador
  const selected = getSelectedCarImage(car);

  if (selected) {
    return selected;
  }

  // 2. Imagens aprovadas e salvas no projeto
  const approved = getApprovedCarImage(car);

  if (approved) {
    return approved;
  }

  // 3. Imagem cadastrada diretamente no carro
  if (car.image) {
    return {
      url: car.image,
      source: null,
      title: car.name,
      license: "Verificar licença"
    };
  }

  // 4. Cache das imagens automáticas
  const key = cacheKey(car);

  try {
    const cached = localStorage.getItem(key);

    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // Continua sem cache.
  }

  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }

  // 5. Busca automática para carros sem imagem
  const request = searchCarImages(car)
    .then((images) => {
      const image = images[0] || null;

      if (image) {
        try {
          localStorage.setItem(
            key,
            JSON.stringify(image)
          );
        } catch {
          // O cache é opcional.
        }
      }

      return image;
    })
    .finally(() => {
      pendingRequests.delete(key);
    });

  pendingRequests.set(key, request);

  return request;
}
