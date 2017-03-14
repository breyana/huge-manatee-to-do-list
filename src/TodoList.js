import React from 'react'
import TodoListItem from './TodoListItem'

class TodoList extends React.Component {

  mapToListItems = (items, props) => {
    let data = { todo: [], done: [] }

    items.map((item, index) => {
      let listItem = <TodoListItem item={item} {...props} id={index} key={item.priority} />
      data[item.complete === true ? 'done' : 'todo'].push(listItem)
      return item
    })

    return data
  }

  render() {
    let { items, ...props } = this.props
    let listItems = this.mapToListItems(items, props)

    return (
      <div className="TodoList">
        Incomplete:
        <ul className="TodoList-active collection">
          {listItems.todo}
        </ul>
        Complete:
        <ul className="TodoList-done collection">
          {listItems.done}
        </ul>
      </div>
    )
  }

  static propTypes = {
    items: React.PropTypes.array.isRequired,
    onDeleteItem: React.PropTypes.func.isRequired,
    onUpdateItem: React.PropTypes.func.isRequired
  }

  static displayName = "TodoList"
}

export default TodoList
