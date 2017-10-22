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

const getDistance = (source, rgbaSource, dest, rgbaDest) => {
  if (!usePixel(...dest, ...rgbaDest)) {
    return null
  }
  const sourceLum = rgbaSource[0] + rgbaSource[1] + rgbaSource[2]
  const destLum = rgbaDest[0] + rgbaDest[1] + rgbaDest[2]
  return Math.abs(destLum - sourceLum) + 1
}

const getNeighborDistances = (pixel, imageData) => {
  const [x, y] = pixel
  const rgba = getRGBA(...pixel, imageData)
  const neighbors = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ]

  return neighbors.map(neighbor => {
    const rgbaDest = getRGBA(...neighbor, imageData)
    return getDistance(pixel, rgba, neighbor, rgbaDest)
  })
}

const convertImageToGraph = async imageData => {
  const vertices = getCoordinatesList(
    imageData.width,
    imageData.height,
  ).filter(([x, y]) => {
    const [r, g, b, a] = getRGBA(x, y, imageData)
    return usePixel(x, y, r, g, b, a)
  })

  const neighborDistances = vertices.map(pixel =>
    getNeighborDistances(pixel, imageData),
  )

  return { vertices, neighborDistances }
}

export { convertImageToGraph }
