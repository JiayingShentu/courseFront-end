/* import { Switch, Route } from '@modern-js/runtime/router'; */
import React, { Component } from 'react';
import './App.css';
import { Header } from './components/header';
import { Title } from './components/title';
import { Main } from './components/main';
import { Footer } from './components/footer';

class App extends Component {
  render() {
    return (
      <div className="todoapp">
        <Title />
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
