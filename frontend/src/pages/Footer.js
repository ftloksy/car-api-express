import React, { Component } from 'react';

/**
 * The footer section of the application
 * show the title for social media link
 * and the copyright information
 */
class Footer extends Component {

  render() {
    return (
      <footer>
        <follow-me>
          <h2>Follow Us</h2>
          <copyright>
            Copyright &copy; 2023 - 2024 Frankie LLC.
            <br/>
            Designed By Frankie Chow
          </copyright>
        </follow-me>
      </footer>
    );
  }
}

export default Footer;
