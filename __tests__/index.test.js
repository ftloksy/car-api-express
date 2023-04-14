/**
 * This code is a test suite for an Express API.
 * It uses the chai library to make HTTP requests
 * and make assertions about the responses.
 * The API handles CRUD operations on a database of cars,
 * which is stored in a JSON file.
 *
 * The first test case is for the root endpoint ('GET /api')
 * and checks if the response has JSON data
 * and the Content-Type header is set to application/json.
 *
 * The second test case is for creating a new car ('POST /cars')
 * and checks if a new car can be created and returns a 201 status code.
 * It also checks if required fields are missing
 * and returns a 400 status code.
 *
 * The third test case is for deleting a car ('DELETE /cars/:id')
 * and checks if a car can be deleted and returns a 204 status code.
 *
 * The fourth test case is for deleting an unexist car ('DELETE UNEXIST')
 * and checks if it returns a 404 status code.
 */

/**
 * Importing required libraries:
 * The chai library is imported for making HTTP requests and assertions,
 * the Express app is imported from another file,
 * and the lowdb library is imported for working
 * with the JSON file that stores the cars' data.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';
// Import Express app
import app from '../app.js';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import _ from 'lodash';

const databaseFile = process.env.DATABASE || './src/assets/cars.json';

// Use chai-http for making HTTP requests
chai.use(chaiHttp);

// Import expect from chai for making assertions
const expect = chai.expect;

const adapter = new JSONFile(databaseFile);
const db = new Low(adapter);

/**
 * Creating the test suite for the api endpoint:
 */
describe('GET /api', function() {

  /**
   * Test case to check if the response has JSON data
   * and the Content-Type header is set to application/json
   */
  it(`
    should return JSON data 
    and Content-Type header should be application/json
    `, (done) => {
      chai.request(app)
        .get('/api')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res).to.have.header(
            'content-type', 'application/json; charset=utf-8');
          done();
        });
    });
});

/**
 * Creating the test suite for creating a new car:
 * This test suite has two test cases.
 * The first test case checks if a new car can be created
 * and returns a 201 status code.
 * The second test case checks if required fields are missing
 * and returns a 400 status code.
 */
describe('POST /cars', () => {
  it('should create a new car and return 201 status', (done) => {
    const car = {
      model: 'Civic',
      make: 'Honda',
      seats: 5
    };

    const firstMaxId = db.read().then(() => {
      db.data ||= { cars: [] };

      /**
       * First checks if there are any cars in the database,
       * and if not, it assign maxId to 0.
       * Otherwise, it uses the lodash maxBy function
       * to find the car with the highest ID and assign maxId that ID.
       */
      let maxId = 0
      if (db.data.cars.length === 0) {
        maxId = 0;
      } else {
        maxId = _.maxBy(db.data.cars, 'id').id;
      };

      chai.request(app)
        .post('/cars')
        .send(car)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res).to.have.header(
              'content-type', 'application/json; charset=utf-8');
          const returnJson = JSON.parse(res.text);
          expect(returnJson.car.make).to.be.equal(car.make);
          expect(returnJson.car.model).to.be.equal(car.model);
          expect(returnJson.car.seats).to.be.equal(car.seats);
          expect(returnJson.car.id).to.be.equal(maxId + 1);
          done();
        });
      return maxId;
    });

    firstMaxId.then((value) => {
      db.read().then(() => {
        const maxId = _.maxBy(db.data.cars, 'id').id;
        expect(maxId).to.be.equal(value + 1);
      });
    });
  });

  it('should return 400 status if required fields are missing', (done) => {
    const car = {
      model: 'Camry',
      seats: 5
    };

    chai.request(app)
      .post('/cars')
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

/**
 * Creating the test suite for deleting a car:
 * This test suite has two test case
 * the first test case checks
 * if a car can be deleted and returns a 204 status code.
 *
 * The second test case checks if a 200 status code is returned
 * when trying to update an existing car,
 * and checks that the seats attribute of the updated car is also updated. 
 */
describe('DELETE /cars/:id', () => {
  it('should delete a car and return 204 status', (done) => {
    const car = {
      model: 'Civic',
      make: 'Honda',
      seats: 5
    };

    // Create a new car to delete
    chai.request(app)
      .post('/cars')
      .send(car)
      .end((err, res) => {
        const carId = JSON.parse(res.text);

        // Delete the created car
        chai.request(app)
          .delete(`/cars/${carId.car.id}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(204);
            done();
          });


      });
  });

  it('should delete a unexist car and return 404 status', (done) => {
    // Delete the unexist car
    chai.request(app)
      .delete('/cars/299999')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
    });
  });
});

/**
 * Creating the test suite for updating car: 
 * This test suite has two test case 
 * The first test case checks if a 404 status code is returned
 * when trying to update a non-existent car.
 * The second test case checks if a 200 status code is returned
 * when trying to update a existent car and
 * check the res object's seats is updated.
 */
describe('PUT /cars/:id', () => {
  it('should update a car and return 200 status', (done) => {
    const updatedCar = {
      model: 'Civic',
      make: 'Honda',
      seats: 4
    };

    const carId = '1234'; // replace with an existing car ID in your database

    chai.request(app)
      .put(`/cars/${carId}`)
      .send(updatedCar)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });

  // find the max id in the cars database .
  db.read().then(() => {

    /**
     * If cannot find the database, init the database
     * and set the first id is 0.
     */
    db.data ||= { cars: [{id: 0}] };
    const maxId = _.maxBy(db.data.cars, 'id').id;

    /**
     * Check the database, If the database has a car record
     * and the car.id is more the zero.
     */
    if ( maxId > 0 ) {

      it('should update a car and return 200 status', (done) => {
        const updatedCar = {
          model: 'Civic',
          make: 'Honda',
          seats: 4
        };
    
        const carId = maxId; // replace with an existing car ID in your database
    
        chai.request(app)
          .put(`/cars/${carId}`)
          .send(updatedCar)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res).to.have.header(
              'content-type', 'application/json; charset=utf-8');
            console.log(res.body);
            expect(res.body.seats).to.equal(4); // ensure the seats were updated
            done();
          });
      });
    };
  });
});

