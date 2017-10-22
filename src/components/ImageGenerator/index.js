import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ImageGenerator extends Component {
  static propTypes = {
    imageData: PropTypes.instanceOf(ImageData),
  }

  drawImageData = imageData => {
    if (imageData) {
      const ctx = this.refs.canvas.getContext('2d')
      ctx.putImageData(imageData, 0, 0)
    }
  }

  componentDidMount() {
    this.drawImageData(this.props.imageData)
  }

  componentWillUpdate(nextProps) {
    this.drawImageData(nextProps.imageData)
  }

  render() {
    return <canvas ref="canvas" />
  }
}
