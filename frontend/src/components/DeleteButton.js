
import React, { Component } from 'react';

class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  /**
   * The handleClick method sends a DELETE request
   * to the server using the fetch API to remove a car
   * record identified by the paramId parameter.
   * If the response is not successful,
   * an error is thrown. Once the record is deleted,
   * the onFetchMessages callback function passed as
   * a prop is called to update the component's state.
   */
  handleClick(paramId) {
    fetch(`/cars/${paramId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok){
        throw Error(response.statusText);
      };
    }).then(() => {
      this.props.onFetchMessages();
    }).catch(error => {
      console.log('Fetch error:', error);
    });
  }

  /**
   * The render method returns a button element
   * that triggers the handleClick method when clicked,
   * with the carId parameter passed as an argument.
   */
  render() {
    const { carId }  = this.props ; // Replace with your paramId
    return (
      <button onClick={() => this.handleClick(carId)}>Delete</button>
    );
  }
}

export default DeleteButton;

