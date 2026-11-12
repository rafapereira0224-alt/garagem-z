
import approvedImages from "../data/approvedImages.json";

const API_URL = "https://commons.wikimedia.org/w/api.php";

const CACHE_PREFIX = "garage_z_image_v6_";
const CHOICE_PREFIX = "garage_z_choice_v1_";
const FAILED_PREFIX = "garage_z_failed_v1_";

const pendingRequests = new Map();

/* =========================================
   ARMAZENAMENTO SEGURO
========================================= */

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Armazenamento indisponível.
  }
}

/* =========================================
   CHAVES
========================================= */

function carKey(car) {
  return `${car.brand}_${car.name}`;
}

function cacheKey(car) {
  return `${CACHE_PREFIX}${carKey(car)}`;
}

function choiceKey(car) {
  return `${CHOICE_PREFIX}${carKey(car)}`;
}

function failedKey(car) {
  return `${FAILED_PREFIX}${carKey(car)}`;
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/* =========================================
   VALIDAÇÃO
========================================= */

function isValidImageUrl(url) {
  if (typeof url !== "string" || !url.trim()) {
    return false;
  }

  try {
    const parsed = new URL(url);

    return (
      parsed.protocol === "https:" &&
      /\.(jpg|jpeg|png|webp)$/i.test(parsed.pathname)
    );
  } catch {
    return false;
  }
}

function isValidImage(image) {
  return Boolean(image && isValidImageUrl(image.url));
}

/* =========================================
   IMAGENS APROVADAS
========================================= */

export function getApprovedCarImage(car) {
  const key = `${car.brand} | ${car.name}`;
  const approved = approvedImages[key];

  if (!approved || !isValidImageUrl(approved.url)) {
    return null;
  }

  return {
    ...approved,
    source: approved.source || null,
    title: approved.title || car.name,
    license: approved.license || "Verificar licença"
  };
}

/* =========================================
   IMAGENS COM ERRO
========================================= */

function getFailedImages(car) {
  try {
    const value = JSON.parse(
      readStorage(failedKey(car)) || "[]"
    );

    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function isFailedImage(car, image) {
  if (!image?.url) return true;

  return getFailedImages(car).includes(image.url);
}

function registerFailedImage(car, image) {
  if (!image?.url) return;

  const failed = getFailedImages(car);

  if (!failed.includes(image.url)) {
    failed.push(image.url);

    writeStorage(
      failedKey(car),
      JSON.stringify(failed)
    );
  }

  for (const key of [cacheKey(car), choiceKey(car)]) {
    try {
      const saved = readStorage(key);

      if (saved && JSON.parse(saved)?.url === image.url) {
        removeStorage(key);
      }
    } catch {
      removeStorage(key);
    }
  }
}

export function reportCarImageError(car, image) {
  registerFailedImage(car, image);
}

export function clearCarImageErrors(car) {
  removeStorage(failedKey(car));
  removeStorage(cacheKey(car));
}

/* =========================================
   PONTUAÇÃO DAS IMAGENS
========================================= */

function scoreImage(image, car) {
  const title = normalize(image.title);
  const brand = normalize(car.brand);

  const modelWords = normalize(car.name)
    .split(" ")
    .filter((word) => word.length > 1);

  const titleWords = title.split(" ");

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
    "grille",
    "dashboard",
    "steering",
    "miniature",
    "render"
  ];

  if (blocked.some((word) => titleWords.includes(word))) {
    return -100;
  }

  if (!title.includes(brand)) {
    return -100;
  }

  let score = 12;
  let matchedModelWords = 0;

  for (const word of modelWords) {
    if (titleWords.includes(word)) {
      matchedModelWords++;
      score += 7;
    }
  }

  if (matchedModelWords === 0) {
    return -100;
  }

  // Exige correspondência mais forte para evitar
  // trocar uma versão especial por uma versão comum.
  const matchRatio =
    matchedModelWords / Math.max(modelWords.length, 1);

  if (matchRatio < 0.6) {
    return -100;
  }

  if (titleWords.includes(String(car.year))) {
    score += 3;
  }

  if (matchRatio === 1) {
    score += 15;
  }

  return score;
}

/* =========================================
   BUSCA NA WIKIMEDIA COMMONS
========================================= */

export async function searchCarImages(
  car,
  customQuery = ""
) {
  const term =
    String(customQuery || "").trim() ||
    car.imageQuery ||
    `${car.brand} ${car.name}`;

  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `${term} filetype:bitmap`,
    gsrnamespace: "6",
    gsrlimit: "50",
    prop: "imageinfo",
    iiprop: "url|mime|extmetadata",
    iiextmetadatafilter: "LicenseShortName",
    iiurlwidth: "1000",
    format: "json",
    origin: "*"
  });

  const response = await fetch(
    `${API_URL}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao consultar Wikimedia Commons: ${response.status}`
    );
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(
      data.error.info || "Erro na API Wikimedia"
    );
  }

  const pages = Object.values(data.query?.pages || {});

  return pages
    .filter((page) => {
      const info = page.imageinfo?.[0];

      return (
        info?.thumburl &&
        ["image/jpeg", "image/png", "image/webp"].includes(
          info.mime
        )
      );
    })
    .map((page) => {
      const info = page.imageinfo[0];

      return {
        url: info.thumburl,
        source: info.descriptionurl || null,
        title: page.title,
        license:
          info.extmetadata?.LicenseShortName?.value ||
          "Verificar licença na fonte"
      };
    })
    .map((image) => ({
      ...image,
      score: scoreImage(image, car)
    }))
    .filter(
      (image) =>
        image.score >= 19 &&
        isValidImage(image) &&
        !isFailedImage(car, image)
    )
    .sort((a, b) => b.score - a.score);
}

/* =========================================
   ESCOLHA MANUAL
========================================= */

export function getSelectedCarImage(car) {
  try {
    const saved = readStorage(choiceKey(car));

    if (!saved) return null;

    const image = JSON.parse(saved);

    return (
      isValidImage(image) &&
      !isFailedImage(car, image)
    )
      ? image
      : null;
  } catch {
    return null;
  }
}

export function saveSelectedCarImage(car, image) {
  if (!isValidImage(image)) {
    throw new Error("URL de imagem inválida");
  }

  const failed = getFailedImages(car);

  if (failed.includes(image.url)) {
    writeStorage(
      failedKey(car),
      JSON.stringify(
        failed.filter((url) => url !== image.url)
      )
    );
  }

  writeStorage(
    choiceKey(car),
    JSON.stringify(image)
  );

  removeStorage(cacheKey(car));
}

export function clearSelectedCarImage(car) {
  removeStorage(choiceKey(car));
  removeStorage(cacheKey(car));
}

/* =========================================
   IMAGEM PRINCIPAL
========================================= */

export async function getCarImage(car) {
  // 1. Escolha manual
  const selected = getSelectedCarImage(car);

  if (selected) {
    return selected;
  }

  // 2. Imagem aprovada
  const approved = getApprovedCarImage(car);

  if (
    approved &&
    !isFailedImage(car, approved)
  ) {
    return approved;
  }

  // 3. Imagem cadastrada diretamente
  if (isValidImageUrl(car.image)) {
    const direct = {
      url: car.image,
      source: null,
      title: car.name,
      license: "Verificar licença"
    };

    if (!isFailedImage(car, direct)) {
      return direct;
    }
  }

  // 4. Cache automático
  const key = cacheKey(car);

  try {
    const saved = readStorage(key);

    if (saved) {
      const image = JSON.parse(saved);

      if (
        isValidImage(image) &&
        !isFailedImage(car, image)
      ) {
        return image;
      }

      removeStorage(key);
    }
  } catch {
    removeStorage(key);
  }

  // 5. Evita buscas duplicadas
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }

  // 6. Busca automática
  const request = searchCarImages(car)
    .then((images) => {
      const image = images[0] || null;

      if (!image) {
        return null;
      }

      writeStorage(
        key,
        JSON.stringify(image)
      );

      return image;
    })
    .catch((error) => {
      console.warn(
        `Não foi possível buscar imagem para ${car.brand} ${car.name}:`,
        error
      );

      return null;
    })
    .finally(() => {
      pendingRequests.delete(key);
    });

  pendingRequests.set(key, request);

  return request;
}
