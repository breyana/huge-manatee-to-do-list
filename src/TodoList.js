import React from 'react'
import TodoListItem from './TodoListItem'
import TaskEdit from './TaskEdit'

const placeholder = document.createElement("li");
placeholder.className = "placeholder";

class TodoList extends React.Component {

  // dragOver = (event) => {
  //   event.preventDefault()
  //   this.dragged = event.currentTarget
  //   this.dragged.style.display = "none"
  //   if(event.target.className === "placeholder") return
  //   this.over = event.target
  //   event.target.parentNode.insertBefore(placeholder, event.target)
  // }

  mapToListItems = (items, props) => {
    const data = { todo: [], done: [] }

    items.map((item, index) => {
      const listItem = <TodoListItem item={item} {...props} id={item.task_id} key={item.task_id}/>
      data[item.complete === true ? 'done' : 'todo'].push(listItem)
      return item
    })

    return data
  }

  render() {
    const { items, ...props } = this.props
    const listItems = this.mapToListItems(items, props)

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
