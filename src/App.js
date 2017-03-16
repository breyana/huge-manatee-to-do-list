import React, { Component } from 'react';
import logo from '../public/huemanatee.gif';
import './App.css';
import List from './List'
import TodoForm from './TodoForm'

// import DragAndDrop from './DragAndDrop'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentWillMount() {
    this.getAllItems()
  }

  getAllItems() {
    fetch('http://localhost:5000', {
      method: 'get',
    })
    .then( response => response.json() )
      .then(results => {
        this.setState( { items: results } )
      })
  }

  removeItem(event, task) {
    fetch(`http://localhost:5000/${task.task_id}`, {
      method: 'delete',
    })
      .then( () => this.getAllItems() )
  }

  updateItem = (index, item) => {
    const {items} = this.state
    this.setState({items})
  }

  handleSubmit(task) {
    fetch('http://localhost:5000/', {
      method: 'post',
      body: JSON.stringify( {task: task} ),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
    .then( () => this.getAllItems() )
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Oh, the Huge Manatee</h2>
        </div>

        <div className="card-panel">
        <div>
          <TodoForm onTaskSubmit={this.handleSubmit.bind(this)} />
        </div>
          <List items={this.state.items}
          onDeleteItem={this.removeItem.bind(this)}
          onUpdateItem={this.updateItem} />
        </div>

        {/* }<div className="card-panel">
          <DragAndDrop items={this.state.items} />
        </div> */}

      </div>
    );
  }
}

export default App;
