import { useEffect, useMemo, useState } from "react";

import { cars } from "./data/cars";
import CarCard from "./components/CarCard";
import Garage from "./components/Garage";
import GarageExport from "./components/GarageExport";

import { getCarImage } from "./services/carImages";
import { exportCarImages } from "./services/exportImages";

import {
  generateGarageLink,
  readSharedGarage,
  clearSharedGarageUrl,
} from "./services/shareGarage";

import "./App.css";

const INITIAL_LIMIT = 12;

const STORAGE_KEYS = {
  cars: "garage_z_cars",
  capacity: "garage_z_capacity",
};

/* ==========================================
   DADOS SALVOS
========================================== */

function loadSavedGarage() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.cars) || "[]");

    if (!Array.isArray(saved)) return [];

    const validIds = new Set(cars.map((car) => car.id));

    return [...new Set(saved.map(Number))].filter((id) => validIds.has(id));
  } catch {
    return [];
  }
}

function loadSavedCapacity() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.capacity);

    if (saved === "unlimited") return "unlimited";

    if (["5", "10", "20"].includes(saved)) {
      return Number(saved);
    }
  } catch {
    // Usar capacidade padrão.
  }

  return 10;
}

/* ==========================================
   CARRO COMPARTILHADO
========================================== */

function SharedCar({ car, position }) {
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let active = true;

    setImage(null);
    setImageError(false);

    getCarImage(car)
      .then((result) => {
        if (active) setImage(result);
      })
      .catch(console.error);

    return () => {
      active = false;
    };
  }, [car]);

  return (
    <article className="garage-car">
      <div className="garage-car-photo">
        {image?.url && !imageError ? (
          <img
            src={image.url}
            alt={`${car.brand} ${car.name}`}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <span aria-hidden="true">🏎️</span>
        )}

        <span
          style={{
            position: "absolute",
            zIndex: 3,
            top: 14,
            left: 14,
            padding: "7px 12px",
            background: "rgba(0,0,0,.8)",
            borderRadius: 8,
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          VAGA {String(position).padStart(2, "0")}
        </span>
      </div>

      <div className="garage-car-info">
        <span>
          {car.brand} • {car.year}
        </span>

        <h3>{car.name}</h3>

        <p>{car.category}</p>

        <div
          style={{
            display: "grid",
            gap: 9,
            padding: "15px",
            background: "rgba(255,255,255,.035)",
            borderRadius: 10,
            fontSize: 12,
          }}
        >
          <p>Motor: {car.engine}</p>
          <p>Potência: {car.power} cv</p>
          <p>Velocidade máxima: {car.topSpeed} km/h</p>
        </div>

        {image?.source && !imageError && (
          <a
            href={image.source}
            target="_blank"
            rel="noopener noreferrer"
            title={image.license || "Ver origem"}
          >
            Fonte da fotografia
          </a>
        )}
      </div>
    </article>
  );
}

/* ==========================================
   VISUALIZAÇÃO DE GARAGEM RECEBIDA
========================================== */

function SharedGarage({ data, onBack }) {
  if (!data.valid) {
    return (
      <section className="my-garage">
        <div className="garage-heading">
          <span className="section-label">LINK COMPARTILHADO</span>
          <h2>Link inválido</h2>
          <p>{data.error}</p>
        </div>

        <button
          className="load-more-btn"
          onClick={onBack}
          style={{ marginTop: 28 }}
        >
          Voltar ao catálogo
        </button>
      </section>
    );
  }

  const totalPower = data.garage.reduce((sum, car) => sum + car.power, 0);

  const brands = new Set(data.garage.map((car) => car.brand)).size;

  return (
    <section className="my-garage">
      <div className="garage-heading">
        <span className="section-label">GARAGEM COMPARTILHADA</span>

        <h2>Uma coleção de lendas</h2>

        <p>
          Alguém montou esta garagem dos sonhos e compartilhou com você. Confira
          as máquinas escolhidas!
        </p>
      </div>

      <div className="garage-settings">
        <div className="garage-indicators">
          <div>
            <strong>{data.total}</strong>
            <span>Carros escolhidos</span>
          </div>

          <div>
            <strong>
              {data.capacity === "unlimited" ? "∞" : data.capacity}
            </strong>
            <span>Vagas totais</span>
          </div>
        </div>

        <div>
          <span
            style={{
              color: "var(--text-secondary)",
              fontSize: 12,
            }}
          >
            {brands} fabricantes • {totalPower.toLocaleString("pt-BR")} cv
            combinados
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          margin: "28px 0 36px",
        }}
      >
        <button className="load-more-btn" onClick={onBack}>
          Montar minha garagem
        </button>
      </div>

      <div className="garage-grid">
        {data.garage.map((car, index) => (
          <SharedCar key={car.id} car={car} position={index + 1} />
        ))}
      </div>
    </section>
  );
}

/* ==========================================
   APLICAÇÃO PRINCIPAL
========================================== */

function App() {
  const [sharedData, setSharedData] = useState(() => readSharedGarage(cars));

  const [page, setPage] = useState(() =>
    new URLSearchParams(window.location.search).has("garage")
      ? "shared"
      : "catalog",
  );

  const [garageIds, setGarageIds] = useState(loadSavedGarage);

  const [capacity, setCapacity] = useState(loadSavedCapacity);

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("Todas");
  const [category, setCategory] = useState("Todas");
  const [sort, setSort] = useState("name");

  const [visibleLimit, setVisibleLimit] = useState(INITIAL_LIMIT);

  const [notification, setNotification] = useState("");

  /* GARAGEM PESSOAL */

  const carMap = useMemo(() => new Map(cars.map((car) => [car.id, car])), []);

  const garage = useMemo(
    () => garageIds.map((id) => carMap.get(id)).filter(Boolean),
    [garageIds, carMap],
  );

  const brands = useMemo(
    () =>
      [...new Set(cars.map((car) => car.brand))].sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [],
  );

  const categories = useMemo(
    () =>
      [...new Set(cars.map((car) => car.category))].sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [],
  );

  const isUnlimited = capacity === "unlimited";

  const garageFull = !isUnlimited && garage.length >= capacity;

  /* SALVAR DADOS */

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.cars, JSON.stringify(garageIds));
    } catch (error) {
      console.error("Erro ao salvar garagem:", error);
    }
  }, [garageIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.capacity, String(capacity));
    } catch (error) {
      console.error("Erro ao salvar vagas:", error);
    }
  }, [capacity]);

  /* FILTROS */

  const filteredCars = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");

    return cars
      .filter((car) => {
        const content = [
          car.brand,
          car.name,
          car.year,
          car.engine,
          car.category,
        ]
          .join(" ")
          .toLocaleLowerCase("pt-BR");

        return (
          content.includes(term) &&
          (brand === "Todas" || car.brand === brand) &&
          (category === "Todas" || car.category === category)
        );
      })
      .sort((a, b) => {
        switch (sort) {
          case "year-new":
            return b.year - a.year;
          case "year-old":
            return a.year - b.year;
          case "power":
            return b.power - a.power;
          case "speed":
            return b.topSpeed - a.topSpeed;
          default:
            return `${a.brand} ${a.name}`.localeCompare(
              `${b.brand} ${b.name}`,
              "pt-BR",
            );
        }
      });
  }, [search, brand, category, sort]);

  const visibleCars = filteredCars.slice(0, visibleLimit);

  /* AÇÕES DA GARAGEM */

  function addToGarage(car) {
    if (garageIds.includes(car.id)) return;

    if (garageFull) {
      alert(
        "Sua garagem está cheia! Remova um carro " +
          "ou aumente o número de vagas.",
      );
      return;
    }

    setGarageIds((previous) => {
      if (previous.includes(car.id)) return previous;

      if (capacity !== "unlimited" && previous.length >= capacity) {
        return previous;
      }

      return [...previous, car.id];
    });

    setNotification(`${car.brand} ${car.name} adicionado!`);
  }

  function removeFromGarage(id) {
    setGarageIds((previous) => previous.filter((carId) => carId !== id));

    setNotification("Veículo removido da garagem.");
  }

  function changeCapacity(nextCapacity) {
    if (nextCapacity !== "unlimited" && garage.length > nextCapacity) {
      alert(
        `Sua garagem tem ${garage.length} carros. ` +
          `Remova alguns antes de escolher ` +
          `${nextCapacity} vagas.`,
      );
      return;
    }

    setCapacity(nextCapacity);
    setNotification("Capacidade atualizada.");
  }

  /* NAVEGAÇÃO */

  function changePage(nextPage) {
    if (page === "shared" || sharedData) {
      clearSharedGarageUrl();
      setSharedData(null);
    }

    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function changeFilter(setter, value) {
    setter(value);
    setVisibleLimit(INITIAL_LIMIT);
  }

  function resetFilters() {
    setSearch("");
    setBrand("Todas");
    setCategory("Todas");
    setSort("name");
    setVisibleLimit(INITIAL_LIMIT);
  }

  /* COMPARTILHAR GARAGEM */

  async function shareMyGarage() {
    if (garage.length === 0) {
      alert("Adicione pelo menos um carro antes de compartilhar!");
      return;
    }

    try {
      const link = generateGarageLink(garage, capacity);

      if (!navigator.clipboard?.writeText) {
        window.prompt("Copie o link da sua garagem:", link);
        return;
      }

      await navigator.clipboard.writeText(link);

      setNotification("Link copiado!");

      alert(
        "🏎️ Link da garagem copiado! " + "Agora é só enviar para seus amigos.",
      );
    } catch (error) {
      console.error(error);

      try {
        const link = generateGarageLink(garage, capacity);

        window.prompt("Copie o link da garagem:", link);
      } catch {
        alert(error.message || "Não foi possível compartilhar.");
      }
    }
  }

  /* ==========================================
     INTERFACE
  ========================================== */

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <button
            className="logo logo-button"
            onClick={() => changePage("catalog")}
            aria-label="Garagem Z — início"
          >
            GARAGEM<span>Z</span>
          </button>

          <div className="header-actions">
            <nav className="garage-nav" aria-label="Navegação principal">
              <button
                className={page === "catalog" ? "active" : ""}
                onClick={() => changePage("catalog")}
              >
                Catálogo
              </button>

              <button
                className={page === "garage" ? "active" : ""}
                onClick={() => changePage("garage")}
              >
                Minha Garagem ({garage.length})
              </button>
            </nav>

            {import.meta.env.DEV && (
              <button className="export-images-btn" onClick={exportCarImages}>
                Exportar imagens
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {page === "shared" && sharedData ? (
          <SharedGarage
            data={sharedData}
            onBack={() => changePage("catalog")}
          />
        ) : page === "garage" ? (
          <>
            <Garage
              garage={garage}
              capacity={capacity}
              onRemove={removeFromGarage}
              onCapacityChange={changeCapacity}
            />

            {garage.length > 0 && <GarageExport garage={garage} />}

            {garage.length > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "0 0 65px",
                }}
              >
                <button className="load-more-btn" onClick={shareMyGarage}>
                  🔗 Compartilhar minha garagem
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <section className="hero">
              <div className="hero-tag">1997 — 2012 | A ERA DAS LENDAS</div>

              <h1>
                GARAGEM DOS <span>SONHOS</span>
              </h1>

              <p>
                Uma geração. Máquinas inesquecíveis. Monte sua coleção dos
                sonhos com os carros que marcaram a história automotiva entre
                1997 e 2012.
              </p>

              <div className="hero-stats">
                <span>{cars.length} carros disponíveis</span>
                <span>{brands.length} fabricantes</span>
                <span>
                  {garage.length}/{isUnlimited ? "∞" : capacity} vagas ocupadas
                </span>
              </div>
            </section>

            <section className="catalog">
              <div className="section-header">
                <div>
                  <span className="section-label">ESCOLHA SUAS LENDAS</span>

                  <h2>Catálogo de carros</h2>
                </div>

                <span className="results-count">
                  {filteredCars.length} resultados
                </span>
              </div>

              <div className="catalog-filters">
                <div className="search-group">
                  <label htmlFor="car-search">Pesquisar veículo</label>

                  <input
                    id="car-search"
                    type="search"
                    value={search}
                    onChange={(event) =>
                      changeFilter(setSearch, event.target.value)
                    }
                    placeholder="Porsche, Ferrari, GT3 RS..."
                  />
                </div>

                <div className="filter-group">
                  <label htmlFor="category-filter">Categoria</label>

                  <select
                    id="category-filter"
                    value={category}
                    onChange={(event) =>
                      changeFilter(setCategory, event.target.value)
                    }
                  >
                    <option value="Todas">Todas as categorias</option>

                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="brand-filter">Fabricante</label>

                  <select
                    id="brand-filter"
                    value={brand}
                    onChange={(event) =>
                      changeFilter(setBrand, event.target.value)
                    }
                  >
                    <option value="Todas">Todas as marcas</option>

                    {brands.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="sort-filter">Ordenar por</label>

                  <select
                    id="sort-filter"
                    value={sort}
                    onChange={(event) =>
                      changeFilter(setSort, event.target.value)
                    }
                  >
                    <option value="name">Nome A–Z</option>
                    <option value="year-new">Mais recentes</option>
                    <option value="year-old">Mais antigos</option>
                    <option value="power">Maior potência</option>
                    <option value="speed">Maior velocidade</option>
                  </select>
                </div>
              </div>

              <div className="filters-footer">
                <span>
                  Exibindo {visibleCars.length} de {filteredCars.length} carros
                </span>

                <button className="reset-filters" onClick={resetFilters}>
                  Limpar filtros
                </button>
              </div>

              {visibleCars.length > 0 ? (
                <>
                  <div className="cars-grid">
                    {visibleCars.map((car) => (
                      <CarCard
                        key={car.id}
                        car={car}
                        onAdd={addToGarage}
                        isAdded={garageIds.includes(car.id)}
                      />
                    ))}
                  </div>

                  {visibleLimit < filteredCars.length && (
                    <div className="load-more-container">
                      <button
                        className="load-more-btn"
                        onClick={() =>
                          setVisibleLimit((previous) => previous + 12)
                        }
                      >
                        Carregar mais carros
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-results">
                  <h3>Nenhum carro encontrado</h3>
                  <p>Tente alterar os filtros.</p>

                  <button onClick={resetFilters}>Ver todos os carros</button>
                </div>
              )}
            </section>

            <section
              className="garage-preview"
              style={{
                marginTop: 75,
                padding: 36,
                borderRadius: 20,
                border: "1px solid var(--border)",
                background: "linear-gradient(135deg,#201820,#111218 75%)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              <div>
                <span className="section-label">SUA COLEÇÃO PARTICULAR</span>

                <h2 style={{ margin: "12px 0" }}>
                  Sua garagem. Suas escolhas.
                </h2>

                <p style={{ color: "var(--text-secondary)" }}>
                  Você já escolheu {garage.length} carros.
                </p>
              </div>

              <button
                className="load-more-btn"
                onClick={() => changePage("garage")}
              >
                Ver minha garagem
              </button>
            </section>
          </>
        )}
      </main>

      <footer
        className="site-footer"
        style={{
          borderTop: "1px solid var(--border)",
          padding: "30px 5%",
          background: "#0d0e13",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <strong>
            GARAGEM <span style={{ color: "var(--accent)" }}>Z</span>
          </strong>

          <span
            style={{
              color: "var(--text-secondary)",
              fontSize: 12,
            }}
          >
            Garagem dos Sonhos • Geração Z • 1997–2012
          </span>
        </div>
      </footer>

      <div
        role="status"
        aria-live="polite"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
        }}
      >
        {notification}
      </div>
    </div>
  );
}

export default App;
