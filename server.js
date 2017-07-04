const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/static'))

io.on('connection', (socket) => {
	//console.log(`User Id connected: ${socket.id}`)
	console.log(io.sockets.connected)

	socket.on('add nick', (nickname) => {
		socket.nickname = nickname
		console.log(`Socket ${socket.id} renamed to ${socket.nickname}`)
		io.emit('new user', socket.nickname);
	})

	socket.on('new message', (message) => {		
		var data = {'user': socket.nickname, 'msg': message, 'id': socket.id}		
		
		// todos los sockets incluyendome
		//io.emit('resend', data)

		// todos los socket sin incluirme
		// socket.broadcast.emit('resend', data)

		//  solo a mi
		socket.emit('resend', data)
	})

	socket.on('private message', (id, msg) => {
		socket.broadcast.to(id).emit('message to', msg);
	})
})

app.get('/', (req, res) => {
	res.render('index.pug')
})

http.listen(9091, () => {
	console.log('Server running...')
})

