const mysql = require('mysql');


class Mysql {
  constructor(options) {
    this.pool = mysql.createPool(options);
  }

  sql(sql) {
    return new Promise((res, rej) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          console.log('pool err', err);
          rej(err);
        } else {
          connection.query(sql, (err, data, fields) => {
            if (!err) {
              res(data, fields);
              connection.release();
            } else {
              rej(err);
              console.log('query err', err);
            }
          });
        }
      });
    });
  }
}

// 107.191.60.26
module.exports = (new Mysql({
  host: 'localhost',//主机地址
  user: 'root',//用户名
  password: '',//密码
  database: 'ju1234',//数据库名
  connectionLimit: 100,//连接池最大连接数（默认：10）
  queueLimit: 10// 连接池没有连接可用时，队列的最大长度（默认： 0）
}));