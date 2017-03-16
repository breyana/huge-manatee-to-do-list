import React from 'react'

const placeholder = document.createElement("li");
placeholder.className = "placeholder";

class TodoListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentWillMount() {
    const { complete } = this.props.item
    this.setState({ complete })
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

  editTask = () => {

  }

  handleRemove = () => {
    const { onDeleteItem, id, item } = this.props
    onDeleteItem(id, item)
  }

  // dragStart = (event) => {
  //   this.dragged = event.currentTarget
  //   event.dataTransfer.effectAllowed = 'move'
  // }
  //
  // dragEnd = (event) => {
  //   this.dragged.parentNode.removeChild(placeholder)
  //   const data = this.state.data
  //   const from = Number(this.dragged.dataset.id)
  //   let to = Number(this.over.dataset.id)
  //   if(from < to) to--
  //   data.splice(to, 0, data.splice(from, 1)[0])
  //   this.setState({data: data})
  // }

  render() {
    const { task } = this.props.item
    const { complete } = this.state

    return (
      <li className="TodoListItem collection-item">
        <span className="TodoListItem-content" onClick={this.editTask.bind(this)}>
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
