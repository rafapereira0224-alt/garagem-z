import { useEffect, useState } from "react";

import {
  getCarImage,
  saveSelectedCarImage,
  getSelectedCarImage,
} from "../services/carImages";

import ImagePicker from "./ImagePicker";
import "./CarCard.css";

/* ==========================================
   ÍCONES
========================================== */

function EngineIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 4h8M12 4v3M4 10H2v6h2M20 10h2v6h-2" />
      <path d="M6 8h12l2 3v7H7l-3-4v-4z" />
      <path d="M9 12h5" />
    </svg>
  );
}

function PowerIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m13 2-9 12h7l-1 8 10-12h-7z" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 17a9 9 0 1 1 14 0" />
      <path d="m12 13 4-5" />
      <circle cx="12" cy="13" r="1" />
      <path d="M7 20h10" />
    </svg>
  );
}

/* ==========================================
   COMPONENTE PRINCIPAL
========================================== */

function CarCard({ car, onAdd, isAdded }) {
  const [imageData, setImageData] = useState(() => getSelectedCarImage(car));

  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const [imageVersion, setImageVersion] = useState(0);

  /* CARREGAR IMAGEM */

  useEffect(() => {
    let active = true;

    setLoading(true);
    setImageError(false);

    const savedImage = getSelectedCarImage(car);
    setImageData(savedImage);

    getCarImage(car)
      .then((result) => {
        if (!active) return;

        setImageData(result);
      })
      .catch((error) => {
        if (!active) return;

        console.error(`Erro ao carregar ${car.brand} ${car.name}:`, error);

        setImageData(null);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [car, imageVersion]);

  /* ESCOLHER UMA FOTO */

  function selectImage(image) {
    try {
      saveSelectedCarImage(car, image);

      setImageData(image);
      setImageError(false);
      setLoading(false);
      setPickerOpen(false);
    } catch (error) {
      console.error("Erro ao salvar imagem:", error);

      alert(
        "Não foi possível salvar essa imagem. " +
          "Verifique o armazenamento do navegador.",
      );
    }
  }

  /* RESTAURAR FOTO AUTOMÁTICA */

  function resetImage() {
    setPickerOpen(false);
    setImageVersion((previous) => previous + 1);
  }

  /* DADOS DO VEÍCULO */

  const fullName = `${car.brand} ${car.name}`;

  const hasImage = Boolean(imageData?.url && !imageError);

  const specifications = [
    {
      label: "Motor",
      value: car.engine,
      icon: <EngineIcon />,
    },
    {
      label: "Potência",
      value: `${car.power} cv`,
      icon: <PowerIcon />,
    },
    {
      label: "Velocidade máxima",
      value: `${car.topSpeed} km/h`,
      icon: <SpeedIcon />,
    },
  ];

  /* RENDERIZAÇÃO */

  return (
    <>
      <article className={`car-card ${isAdded ? "car-card-selected" : ""}`}>
        {/* FOTO DO CARRO */}

        <div className="car-image">
          {hasImage ? (
            <img
              src={imageData.url}
              alt={fullName}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="car-placeholder" role="status">
              <span aria-hidden="true">🏎️</span>

              <p>
                {loading ? "Carregando fotografia..." : "Imagem indisponível"}
              </p>
            </div>
          )}

          {/* ANO */}

          <span className="car-year">{car.year}</span>

          {/* EDITOR DE FOTOS */}

          {import.meta.env.DEV && (
            <button
              type="button"
              className="edit-car-image"
              onClick={() => setPickerOpen(true)}
              aria-label={`Editar fotografia de ${fullName}`}
              title="Escolher outra fotografia"
            >
              ✎ Editar foto
            </button>
          )}

          {/* CRÉDITOS DA IMAGEM */}

          {hasImage && imageData?.source && (
            <a
              href={imageData.source}
              target="_blank"
              rel="noopener noreferrer"
              className="car-photo-source"
              title={
                imageData.license
                  ? `Licença: ${imageData.license}`
                  : "Ver informações da imagem"
              }
            >
              Fonte da foto
            </a>
          )}
        </div>

        {/* CONTEÚDO */}

        <div className="car-content">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            <span className="car-brand" style={{ marginBottom: 0 }}>
              {car.brand}
            </span>

            <span
              style={{
                padding: "5px 9px",
                color: "#bfc0ca",
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              {car.category}
            </span>
          </div>

          <h3>{car.name}</h3>

          {/* FICHA TÉCNICA */}

          <div className="car-specs">
            {specifications.map((spec) => (
              <div key={spec.label}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      color: "var(--accent)",
                    }}
                  >
                    {spec.icon}
                  </span>

                  {spec.label}
                </span>

                <strong>{spec.value}</strong>
              </div>
            ))}
          </div>

          {/* ADICIONAR À GARAGEM */}

          <button
            type="button"
            className={`add-car-btn ${isAdded ? "added" : ""}`}
            onClick={() => onAdd(car)}
            disabled={isAdded}
            aria-label={
              isAdded
                ? `${fullName} já está na garagem`
                : `Adicionar ${fullName} à garagem`
            }
          >
            {isAdded ? "✓ Na minha garagem" : "+ Adicionar à garagem"}
          </button>
        </div>
      </article>

      {/* MODAL DE SELEÇÃO DE FOTOS */}

      {pickerOpen && import.meta.env.DEV && (
        <ImagePicker
          car={car}
          onClose={() => setPickerOpen(false)}
          onSelect={selectImage}
          onReset={resetImage}
        />
      )}
    </>
  );
}

export default CarCard;
