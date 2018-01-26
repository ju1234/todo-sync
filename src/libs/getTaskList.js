const DB = require('../DB'),
    TABLE_NAME = require('../DB/TABLE_NAME');


async function getTaskList(id) {
    const taskList = await DB.sql(`select id,name,delete,done, from ${TABLE_NAME.TB_TASK};`);

    console.log(taskList)
};




getTaskList()