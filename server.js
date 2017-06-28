const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/static'))

io.on('connection', (socket) => {
	console.log(`User Id connected: ${socket.id}`)

	socket.on('add nick', (nickname) => {
		socket.nickname = nickname
		console.log(`Socket ${socket.id} renamed to ${socket.nickname}`)
	})
})

app.get('/', (req, res) => {
	res.render('index.pug')
})

http.listen(9090, () => {
	console.log('Server running...')
})

