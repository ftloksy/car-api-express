# Car API

This is a RESTful API that provides CRUD operations for a car resource. It is built using Node.js, Express.js, and lowdb.

## Installation

 1. Clone this repository using git clone 
    https://github.com/ftloksy/car-api-express.git
 2. Navigate to the project directory: cd car-api-express
 3. Install dependencies: npm install

## Running the API

Run the following command to start the server:

           npm start

The API will be accessible at http://localhost:3000.

# Endpoints

The API provides the following endpoints:

## GET /api

Returns a list of all cars in the database.

## POST /cars

Creates a new car in the database.

### Request body

The request body should be a JSON object with the following properties:

 | Name  |	 Type  | Required |       	Description            |
 |-------|---------|----------|--------------------------------|
 | make	 |  string |  	Yes   |	The make of the car            |
 | model |	string |  	Yes   | The model of the car           |
 | seats |	number |   	Yes   |	The number of seats in the car |

## GET /cars/:id

Returns a single car with the specified ID.

## PUT /cars/:id

Updates an existing car with the specified ID.

### Request body

The request body should be a JSON object with the following properties:

 | Name  |	 Type  | Required |       	Description            |
 |-------|---------|----------|--------------------------------|
 | make	 |  string |  	No    |	The make of the car            |
 | model |	string |  	No    | The model of the car           |
 | seats |	number |   	No    |	The number of seats in the car |

## DELETE /cars/:id

Deletes an existing car with the specified ID.

# Testing

The API has been tested using the mocha test runner and the chai assertion library. To run the tests, run the following command:

           npm test

# License

This project is licensed under the MIT License. See the LICENSE file for details.
