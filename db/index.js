const mysql = require('mysql');

var today = new Date();
var now = today.toISOString().slice(0, 19).replace('T', ' ');
var date = '2021-08-02 12:12:12';

// const pool = mysql.createPool({
//     connectionLimit : 10,
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database:'sinbike',
//     port: '3306'
// })

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b90d12aad36973',
    password: '898af45a',
    database:'heroku_8ac8515a73a607a',
    port: '3306'
})

let sinbikedb ={};
sinbikedb.users = ()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users', (err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

sinbikedb.users_one = (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users where id = ?',[id], (err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results[0]);
        })
    })
};

sinbikedb.users_add = (params)=>{
    return new Promise((resolve,reject)=>{
        let sql = "INSERT INTO `users` (`first_name`, `last_name`, `email`, `phone`, `password`, 'created_at') VALUES (?)"
        pool.query(sql,[[params.first_name, params.last_name, params.email, params.phone, params.password, date]], (err,results)=>{
            if (err){
                return reject (err);
                console.log('error')

            } 
            console.log('user inserted')
            return resolve ('inserted successfuly');
        })
    })
};

sinbikedb.login_phone = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users where phone = ? and password = ?', [params.username, params.password],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

sinbikedb.login_email = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users where email = ? and password = ?', [params.username, params.password],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

module.exports = sinbikedb;