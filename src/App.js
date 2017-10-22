import React, { Component } from 'react'
import './App.css'

import ImageViewer from './components/ImageViewer'

class App extends Component {
  render() {
    return (
      <div className="app">
        <h2>Original Image</h2>
        <ImageViewer className="viewer" />
      </div>
    )
  }
}

export default App
