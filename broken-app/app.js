const express = require('express');
const axios = require('axios'); // Import axios
const app = express(); // create an instance of the Express application

app.use(express.json()); // Use JSON body parser middleware

// Create a route to handle GET/POST requests for /api/data
app.post('/', async (req, res, next) => {
  try {
    const { developers } = req.body;

    // Use Promise.all to fetch data from GitHub for all developers concurrently
    const results = await Promise.all(
      developers.map(async (d) => {
        const response = await axios.get(`https://api.github.com/users/${d}`);
        return response.data;
      })
    );

    // Map the results to the desired format
    const out = results.map((r) => ({ name: r.name, bio: r.bio }));

    return res.json(out); // Send the response as JSON
  } catch (err) { // if error occurs, it is caught in a `try...catch` block. errors are passed to `next` function.
    next(err);
  }
});

// server is started and listening on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
