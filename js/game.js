var colours = [
	'#53a1cc',
	'#de5c5a',
	'#ffe666',
	'#c2e8ae',
	'#946fb0'
];

$(document).ready(function() {

	initGame();

});

function initGame() {

	$('body').html('<div id="stats"><span id="score">0</span><span id="timer">00:00</span></div>');
	$('body').append('<div id="game"><span id="startgame">Start Game</span></div>');

	$('body').on('click', '#startgame', function(event) {

		event.preventDefault();
		startGame(event);

	});

}

function startGame(event) {

	$('#startgame').fadeOut(400, function() {
		$(this).remove();
	});

	$('#game').addClass('running');

	var cursorSize = 10;
	var cursorTop = event.pageY - (cursorSize / 2) - $('#game').offset().top;
	var cursorLeft = event.pageX - (cursorSize / 2);
	$('#game').append('<span id="cursor" style="width:' + cursorSize + 'px;height:' + cursorSize + 'px;top:' + cursorTop + 'px;left:' + cursorLeft + 'px;" />');

	var cursor = $('#game #cursor');

	$('#game').on('mousemove', function(event) {

		cursorTop = event.pageY - (cursorSize / 2) - $('#game').offset().top;
		cursorLeft = event.pageX - (cursorSize / 2);

		if (cursorTop >= $('#game').offset().top && cursorTop < ($('#game').offset().top + $('#game').outerHeight()) && cursorLeft >= $('#game').offset().left && cursorLeft < ($('#game').offset().left + $('#game').outerWidth())) {

			$(cursor).css({
				top: cursorTop + 'px',
				left: cursorLeft + 'px'
			});

		}

	});

	setInterval(function() {

		var currentTime = $('#timer').text().split(':');

		if (currentTime[1] == 59) {
			currentTime[0]++;
			currentTime[1] = 0;
		} else {
			currentTime[1]++;
		}

		if (currentTime[0].toString().length == 1) {
			currentTime[0] = '0' + currentTime[0];
		}

		if (currentTime[1].toString().length == 1) {
			currentTime[1] = '0' + currentTime[1];
		}

		$('#timer').text(currentTime[0] + ':' + currentTime[1]);

	}, 1000);

	runGame();

}

function runGame() {

	var rate = 1;

	setInterval(function() {

		createEnemy(10);

	}, (rate * 1000));

}

function createEnemy(size) {

	var side = (Math.floor((Math.random() * 1) + 0) == 1) ? 'right' : 'left';
	var top = Math.floor((Math.random() * ($('#game').outerHeight() - size)) + ($('#game').offset().top - size));

	$('#game').append('<span class="enemy" style="width:' + size + 'px;height:' + size + 'px;top:' + top + 'px;' + side + ':0;" style="" />');

	console.log('created new element');

}