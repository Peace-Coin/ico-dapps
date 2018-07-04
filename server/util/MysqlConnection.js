module.exports = {

  //MysqlConnectionの作成、使用後必ずfinnaly内でendConnectionすること。
  getConnection: () => {

    console.log('MysqlConnection getConnection() start...')

    var conf;

    if (process.env.NODE_ENV === 'production') {

      conf = require('../config/prodconf.json');

    }else{

      conf = require('../config/devconf.json');
    }

    'use strict';

    console.log('DB_HOST -> ' + conf.DB_HOST)
    console.log('DB_USER -> ' + conf.DB_USER)
    console.log('DB_PASSWORD -> ' + conf.DB_PASSWORD)
    console.log('DB_PORT -> ' + conf.DB_PORT)
    console.log('DB_SCHEMA -> ' + conf.DB_SCHEMA)

    let mysql = require('mysql');
    let connection = mysql.createConnection({
      host : conf.DB_HOST,
      user : conf.DB_USER,
      password : conf.DB_PASSWORD,
      port : Number(conf.DB_PORT),
      database: conf.DB_SCHEMA,
    });

    connection.connect();

    console.log('mysql connect success')

    return connection;

    // connection.query('SELECT * from test_table LIMIT 10;', (err, rows, fields) => {
    //   if (err) throw err;
    //
    //   console.log('The solution is: ', rows);
    // });
    //
    // connection.end();
  },
  endConnection: connection => {

    console.log('mysql connect end success')

    connection.end();
  }
};
