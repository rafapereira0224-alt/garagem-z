
import { useState } from "react";

/* ==========================================
   GARAGEM Z — EXPORTADOR DE IMAGENS
   Canvas API, sem bibliotecas externas
========================================== */

const FORMATS = {
  square: {
    width: 1080,
    height: 1080,
    label: "Quadrado",
  },
  story: {
    width: 1080,
    height: 1920,
    label: "Vertical",
  },
};

function roundedRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);

  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
}

function fitText(ctx, text, maxWidth, initialSize, minSize = 22) {
  let size = initialSize;

  do {
    ctx.font = `800 ${size}px Arial`;

    if (ctx.measureText(text).width <= maxWidth) {
      break;
    }

    size -= 2;
  } while (size > minSize);

  return size;
}

function drawCover(ctx, img, x, y, w, h) {
  const scale = Math.max(
    w / img.width,
    h / img.height
  );

  const sw = w / scale;
  const sh = h / scale;

  const sx = (img.width - sw) / 2;
  const sy = (img.height - sh) / 2;

  ctx.drawImage(
    img,
    sx,
    sy,
    sw,
    sh,
    x,
    y,
    w,
    h
  );
}

function loadImage(url) {
  return new Promise((resolve) => {
    if (!url) {
      resolve(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);

    img.src = url;
  });
}

/* ==========================================
   DESENHAR CARD DO CARRO
========================================== */

function drawCarCard(
  ctx,
  car,
  img,
  x,
  y,
  width,
  height,
  index
) {
  ctx.save();

  roundedRect(ctx, x, y, width, height, 20);
  ctx.clip();

  ctx.fillStyle = "#191b24";
  ctx.fillRect(x, y, width, height);

  const photoHeight = height * 0.68;

  if (img) {
    drawCover(
      ctx,
      img,
      x,
      y,
      width,
      photoHeight
    );
  } else {
    ctx.fillStyle = "#242631";
    ctx.fillRect(x, y, width, photoHeight);

    ctx.fillStyle = "#a0a0ad";
    ctx.font = "700 25px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "GARAGEM Z",
      x + width / 2,
      y + photoHeight / 2
    );
    ctx.textAlign = "left";
  }

  // Degradê sobre a fotografia
  const gradient = ctx.createLinearGradient(
    x,
    y,
    x,
    y + photoHeight
  );

  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, "rgba(0,0,0,0.6)");

  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, photoHeight);

  // Número da vaga
  ctx.fillStyle = "rgba(8,9,13,0.85)";
  roundedRect(ctx, x + 15, y + 15, 98, 36, 8);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 17px Arial";
  ctx.fillText(
    `VAGA ${String(index + 1).padStart(2, "0")}`,
    x + 25,
    y + 39
  );

  // Informações
  const textY = y + photoHeight + 31;

  ctx.fillStyle = "#fa4057";
  ctx.font = "800 18px Arial";
  ctx.fillText(
    car.brand.toUpperCase(),
    x + 18,
    textY
  );

  const fontSize = fitText(
    ctx,
    car.name,
    width - 36,
    29,
    17
  );

  ctx.fillStyle = "#ffffff";
  ctx.font = `800 ${fontSize}px Arial`;
  ctx.fillText(
    car.name,
    x + 18,
    textY + 36,
    width - 36
  );

  ctx.fillStyle = "#b5b6c2";
  ctx.font = "500 17px Arial";
  ctx.fillText(
    `${car.year}  •  ${car.power} cv`,
    x + 18,
    y + height - 17
  );

  ctx.restore();
}

/* ==========================================
   DESENHAR IMAGEM COMPLETA
========================================== */

async function generateImage(garage, format, onProgress) {
  const config = FORMATS[format];

  const canvas = document.createElement("canvas");
  canvas.width = config.width;
  canvas.height = config.height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Não foi possível iniciar o Canvas.");
  }

  const W = canvas.width;
  const H = canvas.height;

  // Fundo
  ctx.fillStyle = "#08090e";
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(
    W / 2,
    100,
    50,
    W / 2,
    100,
    800
  );

  glow.addColorStop(0, "rgba(237,49,71,0.19)");
  glow.addColorStop(1, "rgba(237,49,71,0)");

  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Identidade
  ctx.textAlign = "center";

  ctx.fillStyle = "#f7f7fa";
  ctx.font = "900 51px Arial";
  ctx.fillText("GARAGEM", W / 2 - 18, 104);

  ctx.fillStyle = "#ed3147";
  ctx.fillText("Z", W / 2 + 151, 104);

  ctx.fillStyle = "#ed3147";
  ctx.font = "800 19px Arial";
  ctx.fillText(
    "1997 — 2012 • A ERA DAS LENDAS",
    W / 2,
    147
  );

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 57px Arial";
  ctx.fillText(
    "MINHA GARAGEM",
    W / 2,
    235
  );

  ctx.fillStyle = "#b4b5c1";
  ctx.font = "22px Arial";
  ctx.fillText(
    `${garage.length} máquinas escolhidas`,
    W / 2,
    276
  );

  // Grade dinâmica
  const padding = 56;
  const gap = 18;
  const startY = 330;
  const footerSpace = 110;

  const availableHeight =
    H - startY - footerSpace;

  const columns = format === "square" ? 3 : 2;
  const rows = Math.ceil(garage.length / columns);

  const cardWidth =
    (W - padding * 2 - gap * (columns - 1)) /
    columns;

  const cardHeight =
    (availableHeight - gap * (rows - 1)) /
    rows;

  // Se houver muitos carros, a arte em página
  // única pode ficar pequena. Limitaremos
  // a quantidade em uma etapa posterior.
  if (cardHeight < 135) {
    throw new Error(
      "Muitos carros para este formato. " +
      "Escolha um formato maior ou reduza a coleção."
    );
  }

  // Carregar fotos antes de desenhar
  const { getCarImage } = await import(
    "../services/carImages"
  );

  const images = [];

  for (let i = 0; i < garage.length; i++) {
    const car = garage[i];

    let result = null;

    try {
      result = await getCarImage(car);
    } catch (error) {
      console.warn("Imagem não encontrada:", error);
    }

    const img = await loadImage(result?.url);

    images.push(img);

    onProgress?.(
      Math.round(((i + 1) / garage.length) * 100)
    );
  }

  // Desenhar carros
  garage.forEach((car, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);

    const x = padding + col * (cardWidth + gap);
    const y = startY + row * (cardHeight + gap);

    drawCarCard(
      ctx,
      car,
      images[index],
      x,
      y,
      cardWidth,
      cardHeight,
      index
    );
  });

  // Rodapé
  ctx.textAlign = "center";
  ctx.fillStyle = "#ed3147";
  ctx.fillRect(W / 2 - 85, H - 70, 170, 2);

  ctx.fillStyle = "#90919f";
  ctx.font = "18px Arial";
  ctx.fillText(
    "GARAGEM Z • SUA COLEÇÃO DOS SONHOS",
    W / 2,
    H - 38
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Erro ao gerar arquivo PNG."));
          return;
        }

        resolve(blob);
      },
      "image/png"
    );
  });
}

/* ==========================================
   COMPONENTE REACT
========================================== */

function GarageExport({ garage }) {
  const [format, setFormat] = useState("square");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleExport() {
    if (!garage.length) {
      setError("Adicione pelo menos um carro.");
      return;
    }

    setLoading(true);
    setProgress(0);
    setError("");

    try {
      const blob = await generateImage(
        garage,
        format,
        setProgress
      );

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `garagem-z-${format}.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      // Libera o objeto depois que o navegador
      // iniciar o download.
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Erro ao exportar garagem."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="garage-export"
      style={{
        margin: "35px 0 70px",
        padding: "28px",
        background:
          "linear-gradient(145deg,#1a1b23,#111218)",
        border: "1px solid var(--border)",
        borderRadius: "18px",
      }}
    >
      <span className="section-label">
        COMPARTILHE SUA COLEÇÃO
      </span>

      <h3
        style={{
          fontSize: "25px",
          margin: "12px 0",
        }}
      >
        Baixar imagem da garagem
      </h3>

      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "13px",
          marginBottom: "22px",
        }}
      >
        Transforme sua garagem dos sonhos em uma
        imagem para compartilhar com seus amigos.
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          disabled={loading}
          aria-label="Formato da imagem"
          style={{
            background: "#262730",
            color: "white",
            border: "1px solid #43444f",
            borderRadius: "9px",
            padding: "13px",
            minHeight: "47px",
          }}
        >
          <option value="square">
            Quadrado — 1080 × 1080
          </option>

          <option value="story">
            Vertical — 1080 × 1920
          </option>
        </select>

        <button
          type="button"
          className="load-more-btn"
          onClick={handleExport}
          disabled={loading || garage.length === 0}
          style={{
            margin: 0,
            minWidth: "220px",
          }}
        >
          {loading
            ? `Preparando... ${progress}%`
            : "Baixar imagem PNG"}
        </button>
      </div>

      {error && (
        <p
          role="alert"
          style={{
            color: "#ff8d98",
            marginTop: "15px",
            fontSize: "13px",
          }}
        >
          {error}
        </p>
      )}

      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "11px",
          marginTop: "18px",
        }}
      >
        Algumas fotos podem não ser exportadas caso
        o servidor de imagens bloqueie o uso no Canvas.
        Confira também os créditos e as licenças
        antes de publicar a imagem.
      </p>
    </section>
  );
}

export default GarageExport;
