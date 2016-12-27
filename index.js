const express = require('express');
const redis = require('redis');

const client = redis.createClient();

const app = express();

app.use('/static', express.static('public'));

app.get('/gadget3', (req, res) => {
  res.send(`
`);
});

app.get ('/gifts/:id', (req, res) => {
  console.log(`getting gift ${req.params.id}`);
});

app.listen(3777, () => {
  console.log('listening on 3777');
});

