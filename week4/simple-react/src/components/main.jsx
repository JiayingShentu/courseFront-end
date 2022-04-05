import React, { Component } from 'react';

import Item from './item';

export default class Main extends Component {
  render() {
    const { todos, updateTodo, deleteTodo } = this.props;
    return (
      <section className="main">
        <ul className="todo-list">
          {todos.map(todo => (
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
