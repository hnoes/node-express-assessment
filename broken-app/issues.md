# Broken App Issues

1. import axios: needed to import `axios` library at the beginning of the script. 

2. use JSON body parser: `express.json()` middleware to parse JSON request bodies. Add this middleware by using `app.use(express.json());`

3. Make the Route Handler Async: The route handler should be declared as an async function to allow the use of await inside it.

4. Destructure Request Body: Destructure the developers array from the request body to make it easier to work with.

5. Concurrent Requests: Use Promise.all to make concurrent requests to fetch data for all developers. This will significantly improve the performance compared to making sequential requests.

6. Send Response as JSON: Use res.json(out) to send the response as JSON. This is a more idiomatic way of sending JSON responses in Express.

7. Fixed the error handling: The catch block should receive the err parameter to properly handle errors. It should be catch (err).