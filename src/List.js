import React from 'react'
import TodoListItem from './TodoListItem'

const placeholder = document.createElement("li");
placeholder.className = "placeholder";

class List extends React.Component {

  dragStart(event) {
    this.dragged = event.currentTarget;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.dragged);
  }

  dragEnd(event) {
    this.dragged.style.display = 'flex';
    this.dragged.parentNode.removeChild(placeholder);

    const items = this.props.items;
    const from = Number(this.dragged.dataset.id);
    let to = Number(this.over.dataset.id);

    if(from < to) to--;
    items.splice(to, 0, items.splice(from, 1)[0]);
    this.setState({items: items});
  }

  dragOver(event) {
    event.preventDefault();
    this.dragged.style.display = "none";
    if(event.target.className === 'placeholder') return;
    this.over = event.target;
    event.target.parentNode.insertBefore(placeholder, event.target);
  }

  mapToListItems = (items, props) => {
    const data = { todo: [], done: [] }

    items = items.filter( item => item)
    items.map( (item, index) => {
      const listItem = <TodoListItem
        item={item}
        allTasks={this.props.items}
        {...props}
        id={item.task_id}
        key={item.task_id}
        draggable='true'
        onDragEnd={this.dragEnd.bind(this)}
        onDragStart={this.dragStart.bind(this)}
        />

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
        <b>Incomplete:</b>
        <ul className="TodoList-active collection" onDragOver={this.dragOver.bind(this)}>
          {listItems.todo}
        </ul>
        <b>Complete:</b>
        <ul className="TodoList-done collection" onDragOver={this.dragOver.bind(this)}>
          {listItems.done}
        </ul>
      </div>
    )
  	}
  }

  export default List
