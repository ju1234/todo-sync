const mysql = require('./src/DB/index');


mysql.sql('select group_concat("",id,",",done,",",name SEPARATOR ";"),deviceId from tb_task group by deviceId;').then(data => {
  console.log(data);
}, err => {
  console.log('err', err);
});
