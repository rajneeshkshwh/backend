
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const connection = require('../dbconnection/connection')
const randomize = require('randomatic')
var nodemiler = require('nodemailer')
var transporter = nodemiler.createTransport({
  service: 'gmail',
  auth: {
    user: 'allasdash50@gmail.com',
    pass: 'Allas@1234'
  }
});


exports.register = async function(req,res){
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    let random = randomize("A0", 10);

    var users = {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "username": req.body.username,
        "email": req.body.email,
        "code": random,
        "password": encryptedPassword
    }
    connection.query('INSERT INTO users SET ?',users, function(error,results,fields){
        if (error) {
            res.send({
                "code":400,
                "failed":"error occured"
            })
        } else {
            var details = JSON.stringify('Username : '+req.body.username + '<br>Access Code: ' +random )
            var subject = JSON.stringify('Access code of ' +' '+ req.body.firstname +' '+ req.body.lastname)
            const mailOptions = {
              from: 'allasdash50@gmail.com',
              to: 'iqlipsen@gmail.com',
              subject,
              html: '<p>User Access code</p><br>' + details
            };

            transporter.sendMail(mailOptions, function(error,response){
              if(error){
                console.log(error);
              }else{
                res.send({
                  "code": 200,
                  "useremail": req.body.email,
                  "success": "user registered successfully"
                });
              }
            })
        }
    });
}

exports.login = async function(req,res){
    var email= req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        if(results.length >0){
          const comparision = await bcrypt.compare(password, results[0].password)
          if(comparision){
              const token = jwt.sign({_id:results[0].id},JWT_SECRET)
              res.send({
                "code":200,
                "token":token,
                "success":"login sucessfull",
                "firstname":results[0].firstname
              })
          }
          else{
            res.send({
              "code":204,
              "error":"Email and password does not match"
            })
          }
        }
        else{
          res.send({
            "code":206,
            "error":"Email does not exists"
          });
        }
      }
    });
}

exports.validate = async function(req,res){
   var code = req.body.code;
   var email = req.body.email;
   connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields){
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        if(Object.is(code, results[0].code)){
          const token = jwt.sign({_id:results[0].id},JWT_SECRET)
          const {firstname} = results[0]
          res.send({
            "code":200,
            "token":token,
            "firstname":firstname,
            "success":"registration and validation sucessfull"
          })
        }else{
          res.send({
            "code":206,
            "error":"Error access code"
          });
        }
      }
    }
   })
}