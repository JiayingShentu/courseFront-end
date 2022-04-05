/* import { Switch, Route } from '@modern-js/runtime/router'; */
import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Title from './components/title';
import Main from './components/main';
import Footer from './components/footer';

export default class App extends Component {
  state = {
    todos: [
      { id: '01', name: '吃饭', completed: true },
      { id: '02', name: '睡觉', completed: false },
      { id: '03', name: '写代码', completed: false },
    ],
    type: 'all',
  };

  addTodo = todo => {
    const { todos } = this.state;
    const newtodo = [todo, ...todos];
    this.setState({ todos: newtodo });
  };

  updateTodo = (id, completed) => {
    const { todos } = this.state;
    const newTodo = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed };
      } else {
        return todo;
      }
    });
    this.setState({ todos: newTodo });
    console.log(newTodo);
  };

  deleteTodo = id => {
    const { todos } = this.state;
    const newTodo = todos.filter(todo => todo.id !== id);
    this.setState({ todos: newTodo });
    console.log(newTodo);
  };

  clearCompleted = () => {
    const { todos } = this.state;
    const newTodo = todos.filter(todo => todo.completed === false);
    this.setState({ todos: newTodo });
    console.log(newTodo);
  };

  filterHandler = filterType => {
    const { type } = this.state;
    this.setState({ type: filterType });
  };

  alldoneTodo = () => {
    const { todos } = this.state;
    let flag;
    if (todos.length !== todos.filter(todo => todo.completed).length) {
      flag = true;
    } else {
      flag = false;
    }
    const newTodo = todos.map(todo => ({ ...todo, completed: flag }));
    this.setState({ todos: newTodo });
    console.log(todos);
  };

  render() {
    const { todos, type } = this.state;
    return (
      <div className="todoapp">
        <Title />
        <Header addTodo={this.addTodo} />
        <Main
          todos={todos}
          type={type}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
          alldoneTodo={this.alldoneTodo}
        />
        <Footer
          todos={todos}
          type={type}
          clearCompleted={this.clearCompleted}
          filterHandler={this.filterHandler}
        />
      </div>
    );
  }
}
