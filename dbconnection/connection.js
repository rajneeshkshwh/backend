var mysql = require('mysql')

// var connection = mysql.createConnection({
//     host : 'us-cdbr-east-03.cleardb.com',
//     user : 'b894d595ba7762',
//     password : 'c402dcde',
//     database : 'heroku_3d61dcd058c9bda'
// })
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'dashboard'
})

connection.connect(function(err){
    if(err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id' + connection.threadId);
})

module.exports = connection;
// mysql://b894d595ba7762:c402dcde@us-cdbr-east-03.cleardb.com/heroku_3d61dcd058c9bda?reconnect=true