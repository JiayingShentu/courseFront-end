import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    const { todos } = this.props;
    const total = todos.filter(todo => todo.completed == false).length;
    return (
      <div className="footer">
        <span className="todo-count">
          <strong>{total}</strong>
          <span> items</span>
          <span> left</span>
        </span>
        <ul className="filters">
          <li>
            <a className="selected">All</a>
          </li>
          <span></span>
          <li>
            <a>Active</a>
          </li>
          <span></span>
          <li>
            <a>Completed</a>
          </li>
        </ul>
      </div>
    );
  }
}
