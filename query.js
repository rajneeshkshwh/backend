const connection = require('../server/dbconnection/connection');

connection.query('SELECT * FROM geojson',async function(error, results, fields){
    if(error){
        console.log(error);
    }else {
        if(results.length > 0){
            console.log(results);
        }else{
            console.log(error);
        }
    }
})