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
  (new Promise((resolve) => client.del('gifts', resolve))).then(() => {
    data.forEach((item) => {
      client.rpush('gifts', `gift/${item.name}`);
      client.set(`gift/${item.name}`, JSON.stringify(item));
      res.end('done');
    });
  });
});

app.get('/gift/:id', (req, res) => {
  console.log(`getting gift ${req.params.id}`);
  client.get(`gift/${req.params.id}`, (err, value) => {
    res.end(value);
    console.log(`got gift ${value}`);
  });
});

app.get('/gift/:id/reserve', (req, res) => {
  console.log(`attempting to reserve gift ${req.params.id}`);
  client.get(`gift/${req.params.id}`, (err, value) => {
    console.log(`got gift ${value}`);
    var gift = JSON.parse(value);
    if (gift.reserved) {
      console.log('Gift already reserved');
      res.end(JSON.stringify({error: "This gift was already reserved!"}));
      return;
    }
    gift.reserved = true;
    gift.reservedAt = (new Date()).toISOString();
    client.set(`gift/${req.params.id}`, JSON.stringify(gift), (err) => {
      if (err) { res.end(JSON.stringify({error:err})); }
      res.end(JSON.stringify({success: "Gift has been reserved"}));
    });
  });
});

app.get('/gift/:id/unreserve', (req, res) => {
  console.log(`attempting to unreserve gift ${req.params.id}`);
  client.get(`gift/${req.params.id}`, (err, value) => {
    console.log(`got gift ${value}`);
    var gift = JSON.parse(value);
    if (!gift.reserved || !gift.reservedAt) {
      console.log('Gift not reserved');
      res.end(JSON.stringify({error: "This gift wasn't reserved!"}));
      return;
    }

    var reservedAt = new Date(gift.reservedAt);
    var elapsed = new Date() - reservedAt;
    if (elapsed > 15 * 60 * 1000) {
      console.log('Gift has been reserved for too long');
      res.end(JSON.stringify({error: "Gift has been reserved for too long to undo!"}));
      return;
    }
    gift.reserved = false;
    gift.reservedAt = undefined;
    client.set(`gift/${req.params.id}`, JSON.stringify(gift), (err) => {
      if (err) { res.end(JSON.stringify({error:err})); }
      res.end(JSON.stringify({success: "Gift has been unreserved"}));
    });
  });
});

app.get('/gifts', (req, res) => {
  client.lrange('gifts', 0, -1, (err, values) => {
    console.log(values);
    client.mget(values, (err, full) => {
      console.log(full);
      full = full.map((str) => JSON.parse(str));
      res.end(JSON.stringify(full));
    });
  });
});

app.listen(3777, () => {
  console.log('listening on 3777');
});

