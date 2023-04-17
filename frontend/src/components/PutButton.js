import React, { Component } from 'react';

class PutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(paramId) {
    this.props.onInputRecord();
  }

  render() {
    const { carId }  = this.props ; // Replace with your paramId
    console.log("carId: ");
    console.log(carId);
    return (
      <button onClick={() => this.handleClick(carId)}>Update</button>
    );
  }
}

export default PutButton;

