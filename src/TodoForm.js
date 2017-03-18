import React from 'react'
import ReactDOM from 'react-dom'

class TodoForm extends React.Component {
  doSubmit = (event) => {
    event.preventDefault()
    const task = ReactDOM.findDOMNode(this.refs.task).value.trim()
    if (task.length > 150) {
      alert("Please enter a task name that is less than 150 characters")
      this.setState({})
      return
    }
    if (!task) {
      return
    }
    this.props.onTaskSubmit(task)
    ReactDOM.findDOMNode(this.refs.task).value = ''
    return
  }

  render() {

    return (
      <div>
        <div>
          <form className='todoForm' onSubmit={this.doSubmit}>
            <div>
              <b>New Task:</b>
              <div className='input-task-row'>
                <input type='text' id='task' ref='task' placeholder='What would you like to do?' />
                <button className="btn-floating waves-effect waves-light red" type="submit" name="action">
                <i className="material-icons">add</i>
                </button>
              </div>
            </div>
            <div className='row'>
              <div >
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default TodoForm
