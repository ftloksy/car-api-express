# How to Test API with Postman

## Prerequisites

Before testing the API with Postman, make sure you have:

 - Installed Postman on your machine.
 - Run the API server.

## Testing the Endpoints

### GET /api

 1.  Open Postman and create a new request.
 2.  Set the request method to GET.
 3.  Set the request URL to http://localhost:3000/api.
 4.  Click on the "Send" button to send the request.
 5.  You should receive a response with a JSON object
     containing all the cars in the database.

### POST /cars

 6.  Open Postman and create a new request.
 7.  Set the request method to POST.
 8.  Set the request URL to http://localhost:3000/cars.
 9.  Click on the "Body" tab and select the "raw" option.
 10. Select "JSON" from the dropdown list
     and enter the following JSON data in the text area:

           {
             "make": "Tesla",
             "model": "Model S",
             "seats": 5
           }

 11. Click on the "Send" button to send the request.
 12. You should receive a response with a JSON object
     containing the newly created car.

### DELETE /cars/:id

 13. Open Postman and create a new request.
 14. Set the request method to DELETE.
 15. Set the request URL to http://localhost:3000/cars/:id,
     replacing :id with the ID of the car you want to delete.
 16. Click on the "Send" button to send the request.
 17. You should receive a response with a status code of 204
     if the car was successfully deleted or a status code of 404
     if the car was not found.

### PUT /cars/:id

 18. Open Postman and create a new request.
 19. Set the request method to PUT.
 20. Set the request URL to http://localhost:3000/cars/:id,
     replacing :id with the ID of the car you want to update.
 21. Click on the "Body" tab and select the "raw" option.
 22. Select "JSON" from the dropdown list
     and enter the following JSON data in the text area:

           {
             "model": "Model X",
             "seats": 7
           }

 23. Click on the "Send" button to send the request.
 24. You should receive a response with a JSON object
     containing the updated car information.
