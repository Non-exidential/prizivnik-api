const mysql           = require('mysql');

const connection      = mysql.createPool({
    host     : 'std-mysql',
    user     : 'std_280',
    password : '0909Pass9494',
    database : 'std_280'
});

exports.connection = connection;
