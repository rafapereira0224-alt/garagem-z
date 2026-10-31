
import { useEffect, useState } from "react";
import { getCarImage } from "../services/carImages";
import "./Garage.css";

/* ==========================================
   CARD DE UM CARRO DA GARAGEM
========================================== */

function GarageCar({ car, position, onRemove }) {
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    setImage(null);
    setImageError(false);
    setLoading(true);

    getCarImage(car)
      .then((result) => {
        if (active) setImage(result);
      })
      .catch((error) => {
        if (active) {
          console.error(
            `Erro ao carregar ${car.brand} ${car.name}:`,
            error
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [car]);

  const fullName = `${car.brand} ${car.name}`;

  return (
    <article className="garage-car">
      {/* FOTOGRAFIA */}

      <div className="garage-car-photo">
        {image?.url && !imageError ? (
          <img
            src={image.url}
            alt={fullName}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              color: "#9293a0",
            }}
          >
            <span aria-hidden="true">🏎️</span>

            <small style={{ fontSize: "12px" }}>
              {loading
                ? "Carregando imagem..."
                : "Imagem indisponível"}
            </small>
          </div>
        )}

        {/* NÚMERO DA VAGA */}

        <span
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            zIndex: 3,
            padding: "7px 12px",
            background: "rgba(12, 13, 18, 0.85)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
            color: "white",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "1px",
          }}
        >
          VAGA {String(position).padStart(2, "0")}
        </span>

        {/* ANO */}

        <span
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            zIndex: 3,
            padding: "7px 11px",
            background: "var(--accent)",
            borderRadius: "8px",
            color: "white",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          {car.year}
        </span>
      </div>

      {/* INFORMAÇÕES */}

      <div className="garage-car-info">
        <span>{car.brand}</span>

        <h3>{car.name}</h3>

        {/* CATEGORIA */}

        <div>
          <span
            style={{
              display: "inline-flex",
              padding: "6px 11px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "7px",
              color: "#c3c4ce",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.3px",
              textTransform: "none",
            }}
          >
            {car.category}
          </span>
        </div>

        {/* FICHA TÉCNICA */}

        <div
          style={{
            display: "grid",
            gap: "10px",
            margin: "8px 0",
            padding: "15px",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "11px",
          }}
        >
          {[
            ["Motor", car.engine],
            ["Potência", `${car.power} cv`],
            [
              "Velocidade máxima",
              `${car.topSpeed} km/h`,
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <small
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "11px",
                }}
              >
                {label}
              </small>

              <strong
                style={{
                  color: "#f5f5f8",
                  fontSize: "11px",
                  textAlign: "right",
                }}
              >
                {value}
              </strong>
            </div>
          ))}
        </div>

        {/* CRÉDITOS */}

        {image?.source && !imageError && (
          <a
            href={image.source}
            target="_blank"
            rel="noopener noreferrer"
            title={
              image.license
                ? `Licença: ${image.license}`
                : "Consultar origem da fotografia"
            }
          >
            Fonte da fotografia
          </a>
        )}

        {/* REMOVER */}

        <button
          type="button"
          onClick={() => onRemove(car.id)}
          aria-label={`Remover ${fullName} da garagem`}
        >
          Remover da garagem
        </button>
      </div>
    </article>
  );
}

/* ==========================================
   PÁGINA MINHA GARAGEM
========================================== */

function Garage({
  garage,
  capacity,
  onRemove,
  onCapacityChange,
}) {
  const isUnlimited = capacity === "unlimited";

  const totalCars = garage.length;

  const remaining = isUnlimited
    ? null
    : Math.max(0, capacity - totalCars);

  const occupancy = isUnlimited
    ? 0
    : Math.min(100, (totalCars / capacity) * 100);

  const totalPower = garage.reduce(
    (total, car) => total + car.power,
    0
  );

  const uniqueBrands = new Set(
    garage.map((car) => car.brand)
  ).size;

  const mostPowerful = garage.reduce(
    (best, car) =>
      !best || car.power > best.power ? car : best,
    null
  );

  return (
    <section className="my-garage">
      {/* CABEÇALHO */}

      <div className="garage-heading">
        <span className="section-label">
          SUA COLEÇÃO PARTICULAR
        </span>

        <h2>Minha Garagem</h2>

        <p>
          Os carros que fizeram história. As máquinas
          que você sempre sonhou em ter. Aqui, cada vaga
          representa uma escolha sua.
        </p>
      </div>

      {/* CONFIGURAÇÕES E INDICADORES */}

      <div className="garage-settings">
        <div>
          <label htmlFor="garage-capacity">
            Capacidade da garagem
          </label>

          <select
            id="garage-capacity"
            value={capacity}
            onChange={(event) => {
              const value = event.target.value;

              onCapacityChange(
                value === "unlimited"
                  ? "unlimited"
                  : Number(value)
              );
            }}
          >
            <option value="5">5 vagas</option>
            <option value="10">10 vagas</option>
            <option value="20">20 vagas</option>
            <option value="unlimited">
              Vagas ilimitadas
            </option>
          </select>
        </div>

        <div className="garage-indicators">
          <div>
            <strong>{totalCars}</strong>
            <span>Carros escolhidos</span>
          </div>

          <div>
            <strong>
              {isUnlimited ? "∞" : remaining}
            </strong>
            <span>Vagas disponíveis</span>
          </div>
        </div>
      </div>

      {/* OCUPAÇÃO DA GARAGEM */}

      {!isUnlimited && (
        <div
          className="garage-progress"
          role="progressbar"
          aria-label="Ocupação da garagem"
          aria-valuemin={0}
          aria-valuemax={capacity}
          aria-valuenow={totalCars}
        >
          <div
            style={{
              width: `${occupancy}%`,
            }}
          />
        </div>
      )}

      {/* ESTATÍSTICAS DA COLEÇÃO */}

      {totalCars > 0 && (
        <div
          className="garage-summary"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "15px",
            margin: "22px 0 38px",
          }}
        >
          {[
            {
              title: "Fabricantes",
              value: uniqueBrands,
              detail: "Marcas na coleção",
            },
            {
              title: "Potência combinada",
              value: `${totalPower.toLocaleString(
                "pt-BR"
              )} cv`,
              detail: "Soma das potências",
            },
            {
              title: "Mais potente",
              value: `${mostPowerful.power} cv`,
              detail: `${mostPowerful.brand} ${mostPowerful.name}`,
            },
          ].map((stat) => (
            <div
              key={stat.title}
              style={{
                padding: "23px",
                background:
                  "linear-gradient(150deg, #1b1c25, #121319)",
                border: "1px solid var(--border)",
                borderRadius: "15px",
              }}
            >
              <span
                style={{
                  display: "block",
                  marginBottom: "10px",
                  color: "var(--text-secondary)",
                  fontSize: "12px",
                  fontWeight: 650,
                }}
              >
                {stat.title}
              </span>

              <strong
                style={{
                  display: "block",
                  color: "var(--accent)",
                  fontSize: "clamp(25px, 3vw, 32px)",
                  fontWeight: 900,
                  letterSpacing: "-1px",
                }}
              >
                {stat.value}
              </strong>

              <small
                style={{
                  display: "block",
                  marginTop: "7px",
                  color: "var(--text-secondary)",
                  fontSize: "11px",
                  overflowWrap: "anywhere",
                }}
              >
                {stat.detail}
              </small>
            </div>
          ))}
        </div>
      )}

      {/* CONTEÚDO DA GARAGEM */}

      {totalCars === 0 ? (
        <div className="garage-empty">
          <div aria-hidden="true">🏎️</div>

          <h3>Sua garagem está vazia!</h3>

          <p>
            Toda garagem lendária começa com uma
            primeira escolha. Explore o catálogo e
            selecione suas máquinas favoritas.
          </p>
        </div>
      ) : (
        <>
          {/* TÍTULO DA COLEÇÃO */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "14px",
              marginBottom: "24px",
            }}
          >
            <div>
              <span className="section-label">
                SHOWROOM PARTICULAR
              </span>

              <h3
                style={{
                  marginTop: "9px",
                  fontSize: "clamp(22px, 3vw, 30px)",
                }}
              >
                Sua coleção de lendas
              </h3>
            </div>

            <span
              style={{
                color: "var(--text-secondary)",
                fontSize: "12px",
              }}
            >
              {totalCars} de{" "}
              {isUnlimited ? "∞" : capacity} vagas
            </span>
          </div>

          {/* CARROS */}

          <div className="garage-grid">
            {garage.map((car, index) => (
              <GarageCar
                key={car.id}
                car={car}
                position={index + 1}
                onRemove={onRemove}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Garage;
