import React, { Component } from 'react'

import ImageViewer from 'components/ImageViewer'
import ImageGenerator from 'components/ImageGenerator'
import ImageUploader from 'components/ImageUploader'
import logo from 'logo.svg'

import './styles.css'

export default class MainPage extends Component {
  state = {
    imgSrc: logo,
  }

  uploadImage = (imgSrc, { width, height }) => {
    this.setState({ imgSrc, width, height })
  }

  setImageData = imageData => {
    this.setState({ imageData })
  }

  render() {
    const { width, height, imgSrc, imageData } = this.state

    return (
      <div className="page">
        <h2>Original Image</h2>
        <ImageUploader imageSrcCallback={this.uploadImage} />
        <ImageViewer
          className="viewer"
          imgSrc={imgSrc}
          width={width}
          height={height}
          imageDataCallback={this.setImageData}
        />
        <h2>New Image</h2>
        <ImageGenerator
          className="viewer"
          imageData={imageData}
          width={width}
          height={height}
        />
      </div>
    )
  }
}
