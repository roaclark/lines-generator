import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ImageUploader from '../ImageUploader'

import logo from '../../logo.svg'

export default class ImageViewer extends Component {
  static propTypes = {
    imageDataCallback: PropTypes.func,
  }

  updateCanvas = imgSrc => {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const img = new Image()
    img.src = imgSrc

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
    this.updateCanvas(logo)
  }

  render() {
    return (
      <div>
        <ImageUploader imageSrcCallback={this.updateCanvas} />
        <canvas ref="canvas" />
      </div>
    )
  }
}
