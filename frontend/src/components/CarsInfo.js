import React, { Component } from 'react';
import DeleteButton from './DeleteButton';
import PostForm from './PostForm';
import PutButton from './PutButton';
import AddButton from './AddButton';

class CarsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      putModel: "",
      putMake: "",
      putSeats: "",
      putId: 0,
      postForm: <PostForm
        onFetchMessages={this.fetchMessages}
        make=""
        model=""
        seats=""
        id={0}
        /> 
    };
    this.fetchMessages = this.fetchMessages.bind(this);
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    fetch('/api').then(response => {
      if (!response.ok){
        throw Error(response.statusText);
      }
      return response.json();
    }).then(messages => {
      this.setState({ messages: messages.cars });
    }).catch(error => {
      console.log('Fetch error:', error);
    });
  };
  
  async updatePutInput(model, make, seats, id) {
    await this.setState({
      putModel: model,
      putMake: make,
      putSeats: seats,
      putId: id,
      postForm: null }, async () => {
      await this.setState({
        postForm: <PostForm  
          onFetchMessages={this.fetchMessages}
          make={make}
          model={model}
          seats={seats}
          id={id} />
        });
     });
  }

  render() {
    const { messages } = this.state;
      return (
      <div>
        {this.state.postForm}
        <table>
          <tr>
            <th>id</th>
            <th>make</th>
            <th>model</th>
            <th>seats</th>
            <th></th>
            <th>
              <AddButton onAddRecord={() => this.updatePutInput(
                      "", "", "", 0)}/>
            </th>
          </tr>
          {messages.map(message => (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>{message.make}</td>
              <td>{message.model}</td>
              <td>{message.seats}</td>
              <td><DeleteButton carId={message.id} 
                  onFetchMessages={this.fetchMessages}  /></td>
              <td><PutButton carId={message.id} 
                  onInputRecord={() => this.updatePutInput(
                    message.model, message.make, 
                    message.seats, message.id)} 
                  /></td>
            </tr>
          ))}
        </table>
      </div>
      );
  }
}

export default CarsInfo;
