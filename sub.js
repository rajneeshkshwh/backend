var mqtt = require('mqtt')
var options ={
    name: "deployment-u4a179e5",
    username: "allaas",
    password: "allaas",
    port: "11867"
}
var client = mqtt.connect('mqtt://u4a179e5.en.emqx.cloud',options)
var topic = 'dashboard'

client.on('message', (topic, message)=>{
    message = JSON.parse(message)
    console.log(typeof(message),message)
})

client.on('connect', ()=>{
    client.subscribe(topic)
})

// client.on('message', (topic, message)=>{
//     message = message.toString()
//     console.log(message)
//     io.getIO().emit('datas', {action: 'messages', message: message});
// })
