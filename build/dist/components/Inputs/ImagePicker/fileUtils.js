export const readFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.addEventListener("abort", reject);
    reader.readAsDataURL(file);
  });
};
export const readImage = async (file) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
    image.addEventListener("abort", reject);
    image.src = URL.createObjectURL(file);
  });
};
export const resizeImage = async (file, maxWidth, maxHeight) => {
  const image = await readImage(file);
  let width = image.width;
  let height = image.height;
  if (width <= maxWidth && height <= maxHeight) {
    return await readFile(file);
  }
  let newWidth;
  let newHeight;
  if (width > height) {
    newHeight = height * (maxWidth / width);
    newWidth = maxWidth;
  } else {
    newWidth = width * (maxHeight / height);
    newHeight = maxHeight;
  }
  let canvas = document.createElement("canvas");
  canvas.width = newWidth;
  canvas.height = newHeight;
  let context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, newWidth, newHeight);
  return canvas.toDataURL(file.type, 85);
};
