const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

const app = express();
app.set('view engine', 'pug');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bankapp',
  port: '3306',
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/add-customer', (req, res) => {
  res.render('form');
});

// API endpoint to render HTML file
app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.post('/customer', (req, res) => {
  var query = 'INSERT INTO customer(Fullname, Age, Gender, EmployeeStat, idNumber) VALUES ?';
  var values = [
    [
      req.body.name,
      req.body.age,
      req.body.gender,
      req.body.status,
      req.body.idnumber,
    ],
  ];
  conn.connect((err) => {
    if (err) throw err;
    console.log('Connected');
    conn.query(query, [values], (err, result) => {
      if (err) throw err;
      console.log('Number of Affected Rows: ' + result.affectedRows);
    });
  });
  console.log(values);
  res.redirect(303, '/');
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
