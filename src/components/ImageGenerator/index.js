import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import './styles.css'
import { convertImageToGraph, choosePoint } from './imageProcessing'
import astar from './astar'

export default class ImageGenerator extends Component {
  static propTypes = {
    imageData: PropTypes.instanceOf(ImageData),
  }

  state = { processingImage: true, numPaths: 1 }
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
    return astar(
      start || choosePoint(this.graph, this.props.imageData),
      end || choosePoint(this.graph, this.props.imageData),
      this.graph,
    ).then(this.drawPath)
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

  handleChange = e => {
    this.setState({ numPaths: e.target.value })
  }

  handleSubmit = e => {
    _.times(this.state.numPaths, () => this.makePath())
    e.preventDefault()
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
          <form onSubmit={this.handleSubmit}>
            <input
              className="numberInput"
              type="number"
              max="200"
              value={this.state.numPaths}
              onChange={this.handleChange}
            />
            <input type="submit" className="button" value="Generate Lines" />
          </form>
        )}
        <br />
        <canvas ref="canvas" />
      </div>
    )
  }
}
