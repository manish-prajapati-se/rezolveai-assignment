const mysql=require('mysql2/promise');

//mysql connection configuration
const pool=mysql.createPool({
    host: 'localhost',
    database: 'school',
    user: 'root',
    password: '123'
});

module.exports=pool;