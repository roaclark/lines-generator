import React, { Component } from 'react'
import 'App.css'

import ImageViewer from 'components/ImageViewer'
import ImageGenerator from 'components/ImageGenerator'
import ImageUploader from 'components/ImageUploader'
import logo from 'logo.svg'

class App extends Component {
  state = {
    imgSrc: logo,
  }

  uploadImage = imgSrc => {
    this.setState({ imgSrc })
  }

  setImageData = imageData => {
    this.setState({ imageData })
  }

  render() {
    return (
      <div className="app">
        <h2>Original Image</h2>
        <ImageUploader imageSrcCallback={this.uploadImage} />
        <ImageViewer
          className="viewer"
          imgSrc={this.state.imgSrc}
          imageDataCallback={this.setImageData}
        />
        <h2>New Image</h2>
        <ImageGenerator className="viewer" imageData={this.state.imageData} />
      </div>
    )
  }
}

export default App
