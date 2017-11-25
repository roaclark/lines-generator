import React, { Component } from 'react'

import './styles.css'

export default class Button extends Component {
  render() {
    return <input className="button" {...this.props} />
  }
}
