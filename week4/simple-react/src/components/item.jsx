import React, { Component } from 'react';

export default class Item extends Component {
  render() {
    const { id, name, done } = this.props;
    return (
      <li>
        <div className="view">
          <input className="toggle" type={'checkbox'} defaultChecked={true} />
          <label>{name}</label>
          <button type="button" className="destory"></button>
        </div>
      </li>
    );
  }
}
