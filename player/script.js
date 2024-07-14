const music = new Audio();
music.src = '../music/Amalgam.mp3';
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const vol = document.getElementById("volume-high");
const volmu = document.getElementById("volume-off");
const prog = document.getElementById("prog");
const inpfile = document.getElementById("music-file");
inpfile.addEventListener("change", function() {

	music.addEventListener("timeupdate", function() {
		const progress = (music.currentTime / music.duration) * 100;
		prog.style.width = progress + '%';
		prog.innerHTML = prog.style.width;
	})
	pause.addEventListener('click', function() {
		music.pause();
	});
	play.addEventListener('click', function() {
		music.play();
	});
	vol.addEventListener('click', function() {
		music.volume += 10;
	});
	volmu.addEventListener('click', function() {
		music.volume = 0;
	})

})
