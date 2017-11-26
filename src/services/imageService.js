const DEFAULT_SIZE = 500

export function getImageSize(image, width, height) {
  if (image) {
    const ratio = image.width / image.height

    return {
      width: width || height * ratio || image.width,
      height: height || width / ratio || image.height,
    }
  }

  return { width: width || DEFAULT_SIZE, height: height || DEFAULT_SIZE }
}
