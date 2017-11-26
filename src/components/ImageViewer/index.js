import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getImageSize } from 'services/imageService'

export default class ImageViewer extends Component {
  static propTypes = {
    imgSrc: PropTypes.string,
    imageDataCallback: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  updateCanvas = () => {
    const { imgSrc, imageDataCallback } = this.props
    const canvas = this.refs.canvas

    if (!imgSrc || !canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const img = new Image()
    img.src = imgSrc

    img.onload = () => {
      const { width, height } = getImageSize(
        img,
        this.props.width,
        this.props.height,
      )
      canvas.width = width
      canvas.height = height

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
