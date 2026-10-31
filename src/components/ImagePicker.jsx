
import { useEffect, useState } from "react";
import {
  searchCarImages,
  clearSelectedCarImage
} from "../services/carImages";

import "./ImagePicker.css";

function ImagePicker({ car, onClose, onSelect, onReset }) {
  const [query, setQuery] = useState(
    car.imageQuery || `${car.brand} ${car.name}`
  );

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search(term) {
    setLoading(true);
    setError("");
    setImages([]);

    try {
      const results = await searchCarImages(car, term);
      setImages(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    search(car.imageQuery || `${car.brand} ${car.name}`);
  }, [car]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  function handleReset() {
    clearSelectedCarImage(car);
    onReset();
  }

  return (
    <div
      className="image-picker-overlay"
      onClick={onClose}
    >
      <div
        className="image-picker-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Escolher imagem de ${car.name}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="image-picker-header">
          <div>
            <span className="image-picker-label">
              EDITOR DE IMAGENS
            </span>

            <h2>{car.brand} {car.name}</h2>

            <p>
              Selecione a fotografia que melhor
              representa este modelo.
            </p>
          </div>

          <button
            className="image-picker-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <form
          className="image-picker-search"
          onSubmit={(event) => {
            event.preventDefault();
            search(query);
          }}
        >
          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Pesquisar imagens..."
          />

          <button type="submit" disabled={loading}>
            {loading ? "Buscando..." : "Pesquisar"}
          </button>
        </form>

        <p className="image-picker-help">
          Dica: experimente termos como
          "{car.brand} {car.name} front view"
          ou o código da geração.
        </p>

        {error && (
          <p className="image-picker-error">{error}</p>
        )}

        {loading ? (
          <div className="image-picker-status">
            Buscando fotografias...
          </div>
        ) : images.length === 0 ? (
          <div className="image-picker-status">
            Nenhuma imagem encontrada.
            Tente outra pesquisa.
          </div>
        ) : (
          <div className="image-picker-grid">
            {images.map((image) => (
              <div
                className="image-picker-option"
                key={image.source || image.url}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                />

                <div className="image-picker-info">
                  <p title={image.title}>
                    {image.title.replace(/^File:/i, "")}
                  </p>

                  <small>{image.license}</small>

                  {image.source && (
                    <a
                      href={image.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver origem e licença
                    </a>
                  )}

                  <button
                    onClick={() => onSelect(image)}
                  >
                    ✓ Escolher foto
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="image-picker-footer">
          <span>
            {images.length} imagens encontradas
          </span>

          <button onClick={handleReset}>
            Restaurar imagem automática
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImagePicker;
