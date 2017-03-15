import React, { Component } from 'react';
import logo from '../public/huemanatee.gif';
import './App.css';
import TodoList from './TodoList'

class App extends Component {
  state = {
    items: [
      {
        task: "Item One",
        complete: true,
        priority: 1
      },
      {
        task: "Item Two",
        complete: true,
        priority: 2
      },
      {
        task: "Item Three",
        complete: true,
        priority: 3
      },
      {
        task: "Item Four",
        complete: true,
        priority: 4
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Oh, the Huge Manatee</h2>
        </div>

        <div className="card-panel">
          <TodoList items={this.state.items}
          onDeleteItem={this.removeItem}
          onUpdateItem={this.updateItem} />
        </div>

      </div>
    );
  }
}

export default App;
