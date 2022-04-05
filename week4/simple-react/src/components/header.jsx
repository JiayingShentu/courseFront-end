import React, { Component } from 'react';

export default class Header extends Component {
  handleKeyUp = event => {
    const { keyCode, target } = event;
    console.log(keyCode);
    if (keyCode !== 13) {
      return;
    }
    if (target.value.trim() == '') {
      target.value = '';
      return;
    }
    const todo = { id: Date.now(), name: target.value, completed: false };
    this.props.addTodo(todo);
    target.value = '';
  };

  render() {
    return (
      <div>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyUp={this.handleKeyUp}></input>
      </div>
    );
  }
}
