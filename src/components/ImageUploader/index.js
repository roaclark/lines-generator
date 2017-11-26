import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export default class ImageUploader extends Component {
  static propTypes = {
    imageSrcCallback: PropTypes.func.isRequired,
  }

  state = {
    width: 0,
    height: 0,
  }

  changeWidth = e => {
    this.setState({ width: parseInt(e.target.value, 10) })
  }

  changeHeight = e => {
    this.setState({ height: parseInt(e.target.value, 10) })
  }

  handleFile = e => {
    const { width, height } = this.state
    const file = e.target.files[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = upload => {
      this.props.imageSrcCallback(upload.target.result, {
        width,
        height,
      })
    }

    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div className="uploadWrapper">
        <label htmlFor="widthInput">Width</label>
        <input
          id="widthInput"
          className="numberInput"
          type="number"
          min="0"
          max="1000"
          value={this.state.width}
          onChange={this.changeWidth}
        />
        <br />
        <label htmlFor="heightInput">Height</label>
        <input
          id="heightInput"
          className="numberInput"
          type="number"
          min="0"
          max="1000"
          value={this.state.height}
          onChange={this.changeHeight}
        />
        <br />
        <label htmlFor="rawFileInput" className="uploadButton">
          Upload an image
        </label>
        <input
          id="rawFileInput"
          type="file"
          onChange={this.handleFile}
          accept="image/*"
        />
      </div>
    )
  }
}
