import React, { Component } from 'react';

/** 
 * The component takes a prop called carId,
 * which is used to call the handleClick function
 * when the button is clicked.
 */
class PutButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(paramId) {
    this.props.onInputRecord();
  }

  /**
   * The render method returns a button
   * that calls the handleClick function when clicked.
   * The carId prop is passed to handleClick as a parameter.
   */
  render() {
    const { carId }  = this.props ; // Replace with your paramId
    return (
      <button onClick={() => this.handleClick(carId)}>Update</button>
    );
  }
}

export default PutButton;

