const http = require('http');
const express = require('express');
const app = express();
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://127.0.0.1:27017/chat";

const MessageController = require('./controllers/message')

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((err) => {
        console.error(err)
    });

const server = http.createServer(app)

const io = socketIo(server, {
    transports: ['websocket', 'polling'],
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }

})

io.on('connection', async (socket) => {
    console.log('New user connected to the server')

    try {
        const messages = await MessageController.getAllMessages()
        socket.emit('previousMessages', messages)
    } catch (error) {
        console.log(error)
    }

    socket.on('message', async (message) => {
        console.log('message:', message.content)

        try {
            const savedMessage = await MessageController.saveMessage(message.content)
            io.emit('message', {
                author : socket.id,
                content: savedMessage.content
            })
        } catch (error) {
            console.log(error)
        }
    });
});


    server.listen(8080, ()=>{
        console.log('Server listening on port 8080')
    });