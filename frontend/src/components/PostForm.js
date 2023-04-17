
import React, { Component } from 'react';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: "",
      make: "",
      seats: "",
      id: 0
    };
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const {model, make, seats, id} = this.props;
    this.setState({ model, make, seats, id });
  }

  //componentDidUpdate() {
    //const {model, make, seats, id} = this.props;
    //this.setState({ model, make, seats, id });
  //}

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  //shouldComponentUpdate(nextProps, nextState) {
    //// Only update if the count value changes
    //console.log('nexState.model: ' + nextState.model
        //+ 'thisState.seats: ' + this.state.seats);

    //return   nextState.model !== this.state.model
          //|| nextState.make !== this.state.make
          //|| nextState.seats !== this.state.seats ;
  //}

//  async handleInputSubmit(event, id) {
  async handleInputSubmit(event) {
    event.preventDefault();
    const { model, make, seats, id } = this.state;
    
    if (!id) {
      const response = await fetch('/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, make, seats })
      });
      console.log(response);
    } else {
      const response = await fetch(`/cars/${id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, make, seats, id })
      });
      console.log(response);
    }

    this.props.onFetchMessages()
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

