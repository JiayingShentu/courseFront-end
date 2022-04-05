import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <span className="todo-count">
          <strong>X</strong>
          <span> items</span>
          <span> left</span>
        </span>
        <ul className="filters">
          <li>
            <a href="#" className="selected">
              All
            </a>
          </li>
          <span></span>
          <li>
            <a href="#">Active</a>
          </li>
          <span></span>
          <li>
            <a href="#">Completed</a>
          </li>
        </ul>
      </div>
    );
  }
}
