const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;




// Middleware to parse JSON data in requests
app.use(express.json());

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
    const updatedData = req.body;
    const jsonData = JSON.stringify(updatedData, null, 2);
    fs.writeFileSync('./data/data.json', jsonData);
    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
