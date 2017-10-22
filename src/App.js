import React, { Component } from 'react'
import './App.css'

import ImageViewer from './components/ImageViewer'
import ImageGenerator from './components/ImageGenerator'

class App extends Component {
  state = {}

  setImageData = imageData => {
    this.setState({ imageData })
  }

  render() {
    return (
      <div className="app">
        <h2>Original Image</h2>
        <ImageViewer className="viewer" imageDataCallback={this.setImageData} />
        <h2>New Image</h2>
        <ImageGenerator className="viewer" imageData={this.state.imageData} />
      </div>
    )
  }
}

export default App
