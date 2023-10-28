/*
  server.js

  Description:
  This Node.js file defines an Express server that serves a JSON data file and allows saving user-edited data back to the file. 
  It uses Express as a middleware framework and enables CORS support. The server listens on port 3000 by default.

  Endpoints:
  - GET '/api/data': Serves the JSON data file.
  - POST '/api/data': Allows saving updated data back to the file.

  Author: Shankar Kailas
*/


const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const cors = require('cors');




// Middleware to parse JSON data in requests
app.use(express.json({limit: '50mb'}));
app.use(cors())

// Serve the JSON file
app.get('/api/data', (req, res) => {
  try {
    fs.readFile("./data/data.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        
        const data = JSON.parse(jsonString);
        res.json(data);
      });
  } catch (error) {
    res.status(500).json({ error: 'Error reading data' });
  }
});

// Save the updated data
app.post('/api/data', (req, res) => {
  try {
    // deleting the old data file
    fs.unlink("./data/data.json", (err) => {
      if (err) {
          throw err;
      }
  
      console.log("Delete old File successfully.");
      
      // creating the new data file based on user edits
      fs.writeFile("./data/data.json", JSON.stringify(req.body, null, 2), (err) => {
        if (err){
          throw err;
        }
        console.log("created updated Data file")
      })
  });
  } 
  catch (error) {
    res.status(500).json({ error: 'Error saving data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
