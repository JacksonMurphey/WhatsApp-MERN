//In package.json, I add line 5: "type": "module" -> This allows for ES6 syntax.
//Example: import express from 'express' is now usable. Without the 'type' added, syntax would be: const express = require('express')
//MongoDB-cluster PW: rn_h_q8A_ELhx3c

//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './models/messages.model.js'
import Pusher from 'pusher'
import cors from 'cors'


//app config
const app = express()
const port = process.env.PORT || 8000

//  --> ran: npm install pusher
//  --> Pusher is what will allow us to use MongoDb changeStream, so that we can get real-time updated data
const pusher = new Pusher({
    appId: "1405006",
    key: "2e2fa9c81dc5c29fd19f",
    secret: "136649a93aef12c6f066",
    cluster: "us2",
    useTLS: true
});

const db = mongoose.connection
db.once('open', () => {
    console.log('Mongoose.connection is now open')

    const msgCollection = db.collection('messages')
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change) => {
        console.log(change)
        if (change.operationType === 'insert') { //operationType is a field returned inside the change object
            const messageDetails = change.fullDocument //fullDocument is another field, which contains the data sent by the user.
            pusher.trigger('new-messages', 'inserted', {
                _id: messageDetails._id,
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log('Error Occured with triggering Pusher')
        }
    })
})



//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", '*')
//     req.setHeader("Access-Control-Allow-Headers", '*')
//     next()
// })




//DB config: move to config file
const pw = 'rn_h_q8A_ELhx3c'
const dbName = 'whatsappDB'
const connection_url = `mongodb+srv://admin:${pw}@cluster0.5vozs.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Established Connection to database: ${dbName}`))
    .catch(err => console.log('Error occured while connection to the DB', err))




//api routes: move to a routes file
app.get('/', (req, res) => res.status(200).send('Hello World'))

app.get('/api/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/api/messages/new', (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})


// app.get('/api/messages/sync', (req, res) => {
//     Messages.find()
//         .then((allMessages) => {
//             res.json(allMessages)
//             res.status(200).send(allMessages)
//         })
//         .catch(err => res.status(500).send(err))
// })

// app.post('/api/messages/new', (req, res) => {
//     const dbMessage = req.body
//     Messages.create(dbMessage)
//         .then((newMessage) => {
//             console.log(newMessage)
//             res.json(newMessage)
//             res.status(201).send(newMessage)
//         })
//         .catch(err => { res.status(500).send(err) })
// })


//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))
