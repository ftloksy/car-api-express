import React, { Component } from 'react';

class AddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(paramId) {
    this.props.onAddRecord();
  }

  render() {
    const { carId }  = this.props ; // Replace with your paramId
    return (
      <button onClick={() => this.handleClick(carId)}>Add</button>
    );
  }
}

export default AddButton;

