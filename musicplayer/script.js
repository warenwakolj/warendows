const songs = [
    {
        title: "2+2",
        artist: "2",
        src: "music/2+2.mp3",
        img: "music/2+2.jpg"
    },
    // Add more songs here
];

let currentSongIndex = 0;

const songList = document.getElementById('song-list');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const currentImg = document.getElementById('current-img');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeElem = document.getElementById('current-time');
const totalTimeElem = document.getElementById('total-time');

let audio = new Audio(songs[currentSongIndex].src);

function loadSong(songIndex) {
    const song = songs[songIndex];
    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;
    currentImg.src = song.img;
    audio.src = song.src;
    progressBar.value = 0;
}

function playPauseSong() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = '⏸️';
    } else {
        audio.pause();
        playPauseButton.textContent = '⏯️';
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex > 0) ? currentSongIndex - 1 : songs.length - 1;
    loadSong(currentSongIndex);
    playPauseSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex < songs.length - 1) ? currentSongIndex + 1 : 0;
    loadSong(currentSongIndex);
    playPauseSong();
}

function updateProgress() {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeElem.textContent = formatTime(audio.currentTime);
    totalTimeElem.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
}

playPauseButton.addEventListener('click', playPauseSong);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);

progressBar.addEventListener('input', (e) => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeBar.addEventListener('input', (e) => {
    audio.volume = volumeBar.value / 100;
});

// Load songs into the song list
songs.forEach((song, index) => {
    const songItem = document.createElement('div');
    songItem.className = 'song-item';
    songItem.innerHTML = `
        <img src="${song.img}" alt="Album Art">
        <p>${song.title}</p>
        <p>${song.artist}</p>
    `;
    songItem.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        playPauseSong();
    });
    songList.appendChild(songItem);
});

// Load the first song
loadSong(currentSongIndex);
