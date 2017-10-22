import React, { Component } from 'react'
import PropTypes from 'prop-types'

import logo from '../../logo.svg'

export default class ImageViewer extends Component {
  static propTypes = {
    imageDataCallback: PropTypes.func,
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    const callback = this.props.imageDataCallback
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = logo
    img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      if (callback) {
        callback(ctx.getImageData(0, 0, canvas.width, canvas.height))
      }
    }
  }

  render() {
    return <canvas ref="canvas" />
  }
}
