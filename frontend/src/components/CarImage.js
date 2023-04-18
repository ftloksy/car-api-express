/**
 * This is a React component called CarImage 
 * that fetches an image from a server 
 * and displays it as an <img> element in the rendered UI. 
 * Let's go through the code 
 * and add comments to explain what each part does:
 */
import React, { Component } from 'react';

class CarImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null
    };
  };

  componentDidMount() {
    
    /**
     * Fetch the image from the Express server
     * Fetches the image from the URL passed as a prop
     */
    fetch(this.props.urlsrc)
    
      // Converts the response to a Blob object
      .then(response => response.blob())
      .then(blob => {
        // Sets the Blob URL as the image source in the component's state
        this.setState({ imageSrc: URL.createObjectURL(blob) });
      })
      .catch(error => {
        console.error('Failed to fetch image:', error);
      });
  }

  render() {
    const { imageSrc } = this.state;

    return (
      <div>
        {imageSrc ? (
          <img src={imageSrc} alt="Example" />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
    );
  }
}

export default CarImage;

