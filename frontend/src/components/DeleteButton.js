import React, { Component } from 'react';

class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
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

  render() {
    const { carId }  = this.props ; // Replace with your paramId
    return (
      <button onClick={() => this.handleClick(carId)}>Delete</button>
    );
  }
}

export default DeleteButton;

