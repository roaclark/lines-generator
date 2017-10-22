import React, { Component } from 'react'

import logo from '../../logo.svg'

export default class ImageViewer extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = logo
    img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
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
