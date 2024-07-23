document.addEventListener('DOMContentLoaded', function() {
	const ul = document.getElementById('music-list');
	const li = ul.querySelectorAll('li>button');
	const music = new Audio();
	li.forEach(item => {
		item.addEventListener('click', function() {
			music.src = `../music/${item.innerHTML}.mp3`;
			const cur = document.getElementById('songcur');
			const regex = /\/([^\/]+)\.[a-zA-Z0-9]+$/;
			const match = music.src.match(regex);
			console.log(match);
			if (match) {
				cur.textContent = `${match[1]}`;
			}
			music.play();
		})
	});
	const sorter = document.getElementById('sort');
	const lie = ul.querySelectorAll('li');
	sorter.addEventListener('click', function() {
		sort(lie, "button");
	})
	const select = document.getElementById('genre');
	select.addEventListener('click', function() {
		if (this.value !== 'Select Category') {
			categorize(this.value);
		}
	});
	const slide = document.getElementById('progressFill');
	const slidelabel = document.getElementById('progressLabel');
	music.addEventListener('play', function() {
		updateProgressbar(music, slide, slidelabel);
	})

	const play = document.getElementById('play');
	const pause = document.getElementById('pause');
	const nextrack = document.getElementById('forward');
	const prevtrack = document.getElementById('backward');
	const volumehigh = document.getElementById('volup');
	const volumelow = document.getElementById('voldown');
	var song_srcs = ["../music/Amalgam.mp3", "../music/FacesofVoices.mp3", "../music/Movietickets.mp3", "../music/trunk.mp3", "../music/slow.mp3"].map(toAbsoluteUrl);
	console.log(song_srcs)
	play.addEventListener('click', function() {
		playMusic(music);
	})
	pause.addEventListener('click', () => {
		pauseMusic(music);
	})
	nextrack.addEventListener('click', function() {
		console.log(music.src);
		nextTrack(music, song_srcs);
	})

	prevtrack.addEventListener('click', function() {
		prevTrack(music, song_srcs);
	})

	volumehigh.addEventListener('click', function() {
		volumeup(music);
	})
	volumelow.addEventListener('click', function() {
		volumedown(music);
	})
});

function setSrcSong(element) {
	if (element.id === 'song1') {
		return "../music/slow.mp3";
	}
	else if (element.id === 'song2') {
		return "../music/Amalgam.mp3";
	}
	else if (element.id === 'song3') {
		return "../music/trunk.mp3";
	}
	else if (element.id === 'song4') {
		return "../music/Movietickets.mp3";
	}
	else if (element.id === 'song5') {
		return "../music/FacesofVoices.mp3";
	}
}

function sort(parentElement, childElement) {
	var arr = Array.prototype.slice.call(parentElement);

	arr.sort(function(a, b) {
		console.log(a.querySelector(childElement), b.querySelector(childElement));
		var aChild = a.querySelector(childElement);
		var bChild = b.querySelector(childElement);
		if (aChild.innerHTML < bChild.innerHTML) {
			return -1;
		}
		else if (aChild.innerHTML > bChild.innerHTML) {
			return 1;
		}
		else {
			return 0;
		}
	})

	if (parentElement.length > 0) {
		var parent = parentElement[0].parentElement;
		if (parent) {
			parent.innerHTML = '';
			arr.forEach(function(el) {
				parent.appendChild(el);
			})
		}
	}
}

function categorize(category) {
	const list = document.querySelectorAll('.list-song');

	list.forEach(li => {
		const spans = li.querySelectorAll('p span');
		let match = false;
		spans.forEach(span => {
			if (span.innerHTML === category) {
				console.log(span);
				match = true;
			}
		})
		if (match) {
			li.style.display = 'block';
		}
		else {
			li.style.display = 'none';
		}
	})
}

function updateProgressbar(music, progressBar, progressLabel) {
	const interval = setInterval(() => {
		if (!music.paused) {
			const progress = (music.currentTime / music.duration) * 100;
			progressBar.style.width = `${progress}%`;
			progressLabel.textContent = `${Math.round(progress)}`;
		}
		else {
			clearInterval(interval);
		}
	}, 100);
}

function playMusic(music) {
	music.play();
}

function pauseMusic(music) {
	music.pause();
}

function nextTrack(music, list) {
	const ind = list.indexOf(music.src);
	music.src = list[(ind + 1) % list.length];
	const cur = document.getElementById('songcur');
	const regex = /\/([^\/]+)\.[a-zA-Z0-9]+$/;
	const match = music.src.match(regex);
	if (match) {
		cur.textContent = `${match[1]}`;
	}
	music.play().catch(error => {
		console.error("error playing song");
	})
}

function prevTrack(music, list) {
	const ind = list.indexOf(music.src);
	music.src = list[(ind - 1) % list.length];
	const cur = document.getElementById('songcur');
	const regex = /\/([^\/]+)\.[a-zA-Z0-9]+$/;
	const match = music.src.match(regex);
	if (match) {
		cur.textContent = `${match[1]}`;
	}
	music.play().catch(error => {
		console.error("error playing song");
	})
}

function volumeup(music) {
	music.volume += 0.1;
}

function volumedown(music) {
	music.volume -= 0.1;
}

function playTrack(index, list, music) {
	if (index >= 0 && index < list.length) {
		music.src = list[index];
		music.play();
		currentIndex = index;
	}
}
function toAbsoluteUrl(relativeUrl) {
	return new URL(relativeUrl, window.location.origin).href;
}
