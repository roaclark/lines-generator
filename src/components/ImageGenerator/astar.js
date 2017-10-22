import PriorityQueue from 'js-priority-queue'

// TODO implement heuristic
const heuristic = () => 0

const comparator = (a, b) => a.expectedDistance - b.expectedDistance

export default async (startIndex, goalIndex, { vertices, edges }) => {
  const parents = {}
  const pq = new PriorityQueue({ comparator })
  pq.queue({
    node: startIndex,
    expectedDistance: heuristic(startIndex),
    distance: 0,
    parent: null,
  })

  while (pq.length) {
    const current = pq.dequeue()

    // Unvisited iff parent is not set
    if (!parents[current.node]) {
      parents[current.node] = current.parent

      if (parseInt(current.node, 10) === goalIndex) {
        // TODO reconstruct path
        return 'success'
      }

      const currEdges = edges[current.node]
      for (let i in currEdges) {
        const distance = current.distance + currEdges[i]
        pq.queue({
          node: i,
          expectedDistance: distance + heuristic(i),
          distance,
          parent: current.node,
        })
      }
    }
  }

  // Failure case
  return null
}
