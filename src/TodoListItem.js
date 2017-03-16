import React from 'react'
import InlineEdit from 'react-edit-inline'

class TodoListItem extends React.Component {

  componentWillMount() {
    const { complete } = this.props.item
    this.setState( { complete } )
  }

  handleCompletionChange = () => {
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


  handleRemove = () => {
    const { onDeleteItem, id, item } = this.props
    onDeleteItem(id, item)
  }

  changeData(data) {
    const { task_id } = this.props.item

    fetch(`http://localhost:5000/${task_id}`, {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify({ task: data.message })
    })
      .then( response => response.json() )
        .then( results => { this.setState( { task: results } ) } )
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
          <InlineEdit
            activeClassName="editing"
            text={task}
            paramName="message"
            change={this.changeData.bind(this)} />
        </span>
        <div className="TodoListItem-controls">
          <div className="TodoListItem-complete switch">
            <label>
              Incomplete
              <input type="checkbox"
                checked={complete}
                onChange={this.handleCompletionChange} />
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
