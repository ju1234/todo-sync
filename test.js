const mysql = require('./src/DB/index');


mysql.sql('select * from tb_user;').then(data => {
  console.log(data);
}, err => {
  console.log('err', err);
});
