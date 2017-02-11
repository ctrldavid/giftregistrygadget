const express = require('express');
const redis = require('redis');
const data = require('./gifts.json');

console.log(data);

const client = redis.createClient();

const app = express();

app.use('/static', express.static('public'));

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.set('content-type', 'application/json; charset=utf-8');
  next();
});

app.get('/reset', (req, res) => {
  console.log('storing raw data');
  data.forEach((item) => {
    client.rpush('gifts', `gift/${item.name}`);
    client.set(`gift/${item.name}`, JSON.stringify(item));
    res.end('done');
  });
});

app.get('/gift/:id', (req, res) => {
  console.log(`getting gift ${req.params.id}`);
  console.log(`getting gift gift/${req.params.id}`);
  client.get(`gift/${req.params.id}`, (err, value) => {
    res.end(value);
    console.log(`got gift ${value}`);
  });
});

app.get('/gifts', (req, res) => {
  client.lrange('gifts', 0, -1, (err, values) => {
    console.log(values);
    res.end(JSON.stringify(values));
  });
});

app.listen(3777, () => {
  console.log('listening on 3777');
});

