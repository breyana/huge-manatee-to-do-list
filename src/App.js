import React, { Component } from 'react';
import logo from '../public/huemanatee.gif';
import './App.css';
import TodoList from './TodoList'
import TodoForm from './TodoForm'

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
    fetch(`http://localhost:5000/${task.id}`, {
      method: 'delete',
    })
      .then( () => this.getAllItems() )
  }

  updateItem = (index, item) => {
    let {items} = this.state
    items[index] = item
    this.setState({items})
  }

  handleSubmit(task) {
    console.log("what is task", task);
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
          <TodoList items={this.state.items}
          onDeleteItem={this.removeItem.bind(this)}
          onUpdateItem={this.updateItem} />
        </div>
      </div>
    );
  }
}

export default App;
