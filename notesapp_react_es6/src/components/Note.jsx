import React, { Component, PropTypes } from 'react'

import './Note.css'

export default class Note extends Component {
  constructor () {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  static propTypes = {
    id: PropTypes.number.isRequired, //обязательный пропс
    color: PropTypes.string,
    children: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
  }
  static defaultProps = {
    color:' lightgreen'
  }

  handleDelete () {
    this.props.onDelete(this.props.id)
  }

  render () {
    const {
      color,
      children,
      onDelete,
    } = this.props

    return (
      <div className="note" style={{backgroundColor: color}}>
        <span className="note__delete-icon"
              onClick={this.handleDelete}> × </span>
        {children}
      </div>
    )
  }
}

