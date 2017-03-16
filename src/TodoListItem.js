import React from 'react'

const placeholder = document.createElement("li");
placeholder.className = "placeholder";

class TodoListItem extends React.Component {

  componentWillMount() {
    const { complete } = this.props.item
    this.setState( { complete } )
  }

  handleChange = () => {
    const { onUpdateItem, item } = this.props
    const { task_id } = this.props.item

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

  handleEditTask = (input) => {
    const { task_id } = this.props.item

    this.props.item.task = input
    fetch(`http://localhost:5000/${task_id}`, {
      method: 'put'
    })
      .then( response => response.json() )
        .then( results => { this.setState( { items: results } ) } )
  }

  handleRemove = () => {
    const { onDeleteItem, id, item } = this.props
    onDeleteItem(id, item)
  }

  render() {
    const { task } = this.props.item
    const { complete } = this.state

    return (
      <li className="TodoListItem collection-item"
        draggable="true"
        data-id={this.props.id}
        key={this.props.id}
        draggable='true'
        onDragEnd={this.props.onDragEnd}
        onDragStart={this.props.onDragStart}>
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
}

export default TodoListItem
