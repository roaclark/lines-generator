import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export default class ImageGenerator extends Component {
  static propTypes = {
    submitData: PropTypes.func.isRequired,
  }

  state = { numPaths: 1 }

  handleChange = e => {
    this.setState({ numPaths: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.submitData({
      numPaths: this.state.numPaths,
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="numberInput"
          type="number"
          max="200"
          value={this.state.numPaths}
          onChange={this.handleChange}
        />
        <input type="submit" className="button" value="Generate Lines" />
      </form>
    )
  }
}
