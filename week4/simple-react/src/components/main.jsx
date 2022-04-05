import React, { Component } from 'react';

import Item from './item';

export default class Main extends Component {
  allCompleted = () => {
    this.props.alldoneTodo();
  };

  render() {
    const { todos, type, updateTodo, deleteTodo } = this.props;

    const showTodo = todos.filter(todo => {
      switch (type) {
        case 'all':
          return todo;
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
      }
    });

    return (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={
            todos.filter(todo => todo.completed === false).length === 0
          }></input>
        <label
          onClick={() => {
            this.allCompleted();
          }}
          htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {showTodo.map(todo => (
            <Item
              key={todo.id}
              {...todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </section>
    );
  }
}
