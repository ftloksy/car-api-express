import React, { Component } from 'react';

/**
 * This code defines a React component named AddButton.
 * It imports the React and Component modules.
 */
class AddButton extends Component {
  
  /**
   * The component has a constructor that initializes
   * the props and binds the handleClick function to the component instance. 
   */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * The handleClick function is called when the button is clicked,
   * and it calls the onAddRecord function passed as a prop.  
   */
  handleClick() {
    this.props.onAddRecord();
  }

  /**
   * The render method returns a button element
   * that calls the handleClick function when clicked,
   */
  render() {
    return (
      <button onClick={this.handleClick}>Add Record mode</button>
    );
  }
}

export default AddButton;
