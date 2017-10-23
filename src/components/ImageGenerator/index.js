import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import GeneratorForm from '../GeneratorForm'

import {
  convertImageToGraph,
  choosePoint,
  chooseClosePoint,
} from './imageProcessing'
import astar from './astar'

export default class ImageGenerator extends Component {
  static propTypes = {
    imageData: PropTypes.instanceOf(ImageData),
  }

  state = { processingImage: true }
  graph = null

  drawPath = path => {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    const { vertices } = this.graph

    path.map(vertex => {
      const [x, y] = vertices[vertex]
      ctx.fillRect(y, x, 1, 1)
      return vertex
    })
  }

  makePath = (start, end) => {
    start = start || choosePoint(this.graph, this.props.imageData)
    end = end || chooseClosePoint(this.graph, this.props.imageData, start, 150)
    return astar(start, end, this.graph).then(this.drawPath)
  }

  processImageData = imageData => {
    if (!imageData) {
      return
    }

    this.setState({ processingImage: true })

    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.putImageData(imageData, 0, 0)

    return convertImageToGraph(imageData).then(graph => {
      this.graph = graph
      this.setState({ processingImage: false })
      return graph
    })
  }

  handleSubmit = ({ numPaths }) => {
    _.times(numPaths, () => this.makePath())
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
          <GeneratorForm submitData={this.handleSubmit} />
        )}
        <br />
        <canvas ref="canvas" />
      </div>
    )
  }
}
