import React, { Component } from 'react'
import PropTypes from 'prop-types'

import logo from '../../logo.svg'
import './styles.css'

export default class ImageViewer extends Component {
  static propTypes = {
    imageDataCallback: PropTypes.func,
  }

  handleFile = e => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onload = upload => {
      this.updateCanvas(upload.target.result)
    }

    reader.readAsDataURL(file)
  }

  updateCanvas = imgSrc => {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const callback = this.props.imageDataCallback
    const img = new Image()
    img.src = imgSrc

    img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      if (callback) {
        callback(ctx.getImageData(0, 0, canvas.width, canvas.height))
      }
    }
  }

  componentDidMount() {
    this.updateCanvas(logo)
  }

  render() {
    return (
      <div>
        <label htmlFor="rawFileInput" className="uploadButton">
          Upload an image
        </label>
        <div>
          <input
            id="rawFileInput"
            type="file"
            onChange={this.handleFile}
            accept="image/*"
          />
        </div>
        <canvas ref="canvas" />
      </div>
    )
  }
}
