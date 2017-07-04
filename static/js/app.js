$(function () {
	var socket = io();
	var $login = $('#login');
	var $chat = $('#chat');
	var $nickname = $('#nickname');
	var $messages = $('#messages');
	var $privmessages = $('#private_messages');
	var $message = $('#message');
	var $col = $('.col');

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

		$(document).on('click', '.user', function (e) {
			e.preventDefault();

			var msg = prompt('Ingrese su mensaje:', 'Mensaje por defecto')

			if (msg != null)
			{
				var id = $(this).attr('data-id');
				socket.emit('private message', id, msg);
			}			
		})
	}

	function addNick (nickname)
	{
		socket.emit('add nick', nickname);
		$login.fadeOut(); // oculta
		$col.fadeIn();   // muestra
		$message.focus();
	}

	socket.on('resend', function (data) {
		var li = $('<li/>').addClass('msg').html(`<a href="#" data-id="${data.id}" class="user">@${data.user}</a> dice: ${data.msg}`);
		$messages.append(li);
	});

	socket.on('new user', function (data) {
		var li = $('<li/>').addClass('new_user').html(`@${data} se ha unido a la sala`);
		$messages.append(li);
	})

	socket.on('message to', function (data) {
		var li = $('<li/>').addClass('msg').html(`Mensaje: ${data}`);
		$privmessages.append(li);
	})
})









