const socket = io("wss://testChatServer.raphaelmoynat.com")
const btn = document.querySelector('button')

socket.on('message', (message) => {
    console.log(message)
    const line = document.createElement('li')
    line.innerHTML = message.author + ' : ' + message.content
    document.querySelector('ul').appendChild(line)

})

btn.addEventListener('click', () => {
    const messageToSend = document.querySelector('input').value
    socket.emit('message', {
        content : messageToSend,
    })
})