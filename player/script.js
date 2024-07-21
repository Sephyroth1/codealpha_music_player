document.addEventListener('DOMContentLoaded', function() {
	const ul = document.getElementById('music-list');
	const li = ul.querySelectorAll('li>button');
	console.log(li);
	li.forEach(item => {
		item.addEventListener('click', function() {

			const audio = document.createElement('audio');
			audio.controls = true;
			const source = document.createElement('source');
			source.src = setSrcSong(item);
			audio.appendChild(source);
			document.body.appendChild(audio);
		})
	});
	const sorter = document.getElementById('sort');
	const lie = ul.querySelectorAll('li');
	sorter.addEventListener('click', function() {
		sort(lie, "button");
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

	arr.forEach(item => {
		console.log(item);
	})
	console.log(arr);
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
