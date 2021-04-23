const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: 'p6s2y805'
})

db.connect((err) => {
  if (err) throw err;
  console.log('connected');
})