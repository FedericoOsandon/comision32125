const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const messages = [
   
 ];

app.use(express.static('public'))

io.on('connection', ( socket ) => {
    console.log('Un cliente se ha conectado')
    socket.emit('mensajes-clientes', messages)

    socket.on('mensaje-al-servidor', data => {
        messages.push(data)
        console.log(data)
        io.sockets.emit('mensajes-clientes', messages)
    })
})
const PORT = process.env.PORT || 4000

httpServer.listen(PORT, () => {
    console.log('listening on port 4000')
})

// http-server -o  para abrir los build de react o angular

