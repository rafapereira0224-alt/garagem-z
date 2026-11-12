
const fs = require("node:fs");
const path = require("node:path");

const ARQUIVO = path.join(
  __dirname,
  "src",
  "data",
  "approvedImages.json"
);

const TIMEOUT = 15000;
const CONCORRENCIA = 3;
const PAUSA_MS = 350;

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verificarImagem(nome, imagem) {
  const url = imagem?.url;

  if (!url || typeof url !== "string") {
    return {
      nome,
      status: "INVALIDA",
      codigo: null,
      motivo: "URL ausente",
      url: url || "",
    };
  }

  let ultimaFalha = null;

  for (let tentativa = 1; tentativa <= 2; tentativa++) {
    const controller = new AbortController();

    const timer = setTimeout(() => {
      controller.abort();
    }, TIMEOUT);

    try {
      const resposta = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: {
          "User-Agent": "GaragemGeracaoZ-ImageAudit/1.0",
          Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
        },
      });

      const codigo = resposta.status;
      const tipo = resposta.headers.get("content-type") || "";

      // Cancela o corpo para evitar baixar a imagem inteira.
      if (resposta.body) {
        await resposta.body.cancel().catch(() => {});
      }

      if (resposta.ok && tipo.startsWith("image/")) {
        return {
          nome,
          status: "OK",
          codigo,
          motivo: "Imagem acessível",
          url,
        };
      }

      ultimaFalha = {
        nome,
        status: "INVALIDA",
        codigo,
        motivo: resposta.ok
          ? `Resposta não é imagem: ${tipo}`
          : `HTTP ${codigo}`,
        url,
      };

      // 404 e 410 normalmente não melhoram ao repetir.
      if (codigo === 404 || codigo === 410) {
        return ultimaFalha;
      }

      // Repetir apenas falhas temporárias.
      if (
        codigo !== 429 &&
        codigo !== 500 &&
        codigo !== 502 &&
        codigo !== 503 &&
        codigo !== 504
      ) {
        return ultimaFalha;
      }
    } catch (erro) {
      ultimaFalha = {
        nome,
        status: "ERRO",
        codigo: null,
        motivo:
          erro.name === "AbortError"
            ? "Tempo limite excedido"
            : erro.message,
        url,
      };
    } finally {
      clearTimeout(timer);
    }

    if (tentativa === 1) {
      await esperar(2000);
    }
  }

  return ultimaFalha;
}

async function executar() {
  if (!fs.existsSync(ARQUIVO)) {
    console.error("Arquivo não encontrado:", ARQUIVO);
    process.exitCode = 1;
    return;
  }

  const imagens = JSON.parse(
    fs.readFileSync(ARQUIVO, "utf8")
  );

  const entradas = Object.entries(imagens);
  const resultados = new Array(entradas.length);

  let proximo = 0;
  let concluidos = 0;

  console.log("\nAUDITORIA DE IMAGENS — GARAGEM GERAÇÃO Z");
  console.log(`Total de imagens: ${entradas.length}\n`);

  async function trabalhador() {
    while (proximo < entradas.length) {
      const indice = proximo++;
      const [nome, imagem] = entradas[indice];

      const resultado = await verificarImagem(nome, imagem);

      resultados[indice] = resultado;
      concluidos++;

      const simbolo =
        resultado.status === "OK" ? "OK" : "FALHA";

      console.log(
        `[${concluidos}/${entradas.length}] ${simbolo} | ${nome} | ${resultado.codigo || resultado.motivo}`
      );

      await esperar(PAUSA_MS);
    }
  }

  await Promise.all(
    Array.from(
      { length: Math.min(CONCORRENCIA, entradas.length) },
      () => trabalhador()
    )
  );

  const corretas = resultados.filter(
    (item) => item.status === "OK"
  );

  const invalidas = resultados.filter(
    (item) => item.status !== "OK"
  );

  console.log("\n==================================");
  console.log("RESULTADO FINAL");
  console.log("==================================");
  console.log(`Total: ${resultados.length}`);
  console.log(`Acessíveis: ${corretas.length}`);
  console.log(`Com falha: ${invalidas.length}`);

  if (invalidas.length > 0) {
    console.log("\nIMAGENS QUE PRECISAM DE ATENÇÃO:\n");

    for (const item of invalidas) {
      console.log(`Carro: ${item.nome}`);
      console.log(`Erro: ${item.motivo}`);
      console.log(`URL: ${item.url}`);
      console.log("----------------------------------");
    }
  }

  const relatorio = path.join(
    __dirname,
    "relatorio-imagens.json"
  );

  fs.writeFileSync(
    relatorio,
    JSON.stringify(
      {
        data: new Date().toISOString(),
        total: resultados.length,
        acessiveis: corretas.length,
        falhas: invalidas.length,
        resultados,
      },
      null,
      2
    ),
    "utf8"
  );

  console.log("\nRelatório salvo em relatorio-imagens.json");

  if (invalidas.length > 0) {
    process.exitCode = 1;
  }
}

executar().catch((erro) => {
  console.error("Erro na auditoria:", erro);
  process.exitCode = 1;
});
