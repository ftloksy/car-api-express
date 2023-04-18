/**
 *  This is a React component that renders
 *  a table of car information.
 *  It also allows the user to add, edit,
 *  and delete cars using various buttons.
 */
 
// Import React and necessary components
import React, { Component } from 'react';

/**
 * A custom component for the delete button
 * User click this button, database will delete this record.
 */
import DeleteButton from './DeleteButton';

/**
 * A custom component for the form used to add new cars
 * or modify exist cars's infomation.
 */
import PostForm from './PostForm';

/**
 * A custom component for the edit button 
 * when user click this button will use that car infomation
 * to update the PostFrom for modify that car infomation.
 */
import PutButton from './PutButton';

/**
 * A custom component for the add button
 * user can change the PostForm to add record mode.
 */
import AddButton from './AddButton';

// A custom component for the loading spinner
import Loading from './Loading';

/**
 * Define a new class called CarsInfo that extends
 * the Component class from React
 */
class CarsInfo extends Component {
  // Constructor that takes in props and sets the initial state
  constructor(props) {
    super(props);
    this.state = {

      // An array to store the car objects fetched from the API
      messages: [],

      // A boolean to show or hide the loading spinner
      loadingShow: false,

      // A string for the car model being edited
      putModel: "",

      // A string for the car make being edited
      putMake: "",

      // A number for the number of seats in the car being edited
      putSeats: "",

      // A string for the car Image Url being edited
      putImageUrl: "",

      // An ID for the car being edited
      putId: 0,

      // A JSX element for the form used to add new cars
      postForm: <PostForm

        // A function to call after the form is submitted
        onFetchMessages={this.fetchMessages}

        // A string for the make of the new car
        make=""

        // A string for the model of the new car
        model=""

        // A number for the number of seats in the new car
        seats=""

        // A string for the image url of the new car
        imageurl=""

        /**
         * An ID for the new car, 
         * Init PostForm for add a new car record.
         */
        id={0}
        /> 
    };

    // Bind the fetchMessages function to this component
    this.fetchMessages = this.fetchMessages.bind(this);
  }

  // Lifecycle method that runs after the component mounts
  componentDidMount() {

    // Fetch car data from the API
    this.fetchMessages();
  }

  // Function to fetch car data from the API
  fetchMessages() {

    /**
     * Set the loadingShow state to true
     * every update the database, include delete record, add new record and
     * modify a exist record then need the express and node to update
     * the json database file. It is need very long time.
     * In that time, the express cannot normal response the React.js fatch.
     * In this component default wait 3 seconds after update the json file
     * database, And then fetch the data from file database.
     * and show the 'DB Loading ....' five seconds.
     */
    this.setState({ loadingShow: true });
    this.loadingTimeout = setTimeout(() => {

      // After 5 seconds, set the loadingShow state to false
      this.setState({ loadingShow: false });
    }, 5000);
    this.fetchTimeout = setTimeout( () => {

      // Fetch data from the API
      fetch('/api')
        .then(response => {
          if (!response.ok){
            
            // If there is an error, throw an error
            throw Error(response.statusText);
          }
          response.json().then(messages => {

            /**
             * Store the car data in a variable
             * and Set the messages state to the car data
             */
            const msg = messages.cars;
            this.setState({ messages: msg });
          });
        }).catch(error => {
          
          // If there is an error, log the error to the console
          console.log('Fetch error:', error);
        }) 
      }, 3000);
  };

  // Lifecycle method that runs before the component unmounts
  componentWillUnmount() {
    
    // Clear the fetch and loading timeout
    clearTimeout(this.fetchTimeout);
    clearTimeout(this.loadingTimeout);
  }
  
  /**
   * Function to update the input fields
   *  when the user clicks the edit button
   * It takes in four parameters -
   *  model, make, seats, and id -
   *  which represent the values of the car being edited.
   */
  async updatePutInput(model, make, seats, imageurl, id) {
    
    /**
     * It first sets the putModel, putMake, putSeats,
     * and putId states to the values passed in as parameters.
     * 
     * it uses the await keyword to wait for the setState()
     * function to complete before proceeding.
     */
    await this.setState({

      putModel: model,
      putMake: make,
      putSeats: seats,
      putId: id,
      putImageUrl: imageurl,
      
      /**
       * It then sets the postForm state to null 
       * before setting it again to a
       * new PostForm component with the updated values.
       * every time add a new car record 
       * and modify different exist car record.
       * CarsInfo need recreate a new PostForm object for
       * Input date for record.
       */
      postForm: null }, async () => {
      await this.setState({
        postForm: <PostForm  
          onFetchMessages={this.fetchMessages}
          make={make}
          model={model}
          seats={seats}
          imageurl={imageurl}
          id={id} />
        });
     });
  }

  render() {
    const { messages, loadingShow } = this.state;
      return (
      <div>
        {this.state.postForm}
        <Loading loadingShow={loadingShow} />
        <table>
          <tr>
            <th>id</th>
            <th>make</th>
            <th>model</th>
            <th>seats</th>
            <th>image</th>
            <th></th>
            <th>
              <AddButton onAddRecord={() => this.updatePutInput(
                      "", "", "", "", 0)}/>
            </th>
          </tr>
          {messages.map(message => (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>{message.make}</td>
              <td>{message.model}</td>
              <td>{message.seats}</td>
              <td>{message.imageurl}</td>
              <td><DeleteButton carId={message.id} 
                  onFetchMessages={this.fetchMessages}  /></td>
              <td><PutButton carId={message.id} 
                  onInputRecord={() => this.updatePutInput(
                    message.model, message.make, 
                    message.seats, message.imageurl, message.id)} 
                  /></td>
            </tr>
          ))}
        </table>
      </div>
      );
  }
}

export default CarsInfo;
