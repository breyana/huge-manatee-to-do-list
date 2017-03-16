import React from 'react'
import TodoListItem from './TodoListItem'

const placeholder = document.createElement("li");
placeholder.className = "placeholder";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props}
  }

  dragStart(event) {
    this.dragged = event.currentTarget;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.dragged);
  }

  dragEnd(event) {
    this.dragged.style.display = 'flex';
    console.log('parentNode:', this.dragged.parentNode)
    this.dragged.parentNode.removeChild(placeholder);

    // update state
     const items = this.props.items;
     console.log('items',items);
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
    console.log(items);
    items.map( (item, index) => {
      const listItem = <TodoListItem
        item={item}
        {...props}
        id={item.task_id}
        key={item.task_id}
        draggable='true'
        onDragEnd={this.dragEnd.bind(this)}
        onDragStart={this.dragStart.bind(this)}/>

      data[item.complete === true ? 'done' : 'todo'].push(listItem)
      return item
    })

    return data
  }

  render() {
    const { items, ...props } = this.props
    const listItems = this.mapToListItems(items, props)

  //  console.log(this.props.items);

    // const listItems = this.state.items.map( (item, index) => {
    //   return (
    //     <li
    //       data-id={index}
    //       key={index}
    //       draggable='true'
    //       onDragEnd={this.dragEnd.bind(this)}
    //       onDragStart={this.dragStart.bind(this)}>{item}</li>
    //   )
    //  })

    return (
      <div className="TodoList">
        Incomplete:
        <ul className="TodoList-active collection" onDragOver={this.dragOver.bind(this)}>
          {/* {listItems} */}
          {listItems.todo}
        </ul>
        Complete:
        <ul className="TodoList-done collection" onDragOver={this.dragOver.bind(this)}>
          {/* {listItems} */}
          {listItems.done}
        </ul>
      </div>
    )
  	}
  }

  export default List
