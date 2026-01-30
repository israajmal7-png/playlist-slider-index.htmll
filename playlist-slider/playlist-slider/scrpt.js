// Playlist structure — update name, artist, src (audio URL), img (optional cover)
const songs = [
  {
    name: "Song Title 1",
    artist: "Artist 1",
    src: "https://example.com/audio/song1.mp3",
    img: "https://example.com/images/cover1.jpg"
  },
  {
    name: "Song Title 2",
    artist: "Artist 2",
    src: "https://example.com/audio/song2.mp3",
    img: "https://example.com/images/cover2.jpg"
  },
  {
    name: "Song Title 3",
    artist: "Artist 3",
    src: "https://example.com/audio/song3.mp3",
    img: "https://example.com/images/cover3.jpg"
  }
];

// Basic slider/player implementation
const audio = document.getElementById('audio');
const slider = document.getElementById('slider');
let currentIndex = 0;

function buildSlider() {
  songs.forEach((s, i) => {
    const card = document.createElement('button');
    card.className = 'card';
    card.dataset.index = i;
    card.innerHTML = `
      <div class="cover" style="background-image: url(${s.img || ''})"></div>
      <div class="meta">
        <div class="title">${s.name || 'Untitled'}</div>
        <div class="artist">${s.artist || ''}</div>
      </div>
    `;
    card.addEventListener('click', () => loadAndPlay(i));
    slider.appendChild(card);
  });
}

function loadAndPlay(i) {
  const song = songs[i];
  if (!song || !song.src) return alert('This song has no audio source.');
  currentIndex = i;
  audio.src = song.src;
  audio.play().catch(err => console.warn('Play failed:', err));
  updateActiveCard();
  document.getElementById('play').textContent = 'Pause';
}

function updateActiveCard() {
  Array.from(slider.children).forEach((c) => c.classList.remove('active'));
  const active = slider.querySelector(`.card[data-index="${currentIndex}"]`);
  if (active) active.classList.add('active');
}

function playPause() {
  if (!audio.src) loadAndPlay(currentIndex);
  else if (audio.paused) { audio.play(); document.getElementById('play').textContent = 'Pause'; }
  else { audio.pause(); document.getElementById('play').textContent = 'Play'; }
}

function next() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadAndPlay(currentIndex);
}

function prev() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadAndPlay(currentIndex);
}

// wire controls
window.addEventListener('DOMContentLoaded', () => {
  buildSlider();
  document.getElementById('play').addEventListener('click', playPause);
  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);

  audio.addEventListener('ended', next);
});
