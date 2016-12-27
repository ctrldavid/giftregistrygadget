const express = require('express');

const app = express();

app.use('/static', express.static('public'));

app.get('/gadget3', (req, res) => {
  res.send(`
`);
});

app.listen(3777, () => {
  console.log('listening on 3777');
});

