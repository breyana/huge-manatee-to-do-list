import React, { Component } from 'react';
import logo from '../public/huemanatee.gif';
import './App.css';
import TodoList from './TodoList'
import TodoForm from './TodoForm'

class App extends Component {
  state = {
    items: [
      {
        task: "Item One",
        complete: false,
        priority: 0
      },
      {
        task: "Item Two",
        complete: false,
        priority: 1
      },
      {
        task: "Item Three",
        complete: false,
        priority: 2
      },
      {
        task: "Item Four",
        complete: true,
        priority: 3
      }
    ]
  }

  removeItem = (index, item) => {
    let {items} = this.state
    items.splice(index, 1)
    this.setState({items})
  }

  updateItem = (index, item) => {
    let {items} = this.state
    items[index] = item
    this.setState({items})
  }

  handleSubmit = (task) => {
    let items = this.state.items
    let priority = items.length
    let complete = false
    items = items.concat([{task, complete, priority}])
    this.setState({items})
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
          <TodoForm onTaskSubmit={this.handleSubmit} />
        </div>
          <TodoList items={this.state.items}
          onDeleteItem={this.removeItem}
          onUpdateItem={this.updateItem} />
        </div>
      </div>
    );
  }
}

export default App;
