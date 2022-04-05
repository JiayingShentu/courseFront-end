import React, { Component } from 'react';

export default class Item extends Component {
  state = { mouse: false };

  handleMouse = flag => () => {
    this.setState({ mouse: flag });
  };

  handleCheck = id => event => {
    this.props.updateTodo(id, event.target.checked);
  };

  handleDelete = id => {
    this.props.deleteTodo(id);
  };

  render() {
    const { id, name, completed } = this.props;
    return (
      <li
        className={completed === true ? 'completed' : ''}
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
            onClick={() => {
              this.handleDelete(id);
            }}
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
