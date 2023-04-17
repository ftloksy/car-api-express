
import React, { Component } from 'react';

class Loading extends Component {
  constructor(props) {
    super(props);
    
    // Initialize the state of the component with a loading text
    this.state = {
      loadingText: 'DB Loading'
    };
  }

  componentDidMount() {
    
    // Set an interval to update the loading text every second
    this.interval = setInterval(() => {
      this.setState(prevState => {
        
        /**
         * Reset the loading text after it has reached a certain point
         * or the loadingText is length than 30 chars.
         */
        if (
             prevState.loadingText === 'DB Loading . . . . . .' 
          || prevState.loadingText > 30
        ) {
          return { loadingText: 'DB Loading' };
        }
        
        // Add a dot to the loading text
        return { loadingText: prevState.loadingText + ' .' };
      });
    }, 1000);
  }

  componentWillUnmount() {
    
    // Clear the interval to avoid memory leaks
    clearInterval(this.interval);
  }

  render() {
    const { loadingShow } = this.props;
    const { loadingText } = this.state;
    
    // Only display the loading text if the loadingShow prop is true
    return (
      <>
        {loadingShow && <div>{loadingText}</div>}
      </>
    );
  }
}

export default Loading;

