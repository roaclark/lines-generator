import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.css'
import Button from 'components/Button'

export default class GeneratorForm extends Component {
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
        <Button type="submit" value="Generate Lines" />
      </form>
    )
  }
}
