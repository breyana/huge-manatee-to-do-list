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

  handleEditTask = (data) => {
    const { task_id } = this.props.item

    if(data.message.length > 150) {
      alert("Please enter a task name that is less than 150 characters")
      this.setState({})
      return
    }

    this.props.item.task = data.message

    fetch(`http://localhost:5000/${task_id}`, {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify({ task: data.message })
    })
      .then( response => response.json() )
      .then( results => {
         this.setState( { task: results } )
       } )
  }

  handlePriorityUp = (input) => {
    const { allTasks, item, onUpdateItem, task_id } = this.props

    const higherTaskIndex = allTasks.indexOf(item)-1
    const currentTaskIndex = allTasks.indexOf(item)

    let higherTask = allTasks[higherTaskIndex]
    let currentTask = allTasks[currentTaskIndex]


    if (!higherTask) {
      return
    }
    const higherPriority = higherTask.priority
    const currentPriority = currentTask.priority

    allTasks[higherTaskIndex] = allTasks[currentTaskIndex]
    allTasks[currentTaskIndex] = higherTask

    const body = {
      'originalPriority': [currentTask.task_id, higherPriority],
      'newPriority': [higherTask.task_id, currentPriority]
    }

    fetch('http://localhost:5000/priority', {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify(body)
    })
    .then( response => response.json() )
      .then(results => {
        this.setState({ tasks: allTasks }, () => {
            onUpdateItem(task_id, item)
        })
    })
  }

  handlePriorityDown = (input) => {
    const { allTasks, item, onUpdateItem, task_id } = this.props

    const lowerTaskIndex = allTasks.indexOf(item)+1
    const currentTaskIndex = allTasks.indexOf(item)

    let lowerTask = allTasks[lowerTaskIndex]
    let currentTask = allTasks[currentTaskIndex]

    if (!lowerTask || item.complete === true) {
      return
    }
    const lowerPriority = lowerTask.priority
    const currentPriority = currentTask.priority

    allTasks[lowerTaskIndex] = allTasks[currentTaskIndex]
    allTasks[currentTaskIndex] = lowerTask

    const body = {
      'originalPriority': [currentTask.task_id, lowerPriority],
      'newPriority': [lowerTask.task_id, currentPriority]
    }

    fetch('http://localhost:5000/priority', {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify(body)
    })
    .then( response => response.json() )
      .then(results => {
        this.setState({ tasks: allTasks }, () => {
            onUpdateItem(task_id, item)
        })
    })
  }

  render() {
    const { task } = this.props.item
    const { complete } = this.state

    return (
      <li className="TodoListItem collection-item"
        draggable="true"
        data-id={this.props.id}
        key={this.props.id}
        onDragEnd={this.props.onDragEnd}
        onDragStart={this.props.onDragStart}>
        <span className="TodoListItem-content">
          <InlineEdit
            activeClassName="editing"
            text={task}
            paramName="message"
            change={this.handleEditTask.bind(this)} />
        </span>
        <div className="TodoListItem-controls">
          <div className="TodoListItem-complete switch">
            <label>
              <b>Incomplete</b>
              <input type="checkbox"
                checked={complete}
                onChange={this.handleCompletionChange} />
              <span className="lever"></span>
              <b>Complete</b>
            </label>
          </div>
          <a
            className="TodoListItem-remove waves-effect waves-light btn"
            onClick={this.handleRemove}>
            <i className="material-icons">delete</i>
          </a>
        </div>
        <div className="priority-arrows">
          <a className="arrow" onClick={this.handlePriorityUp}>
            <i className="material-icons">keyboard_arrow_up</i>
          </a>
          <a className="arrow">
            <i className="material-icons" onClick={this.handlePriorityDown}>keyboard_arrow_down</i>
          </a>
        </div>
      </li>
    )
  }
}

export default TodoListItem
