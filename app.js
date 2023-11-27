const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
app.use(express.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: '',
  password: '',
  database: 'uniloan'
});

module.exports.db = db;

const addclient = require('./routes/addclient');
const getclient = require('./routes/getclient');
const sendmail = require('./routes/sendmail');

app.use('/client/add', addclient);
app.use('/client/get', getclient);
app.use('/client/sendmail', sendmail);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Ressource introuvable' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

app.listen(port, () => {
  console.log(`API START : ${port}`)
});
