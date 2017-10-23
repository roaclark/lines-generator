import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export default class ImageUploader extends Component {
  static propTypes = {
    imageSrcCallback: PropTypes.func.isRequired,
  }

  handleFile = e => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onload = upload => {
      this.props.imageSrcCallback(upload.target.result)
    }

    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div className="uploadWrapper">
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
