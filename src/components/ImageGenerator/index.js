import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { convertImageToGraph } from './imageProcessing'

export default class ImageGenerator extends Component {
  static propTypes = {
    imageData: PropTypes.instanceOf(ImageData),
  }

  state = { processingImage: false }
  floydWarshallDistances = null

  processImageData = imageData => {
    if (!imageData) {
      return
    }

    const ctx = this.refs.canvas.getContext('2d')
    ctx.putImageData(imageData, 0, 0)

    this.setState({ processingImage: true })
    return convertImageToGraph(imageData)
      .then(graph => {
        this.graph = graph
        this.setState({ processingImage: false })
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
        <canvas ref="canvas" />
        {this.state.processingImage && <p>Processing image...</p>}
      </div>
    )
  }
}
