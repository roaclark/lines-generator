import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ImageViewer extends Component {
  static propTypes = {
    imgSrc: PropTypes.string,
    imageDataCallback: PropTypes.func,
  }

  updateCanvas = () => {
    if (!this.props.imgSrc || !this.refs.canvas) {
      return
    }

    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const img = new Image()
    img.src = this.props.imgSrc

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      if (this.props.imageDataCallback) {
        this.props.imageDataCallback(
          ctx.getImageData(0, 0, canvas.width, canvas.height),
        )
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
