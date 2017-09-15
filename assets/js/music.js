var now, len, now_f, len_f;

$(document).ready(function() {
	var music = document.querySelector('audio');
	music.volume = 0.3;
	
	$('#player').click(function() {
		togglePlayback();
	});
});

function init() {
	now = music.currentTime;
	len = music.duration;
  
	now_f = format(now);
	len_f = format(len);
  
	$('.progress_wrapper').css('width', 100 * now / len + '%');
	$('.time').text(now_f + ' / ' + len_f)
}

function togglePlayback() {
	if(music.paused === false) {
		music.pause();
		$('#player').toggleClass('fa-pause').toggleClass('fa-play');
	} else {
		music.play();
		$('#player').toggleClass('fa-pause').toggleClass('fa-play');
	}
}

function format(length) {
	var minutes = Math.floor(length / 60).toString();
	if(minutes.length == 1) minutes = "0" + minutes;
	var seconds = Math.floor(length - minutes * 60).toString();
	if(seconds.length == 1) seconds = "0" + seconds;
	time = minutes + ':' + seconds
  
	return time;
}