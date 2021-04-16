const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const connection = require('../dbconnection/connection')

module.exports = (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: "you must be logged inn"})
    }
    const token = authorization.replace("Allasuser ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in"})
        }

        const{_id} = payload
        connection.query('SELECT * FROM users WHERE id = ?', [_id], async function (error, results, fields) {
            if(error){
                return res.json({error: "no user found"})
            }
            else {
                console.log(results);
                req.user = results[0]
                next()
            }
        })
    })
}

