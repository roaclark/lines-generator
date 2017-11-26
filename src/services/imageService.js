const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 150

export function getImageSize(image, width, height) {
  if (width > 0 && height > 0) {
    return { width, height }
  }

  if (width > 0) {
    return { width, height: DEFAULT_HEIGHT }
  }
  if (height > 0) {
    return { width: DEFAULT_WIDTH, height }
  }

  return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }

  // const imageWidth = img.width
  // const imageHeight = img.height
}
