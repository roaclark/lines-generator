import PriorityQueue from 'js-priority-queue'

// TODO implement heuristic
const heuristic = () => 0

const comparator = (a, b) => a.expectedCost - b.expectedCost

export default async (startIndex, goalIndex, { vertices, edges }) => {
  const parents = {}
  const pq = new PriorityQueue({ comparator })
  pq.queue({
    node: startIndex,
    expectedCost: heuristic(startIndex),
    cost: 0,
    parent: startIndex,
  })

  while (pq.length) {
    const current = pq.dequeue()
    const node = current.node

    // Unvisited iff parent is not set
    if (!parents[node]) {
      parents[node] = current.parent

      if (node === goalIndex) {
        const path = [node]
        let step = node
        while (parents[step] != step) {
          path.push(parents[step])
          step = parents[step]
        }
        return path
      }

      const currEdges = edges[node]
      for (let i in currEdges) {
        const cost = current.cost + currEdges[i]
        pq.queue({
          node: i,
          expectedCost: cost + heuristic(i),
          cost,
          parent: node,
        })
      }
    }
  }

  // Failure case
  return null
}
