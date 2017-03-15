import React from 'react'

class TodoListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentWillMount() {
    let { complete } = this.props.item
    this.setState({ complete })
  }

  handleChange = () => {
    let { onUpdateItem, item } = this.props
    let { task_id } = this.props.item

    item.complete = !item.complete

    fetch(`http://localhost:5000/complete/${task_id}`, {
      method: 'put'
    })
    .then( response => response.json() )
      .then(results => {
        this.setState({ complete: results }, () => {
          setTimeout(() => {
            onUpdateItem(task_id, item)
          }, 300) //Timeout allows animation to play
        })
      })
  }

  handleRemove = () => {
    const { onDeleteItem, id, item } = this.props
    onDeleteItem(id, item)
  }

  render() {
    let { task } = this.props.item
    let { complete } = this.state

    return (
      <li className="TodoListItem collection-item">
        <span className="TodoListItem-content">
          {task}
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

export default TodoListItem
