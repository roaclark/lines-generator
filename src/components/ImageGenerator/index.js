import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.css'
import { convertImageToGraph, choosePoint } from './imageProcessing'
import astar from './astar'

export default class ImageGenerator extends Component {
  static propTypes = {
    imageData: PropTypes.instanceOf(ImageData),
  }

  state = { processingImage: false }
  graph = null

  drawPath = path => {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    const { vertices } = this.graph

    path.map(vertex => {
      const [x, y] = vertices[vertex]
      ctx.fillRect(y, x, 1, 1)
    })

    return 0
  }

  makePath = (start, end) => {
    return astar(
      start || choosePoint(this.graph, this.props.imageData),
      end || choosePoint(this.graph, this.props.imageData),
      this.graph,
    )
      .then(this.drawPath)
      .catch(err => {
        console.log('caught')
        console.log(start)
        console.log(end)
      })
  }

  processImageData = imageData => {
    if (!imageData) {
      return
    }

    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.putImageData(imageData, 0, 0)

    this.setState({ processingImage: true })
    return convertImageToGraph(imageData).then(graph => {
      this.graph = graph
      this.setState({ processingImage: false })
      return graph
    })
  }

  componentDidMount() {
    this.processImageData(this.props.imageData)
  }

  componentWillReceiveProps(nextProps) {
    this.processImageData(nextProps.imageData)
  }

  render() {
    return (
      <div>
        {this.state.processingImage ? (
          <p>Processing image...</p>
        ) : (
          <div className="button" onClick={() => this.makePath()}>
            Generate Line
          </div>
        )}
        <br />
        <canvas ref="canvas" />
      </div>
    )
  }
}
