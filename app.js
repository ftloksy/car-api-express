/**
 * This API allows users to manage a database of cars.
 * It exposes CRUD (Create, Read, Update, Delete) endpoints for cars.
 *
 *  GET /api - Returns a list of all cars in the database.
 *  POST /cars - Adds a new car to the database.
 *  PUT /cars/:id - Updates an existing car in the database.
 *  DELETE /cars/:id - Deletes an existing car from the database.
 *
 * The API uses the Express framework and the Lowdb database
 * to store and retrieve car data.
 * To use the API, send requests to the appropriate endpoint
 * using a tool like Postman or a web browser.
 * The API responds with JSON data.
 *
 * Example usage:
 *
 *  GET http://localhost:3000/api - 
 *           Returns a list of all cars in the database.
 *  POST http://localhost:3000/cars - 
 *           Adds a new car to the database.
 *  PUT http://localhost:3000/cars/1 - 
 *           Updates an existing car with ID 1.
 *  DELETE http://localhost:3000/cars/1 - 
 *           Deletes an existing car with ID 1.
 *  See the README.md file for more information
 *  on how to run and test the API.
 */

// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import _ from 'lodash';

dotenv.config();

// Define the location of the database file and server port
const databaseFile = process.env.DATABASE || './src/assets/cars.json';
const serverPort = process.env.PORT || 3000;

// Initialize the Express app and set up the database
const app = express();
const adapter = new JSONFile(databaseFile);
const db = new Low(adapter);

// Use body-parser to parse request bodies as JSON
app.use(bodyParser.json());

// Define function to get a car by its ID from the database
const getCarById = async (id) => {

  // Read from the database
  await db.read();
  
  // If cann't read anything, init the database.
  db.data ||= { cars: [] };

  // Use lodash to find the car with the specified ID
  const car = _.find(db.data.cars, { id: id });

  // Return the car or undefined if not found
  if (!car) {
    return;
  }
  return car;
};

// Define a route for retrieving all cars in the database
app.get('/api', (req, res) => {

  db.read().then(() => {
    db.data ||= { cars: [] };
    res.set('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(db.data));
  });

});

// Define a route for adding a new car to the database
app.post('/cars', (req, res) => {

  /**
   * Extract the make, model, and seats properties
   * from the request body
   */
  const carMake = req.body.make;
  const carModel = req.body.model;
  const carSeats = req.body.seats;

  // Check that all required properties are present
  if ( carMake && carModel && carSeats) {

    // find the max id in the cars database .
    const maxCarId = db.read().then(() => {

      db.data ||= { cars: [] };

      /**
       * First checks if there are any cars in the database,
       * and if not, it returns 0.
       * Otherwise, it uses the lodash maxBy function
       * to find the car with the highest ID and returns that ID. 
       */
      if (db.data.cars.length === 0) {
        return 0;
      } else {
        const maxId = _.maxBy(db.data.cars, 'id').id;
        return maxId;
      };
    });

    // Add the new car to the database and send a success response
    maxCarId.then((value) => {
      res.set('Content-Type', 'application/json');
      const sendRes = { 
        car: { 
          id: value + 1,  
          make: carMake, 
          model: carModel, 
          seats: carSeats 
          }};

      // Add the new car to the database
      db.read().then(() => {
        db.data ||= { cars: [] };
        db.data.cars.push(sendRes.car);
      }).then(() => {
        db.write().then(() => {
          res.status(201).send(JSON.stringify(sendRes));
        });
      });
    });

  } else {
    // Send a 400 error response if any required properties are missing
    res.status(400).send("Some require fields are missing.");
  };
});

/**
 * This code defines a DELETE request handler for the '/cars/:id' endpoint.
 * The endpoint accepts a parameter ':id',
 * which is the ID of the car to be deleted.
 */
app.delete('/cars/:id', (req, res) => {

  // Extract the car ID from the request parameters
  const paramId = parseInt(req.params.id);

  /**
   * If 'getCarById' returns a car,
   * the handler proceeds to remove it from the database.
   */
  getCarById(paramId).then((targetCar) => {
    if (targetCar) {
      const updatedCar = _.remove(
        db.data.cars, car => car.id === targetCar.id );

      /**
       * The database is then written to disk,
       * and the handler sends a response to the client.
       */
      db.write().then(() => {
        if (updatedCar) {
          res.status(204).send(`Find with ID ${paramId}.`);
        } else {
          res.status(404).send('Cannot find anything');
        }
      });
    } else {
      res.status(404).send('Internal Server Error.');
    }
  });
});

/**
 * This code defines an HTTP PUT endpoint at the /cars/:id URL path.
 * When a client makes a PUT request to this endpoint,
 * the server will try to update a car resource with the specified ID.
 */
app.put('/cars/:id', (req, res) => {

  /**
   * The function begins by extracting the model
   * and seats fields from the request body,
   * and parsing the id parameter from the request URL using parseInt().
   */
  const carModel = req.body.model;
  const carSeats = req.body.seats;
  const paramId = parseInt(req.params.id);

  /**
   * If the car is found,
   * the function updates the car object's model
   * and seats fields with the values from the request body.
   */
  getCarById(paramId).then((targetCar) => {
    if (targetCar) {
      if (carModel) {
        targetCar.model = carModel ;
      };
      if (carSeats) {
        targetCar.seats = carSeats ;
      };

      /**
       * The db.write() method is called to save the changes
       * to the database,
       * and the updated car object is returned
       * to the client as a JSON string.
       */
      db.write().then(() => {
        
        res.set('Content-Type', 'application/json')
          .status(200).
          send(JSON.stringify(targetCar));
      });
    } else {

      /**
       * If the specified car is not found,
       * the function sends a 404 error response to the client.
       */
      res.status(404).send('Internal Server Error.');
    }
  });
});

// Route handler for unknown routes
app.use((req, res, next) => {
  // check if the requested URL path is equal to '/carbrands'
  if (req.path === '/api') {
    // pass the request to the next middleware or route handler
    next();
  } else {
    // send a 404 response with an error message to the client
    res.status(404)
      .send('Sorry! Can’t find that resource. Please check your URL');
  }
});

export default app.listen(serverPort);
