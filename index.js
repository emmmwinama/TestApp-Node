var express = require('express');
const app = express();
const conn = require('mysql');
const port = process.env.PORT || 8000;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/customer', (req, res) => {
  res.render('form');
});

app.post('/addcustomer', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
