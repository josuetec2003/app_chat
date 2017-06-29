$(function () {
	var socket = io();
	var $login = $('#login');
	var $chat = $('#chat');
	var $nickname = $('#nickname');
	var $messages = $('#messages');
	var $message = $('#message');

	socket.on('connect', function () {
		console.log('Connected to server');
		init();
	})

	function init ()
	{
		$nickname.on('keyup', function (e) {
			if (e.which == 13)
			{
				var nick = $(this).val();
				addNick(nick);
			}
		});

		$message.on('keyup', function (e) {
			if (e.which == 13)
			{
				var msg = $(this).val().trim();
				socket.emit('new message', msg);
			}
		});
	}

	function addNick (nickname)
	{
		socket.emit('add nick', nickname);
		$login.fadeOut(); // oculta
		$chat.fadeIn();   // muestra
		$message.focus();
	}

	socket.on('resend', function (data) {
		var li = $('<li/>').addClass('msg').text(`@${data.user} dice: ${data.msg}`);
		$messages.append(li);
	});

	socket.on('new user', function (data) {
		var li = $('<li/>').addClass('new_user').text(`@${data} se ha unido a la sala`);
		$messages.append(li);
	})
})









