const path = require('path')
const express = require('express');
const app = express()
const socketIo = require('socket.io')


app.use('/grupo1', express.static(path.join(__dirname, 'public')))
app.use('/grupo2', express.static(path.join(__dirname, 'public')))

const server = app.listen(3000, () => {
    console.log("Running")
})

const messages = { grupo1: [], grupo2: [] };

const io = socketIo(server);

const grupo1 = io.of('/grupo1').on('connection', (socket) => {
    console.log('New connection')
    socket.emit('update_messages', messages.grupo1)

    socket.on('New_message', (data) => {
        messages.grupo1.push(data)
        console.log(messages)
        grupo1.emit('update_messages', messages.grupo1)
    })
})

const grupo2 = io.of('/grupo2').on('connection', (socket) => {
    console.log('New connection')
    socket.emit('update_messages', messages.grupo2)

    socket.on('New_message', (data) => {
        messages.grupo2.push(data)
        console.log(messages)
        grupo2.emit('update_messages', messages.grupo2)
    })
})
