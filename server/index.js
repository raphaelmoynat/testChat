const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('serveur socket.io en fonctionnement');

})

const io = socketIo(server, {
    transports: ['websocket', 'polling'],
    cors: {
        origin: 'https://testChatClient.raphaelmoynat.com',
        methods: ['GET', 'POST'],
    }

})

io.on('connection', (socket) => {
    console.log('New user connect to the server');

    socket.on('message', (message) => {
        console.log('Received message from ' + socket.id);
        console.log(message.content);

        try{
            io.emit('message',{
                author : socket.id,
                content: message.content,
            });
        }catch (e) {
            console.log(e);
        }finally {
            console.log(io.sockets.sockets.size);
        }
    })

})



    server.listen(8080, ()=>{
        console.log('Server listening on port 8080');
    });