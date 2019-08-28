const path = require('path');

const mysql = require('mysql');

module.exports= (app, connection) => {
  app.get('/', (req, res) => {
    connection.query('SELECT * FROM `data-test`.user;', (err, data) => {
      (err)?res.send(err):res.json({users:data});
    });
  });
}