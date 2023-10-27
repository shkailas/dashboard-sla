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
    fs.unlink("./data/data.json", (err) => {
      if (err) {
          throw err;
      }
  
      console.log("Delete old File successfully.");
      //console.log(req.body, typeof(req.body))
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
