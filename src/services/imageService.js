const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 150

export function getImageSize(image, width, height) {
  if (width > 0 && height > 0) {
    return { width, height }
  }

  const ratio = image
    ? image.width / image.height
    : DEFAULT_WIDTH / DEFAULT_HEIGHT

  if (width > 0) {
    return { width, height: width / ratio }
  }

  if (height > 0) {
    return { width: height * ratio, height }
  }

  return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }
}
