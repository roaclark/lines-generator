const getCoordinatesList = (width, height) => {
  const xs = Array.from(Array(height).keys())
  const ys = Array.from(Array(width).keys())
  return ys.map(y => xs.map(x => [x, y])).reduce((a, b) => a.concat(b), [])
}

const usePixel = (x, y, r, g, b, a) => {
  return a > 0
}

const getRGBA = (x, y, imageData) => {
  const offset = x * imageData.width + y
  const rgba = imageData.data.slice(offset * 4, offset * 4 + 4)
  return rgba
}

const convertImageToGraph = async imageData => {
  const vertices = getCoordinatesList(
    imageData.width,
    imageData.height,
  ).filter(pixel => {
    const [r, g, b, a] = getRGBA(pixel[0], pixel[1], imageData)
    return usePixel(pixel[0], pixel[1], r, g, b, a)
  })
  return vertices
}

export { convertImageToGraph }
