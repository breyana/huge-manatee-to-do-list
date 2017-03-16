import React from 'react'

const placeholder = document.createElement("li");
placeholder.className = "placeholder";

class DragAndDrop extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        items: [1, 2, 3, 4]
      };
  }

  dragStart(event) {
    this.dragged = event.currentTarget;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.dragged);
  }

  dragEnd(event) {
    this.dragged.style.display = 'block';
    this.dragged.parentNode.removeChild(placeholder);
    // update state
     const items = this.state.items;
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

  render() {
      var listItems = this.state.items.map( (item, index) => {
        return (
          <li
            data-id={index}
            key={index}
            draggable='true'
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}>{item}</li>
        )
       });

  		return (
  			<ul onDragOver={this.dragOver.bind(this)}>
          {listItems}
        </ul>
  		)
  	}
  }

  export default DragAndDrop
