import React, { Component } from 'react';

import Item from './item';

export default class Main extends Component {
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
