let cors = require("cors");
var express = require("express");
var loginroutes = require("./routes/loginroutes");
const bodyParser = require("body-parser");
const requirelogin = require('./middleware/requireLogin');
const io = require('./socketconnection/socket')
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'allasdashboard'

client.on('message', (topic, message)=>{
    message = message.toString()
    console.log(message)
    io.getIO().emit('datas', {action: 'messages', message: message});
})

client.on('connect', ()=>{
    client.subscribe(topic)
})

var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

var router = express.Router();

router.get('/', requirelogin,function(req,res){
    res.json({message:'welcome to alas dashboard'});
})



router.post('/register',loginroutes.register);
router.post('/login',loginroutes.login);
router.post('/validate',loginroutes.validate);


app.use('/api', router);
const server = app.listen(5000, ()=>{
    const io = require('./socketconnection/socket').init(server);
    io.on('connection', socket => {
        console.log('Client connected');
    })
});
// console.log(server);
