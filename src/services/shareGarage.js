
/* ==========================================
   GARAGEM Z — COMPARTILHAMENTO
   ========================================== */

const SHARE_PARAM = "garage";
const CAPACITY_PARAM = "vagas";

const VALID_CAPACITIES = [5, 10, 20, "unlimited"];

/* ==========================================
   VALIDAR CAPACIDADE
========================================== */

function normalizeCapacity(value) {
  if (value === "unlimited") {
    return "unlimited";
  }

  const number = Number(value);

  return [5, 10, 20].includes(number)
    ? number
    : null;
}

/* ==========================================
   GERAR LINK COMPARTILHÁVEL
========================================== */

export function generateGarageLink(garage, capacity) {
  if (!Array.isArray(garage) || garage.length === 0) {
    throw new Error(
      "Adicione pelo menos um carro antes de compartilhar."
    );
  }

  const normalizedCapacity = normalizeCapacity(capacity);

  if (!VALID_CAPACITIES.includes(normalizedCapacity)) {
    throw new Error("Capacidade de garagem inválida.");
  }

  const ids = [...new Set(
    garage
      .map((car) => Number(car.id))
      .filter((id) => Number.isSafeInteger(id) && id > 0)
  )];

  if (ids.length === 0) {
    throw new Error("Nenhum veículo válido encontrado.");
  }

  if (
    normalizedCapacity !== "unlimited" &&
    ids.length > normalizedCapacity
  ) {
    throw new Error(
      "O número de carros ultrapassa o limite de vagas."
    );
  }

  const url = new URL(window.location.href);

  // Evita carregar parâmetros antigos.
  url.searchParams.delete(SHARE_PARAM);
  url.searchParams.delete(CAPACITY_PARAM);

  // IDs dos carros separados por ponto.
  url.searchParams.set(SHARE_PARAM, ids.join("."));

  url.searchParams.set(
    CAPACITY_PARAM,
    normalizedCapacity === "unlimited"
      ? "ilimitada"
      : String(normalizedCapacity)
  );

  return url.toString();
}

/* ==========================================
   LER GARAGEM COMPARTILHADA
========================================== */

export function readSharedGarage(allCars) {
  const params = new URLSearchParams(
    window.location.search
  );

  if (!params.has(SHARE_PARAM)) {
    return null;
  }

  const rawIds = params.get(SHARE_PARAM) || "";
  const rawCapacity = params.get(CAPACITY_PARAM);

  const capacity =
    rawCapacity === "ilimitada"
      ? "unlimited"
      : normalizeCapacity(rawCapacity);

  if (
    !rawIds ||
    !/^\d+(\.\d+)*$/.test(rawIds) ||
    capacity === null
  ) {
    return {
      valid: false,
      error: "Este link de garagem é inválido.",
    };
  }

  const parts = rawIds.split(".");

  if (parts.length > allCars.length) {
    return {
      valid: false,
      error: "Este link possui veículos inválidos.",
    };
  }

  const ids = [...new Set(parts.map(Number))];

  if (
    ids.some((id) =>
      !Number.isSafeInteger(id) || id <= 0
    )
  ) {
    return {
      valid: false,
      error: "Este link possui identificadores inválidos.",
    };
  }

  const carMap = new Map(
    allCars.map((car) => [car.id, car])
  );

  const sharedCars = ids
    .map((id) => carMap.get(id))
    .filter(Boolean);

  if (sharedCars.length !== ids.length) {
    return {
      valid: false,
      error: "Alguns veículos não existem no catálogo.",
    };
  }

  if (
    capacity !== "unlimited" &&
    sharedCars.length > capacity
  ) {
    return {
      valid: false,
      error: "A garagem compartilhada excede as vagas.",
    };
  }

  return {
    valid: true,
    garage: sharedCars,
    capacity,
    total: sharedCars.length,
  };
}

/* ==========================================
   REMOVER PARÂMETROS DO LINK
========================================== */

export function clearSharedGarageUrl() {
  const url = new URL(window.location.href);

  url.searchParams.delete(SHARE_PARAM);
  url.searchParams.delete(CAPACITY_PARAM);

  window.history.replaceState(
    {},
    "",
    `${url.pathname}${url.search}${url.hash}`
  );
}
