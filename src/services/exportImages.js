
import { cars } from "../data/cars";
import { getSelectedCarImage } from "./carImages";

export function exportCarImages() {
  const selectedImages = {};

  for (const car of cars) {
    const image = getSelectedCarImage(car);

    if (image?.url) {
      const key = `${car.brand} | ${car.name}`;

      selectedImages[key] = {
        url: image.url,
        source: image.source || null,
        title: image.title || car.name,
        license: image.license || null,
      };
    }
  }

  const total = Object.keys(selectedImages).length;

  if (total === 0) {
    alert("Nenhuma imagem escolhida foi encontrada!");
    return;
  }

  const json = JSON.stringify(selectedImages, null, 2);

  const blob = new Blob([json], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "garagem-z-imagens.json";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  alert(
    `${total} imagens exportadas com sucesso!`
  );
}
