let cors = require("cors");
var express = require("express");
var loginroutes = require("./routes/loginroutes");
const bodyParser = require("body-parser");
const requirelogin = require('./middleware/requireLogin');
const io = require('./socketconnection/socket')
var mqtt = require('mqtt')
var options ={
    name: "deployment-u4a179e5",
    username: "allaas",
    password: "allaas",
    port: "11867"
}
var client = mqtt.connect('mqtt://localhost:1234')
var client2 = mqtt.connect('mqtt://u4a179e5.en.emqx.cloud',options)
var topic = 'peds'
var topic2 = 'bikes'
var topic3 = 'cars'
var topic4 = 'dashboard'

client.on('message', (topic, message)=>{
    message = message.toString()
    if(topic=='peds'){
    console.log(message)
    io.getIO().emit('datas', {action: 'messages', message: message});
    }
    else if(topic=='bikes'){
    console.log(message)
    io.getIO().emit('datas', {action: 'messages2', message: message});
    }
    else if(topic=='cars'){
    console.log(message)
    io.getIO().emit('datas', {action: 'messages3', message: message});
    }
})
client2.on('message', (topic, message)=>{
    message = JSON.parse(message)
    console.log(message)
    io.getIO().emit('datas', {action: 'messages', message: message.peds});
    io.getIO().emit('datas', {action: 'messages2', message: message.bikes});
    io.getIO().emit('datas', {action: 'messages3', message: message.cars});
})

client.on('connect', ()=>{
    client.subscribe(topic);
    client.subscribe(topic2);
    client.subscribe(topic3);
})
client2.on('connect', ()=>{
    client2.subscribe(topic4);
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
