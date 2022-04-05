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
  };

  addTodo = todo => {
    const { todos } = this.state;
    const newtodo = [todo, ...todos];
    this.setState({ todos: newtodo });
    console.log(newtodo);
  };

  render() {
    const { todos } = this.state;
    return (
      <div className="todoapp">
        <Title />
        <Header addTodo={this.addTodo} />
        <Main todos={todos} />
        <Footer />
      </div>
    );
  }
}
