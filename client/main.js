const socket = io("ws://localhost:8080")
const btn = document.querySelector('button')

socket.on('previousMessages', (messages) => {
    messages.forEach(message => {
        const line = document.createElement('li')
        line.innerHTML = message.author + ' : ' + message.content
        document.querySelector('ul').appendChild(line)
    });
});

socket.on('message', (message) => {
    console.log(message)
    const line = document.createElement('li')
    line.innerHTML = message.author + ' : ' + message.content
    document.querySelector('ul').appendChild(line)
});

btn.addEventListener('click', () => {
    const messageToSend = document.querySelector('input').value

    socket.emit('message', {
        content: messageToSend,
    });

});
