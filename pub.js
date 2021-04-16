var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var randomize = require('randomatic')
var topic = 'allasdashboard'


client.on('connect', ()=>{
    setInterval(()=>{
        var message = randomize('0',2)
        client.publish(topic, message)
        console.log('Message sent!', message)
    }, 5000)
})

// var mqtt = require('mqtt')
// var client = mqtt.connect('mqtt://localhost:1234')
// var randomize = require('randomatic')
// var topic1 = 'peds'
// var topic2 = 'bikes'
// var topic3 = 'cars'



// client.on('connect', ()=>{
//     setInterval(()=>{
//         var message1 = randomize('0',2);
//         var message2 = randomize('0',2);
//         var message3 = randomize('0',2);
//         client.publish(topic1, message1)
//         console.log('Message sent!', message1)
//         client.publish(topic2, message2)
//         console.log('Message sent!', message2)
//         client.publish(topic3, message3)
//         console.log('Message sent!', message3)
//     }, 5000)
// })