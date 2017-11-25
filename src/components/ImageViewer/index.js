import React, { Component } from 'react'
import PropTypes from 'prop-types'

const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 150

export default class ImageViewer extends Component {
  static propTypes = {
    imgSrc: PropTypes.string,
    imageDataCallback: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  updateCanvas = () => {
    const { imgSrc, width, height, imageDataCallback } = this.props
    const canvas = this.refs.canvas

    if (!imgSrc || !canvas) {
      return
    }

    if (width > 0) {
      canvas.width = width
    } else {
      canvas.width = DEFAULT_WIDTH
    }

    if (height > 0) {
      canvas.height = height
    } else {
      canvas.height = DEFAULT_HEIGHT
    }

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const img = new Image()
    img.src = imgSrc

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      if (imageDataCallback) {
        imageDataCallback(ctx.getImageData(0, 0, canvas.width, canvas.height))
      }
    }
  }

  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imgSrc !== this.props.imgSrc) {
      this.updateCanvas()
    }
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" />
      </div>
    )
  }
}
