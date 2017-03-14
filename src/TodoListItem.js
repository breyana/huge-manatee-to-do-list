import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

class TodoListItem extends React.Component {
  state = {
    complete: false
  }

  componentWillMount() {
    let { complete } = this.props.item
    this.setState({ complete })
  }

  handleChange = () => {
    let { onUpdateItem, id, item } = this.props
    item.complete = !item.complete

    this.setState({ complete: item.complete }, () => {
      setTimeout(() => {
        onUpdateItem(id, item)
      }, 300)
    })
  }

  handleRemove = () => {
    const { onDeleteItem, id, item } = this.props
    onDeleteItem(id, item)
  }

  render() {
    let { content, priority } = this.props.item
    let { complete } = this.state

    return (
      <li className="TodoListItem collection-item">
        <span className="TodoListItem-content">
          {content}
        </span>
        <div className="TodoListItem-controls">
          <div className="TodoListItem-complete switch">
            <label>
              Incomplete
              <input type="checkbox"
                checked={complete}
                onChange={this.handleChange} />
              <span className="lever"></span>
              Complete
            </label>
          </div>
          <a
            className="TodoListItem-remove waves-effect waves-light btn"
            onClick={this.handleRemove}>
            <i className="material-icons">delete</i>
          </a>
        </div>
      </li>
    )
  }

  static propTypes = {
    id: React.PropTypes.number.isRequired,
    item: React.PropTypes.any.isRequired,
    onDeleteItem: React.PropTypes.func.isRequired,
    onUpdateItem: React.PropTypes.func.isRequired
  }

  static displayName = "TodoListItem"
}

// ReactDOM.render(<App />, document.body)
// ReactDOM.render(<card-panel />, document.body)

export default TodoListItem
