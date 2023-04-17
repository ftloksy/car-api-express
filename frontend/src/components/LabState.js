import React, { Component } from 'react';

class LabState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only update if the count value changes
    return nextState.count !== this.state.count;
  }

  handleClick = () => {
    // Use setState() to update the count state
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

export default LabState;

