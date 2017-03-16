import React from 'react'
import TodoListItem from './TodoListItem'

class TaskEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showMe : false
    }
  }

  onClick() {
    console.log("this", this)
     this.setState( { showMe : !this.state.showMe} );
  }


  render() {
    if(this.state.showMe) {
      return (<div onClick={this.onClick.bind(this)}> <TodoListItem /> </div>);
    } else {
      return (<span onClick={this.onClick.bind(this)}> <TodoListItem /> </span>);
    }
  }
}

export default TaskEdit
