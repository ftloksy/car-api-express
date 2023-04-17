
import React, { Component } from 'react';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // For debug.
      messages: [],
      model: "",
      make: "",
      seats: "",
      id: 0
    };
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.endPutAction = this.endPutAction.bind(this);
  }

  componentDidMount() {
    const {model, make, seats, id} = this.props;
    this.setState({ model, make, seats, id });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  //handleClick(paramId) {
    //fetch(`/cars/${paramId}`, {
      //method: 'DELETE',
      //headers: {
        //'Content-Type': 'application/json'
      //}
    //}).then(response => {
      //if (!response.ok){
        //throw Error(response.statusText);
      //};
    //}).then(() => {
      //this.props.onFetchMessages();
    //}).catch(error => {
      //console.log('Fetch error:', error);
    //});
  //}


  handleInputSubmit(event) {
    event.preventDefault();
    const { model, make, seats, id } = this.state;
    
    if (!id) {
      fetch('/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, make, seats })
      }).then(response => {
        if (!response.ok){
          throw Error(response.statusText);
        };
      }).then(() => {
        this.endPutAction()
      }).catch(error => {
        console.log('Fetch error:', error);
      });
    } else {
      fetch(`/cars/${id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, make, seats, id })
      }).then(response => {
        if (!response.ok){
          throw Error(response.statusText);
        };
      }).then(() => {
        this.endPutAction()
      }).catch(error => {
        console.log('Fetch error:', error);
      });
    }
  }
  
  endPutAction() {
    this.props.onFetchMessages();
    this.setState({ model: "", make: "", seats: "", id: 0 });
  }

  render() {
    const {model, make, seats, id} = this.state;
    const isPut = Boolean(id);
    return (
      <form onSubmit={(event) => this.handleInputSubmit(event, id)}>
        { isPut ? <h1>Update the no. {id} record.</h1> : <h1>Add Car Information.</h1> }
        <label>Model: </label>
        <input
          type="text" 
          value={model} 
          id="modelId" 
          name="model" 
          onChange={this.handleInputChange}
          /><br/>
        <label>Make: </label>
        <input
          type="text"
          value={make}
          id="makeId"
          name="make"
          onChange={this.handleInputChange}
          /><br/>
        <label>Seats: </label>
        <input
          type="text"
          value={seats}
          id="seatsId"
          name="seats"
          onChange={this.handleInputChange}
          /><br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default PostForm;

