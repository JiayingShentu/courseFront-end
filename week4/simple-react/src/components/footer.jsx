import React, { Component } from 'react';

export default class Footer extends Component {
  handleClearCompleted = () => {
    this.props.clearCompleted();
  };

  render() {
    const { todos } = this.props;
    const total = todos.filter(todo => todo.completed === false).length;
    return (
      <div className="footer">
        <span className="todo-count">
          <strong>{total}</strong>
          <span> items</span>
          <span> left</span>
        </span>
        <ul className="filters">
          <li>
            <a
              onClick={() => {
                this.props.filterHandler('all');
              }}
              className="selected">
              All
            </a>
          </li>
          <span></span>
          <li>
            <a
              onClick={() => {
                this.props.filterHandler('active');
              }}>
              Active
            </a>
          </li>
          <span></span>
          <li>
            <a
              onClick={() => {
                this.props.filterHandler('completed');
              }}>
              Completed
            </a>
          </li>
        </ul>
        <button
          onClick={() => {
            this.handleClearCompleted();
          }}
          className="clear-completed"
          style={{ display: 'block' }}>
          Clear completed
        </button>
      </div>
    );
  }
}
