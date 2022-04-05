import React, { Component } from 'react';

export default class Item extends Component {
  state = { mouse: false };

  handleMouse = flag => () => {
    this.setState({ mouse: flag });
    console.log(this.state.mouse);
  };

  handleCheck = id => event => {
    this.props.updateTodo(id, event.target.checked);
  };

  render() {
    const { id, name, completed } = this.props;
    return (
      <li
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}>
        <div className="view">
          <input
            className="toggle"
            type={'checkbox'}
            defaultChecked={completed}
            onChange={this.handleCheck(id)}
          />
          <label>{name}</label>
          <button
            type="button"
            className="destroy"
            style={{
              display: this.state.mouse ? 'block' : 'none',
            }}></button>
        </div>
      </li>
    );
  }
}
