var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'allasdashboard'

client.on('message', (topic, message)=>{
    message = message.toString()
    console.log(message)
})

client.on('connect', ()=>{
    client.subscribe(topic)
})

// client.on('message', (topic, message)=>{
//     message = message.toString()
//     console.log(message)
//     io.getIO().emit('datas', {action: 'messages', message: message});
// })
