const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/update-mongodb', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect('your-mongodb-connection-string', { useNewUrlParser: true });
    const db = client.db('your-database-name');

    // Insert data into MongoDB
    await db.collection('your-collection-name').insertMany(req.body);

    // Close MongoDB connection
    client.close();

    res.status(200).send('Data inserted into MongoDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
