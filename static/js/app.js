$(function () {
	var socket = io();
	var $login = $('#login');
	var $chat = $('#chat');
	var $nickname = $('#nickname');

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
	}

	function addNick (nickname)
	{
		socket.emit('add nick', nickname);
		$login.fadeOut(); // oculta
		$chat.fadeIn();   // muestra
	}
})









