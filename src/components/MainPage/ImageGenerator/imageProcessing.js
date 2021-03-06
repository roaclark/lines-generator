import _ from 'lodash'

const getCoordinatesList = (width, height) => {
  const xs = Array.from(Array(height).keys())
  const ys = Array.from(Array(width).keys())
  return ys.map(y => xs.map(x => [x, y])).reduce((a, b) => a.concat(b), [])
}

const usePixel = (x, y, r, g, b, a) => {
  return true
}

const getRGBA = (x, y, imageData) => {
  const offset = x * imageData.width + y
  const rgba = imageData.data.slice(offset * 4, offset * 4 + 4)
  return rgba
}

const getCost = (source, rgbaSource, dest, rgbaDest) => {
  const destLum = rgbaDest[0] + rgbaDest[1] + rgbaDest[2]
  const white = 255 * 3
  const alpha = rgbaDest[3]
  const weighted = white * (255 - alpha) + destLum * alpha
  return weighted
}

const getEdges = (pixel, imageData, vertexMap) => {
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
  ].filter(neighbor => neighbor in vertexMap)
  const neighborCosts = neighbors.map(neighbor => {
    const rgbaDest = getRGBA(...neighbor, imageData)
    return [vertexMap[neighbor], getCost(pixel, rgba, neighbor, rgbaDest)]
  })
  return _.fromPairs(neighborCosts)
}

const convertImageToGraph = async imageData => {
  const vertices = getCoordinatesList(imageData.width, imageData.height).filter(
    ([x, y]) => {
      const [r, g, b, a] = getRGBA(x, y, imageData)
      return usePixel(x, y, r, g, b, a)
    },
  )

  const vertexMap = _.fromPairs(vertices.map((vertex, i) => [vertex, i]))
  const edges = vertices.map(pixel => getEdges(pixel, imageData, vertexMap))

  return { vertices, edges, vertexMap }
}

const chooseClosePoint = (
  { vertices, vertexMap },
  imageData,
  startPoint,
  dist = 50,
) => {
  const vertex = vertices[startPoint]
  vertex[0] += _.random(-dist, dist)
  vertex[1] += _.random(-dist, dist)
  vertex[0] = _.clamp(vertex[0], 0, imageData.height - 1)
  vertex[1] = _.clamp(vertex[1], 0, imageData.width - 1)
  return vertexMap[vertex].toString()
}

const choosePoint = ({ vertices }, imageData) => {
  return _.random(imageData.width * imageData.height).toString()
}

export { convertImageToGraph, choosePoint, chooseClosePoint }
