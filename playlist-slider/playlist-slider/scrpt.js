// Playlist structure — update name, artist, src (audio URL), img (optional cover)
const songs = [
  {
    name: "I know you",
    artist: "Faye Webster",
    src: "https://open.spotify.com/track/71BWZa1liIRyUiuJ3MB66o?si=db286cf6a35f4fc0",
    img: "https://i.pinimg.com/736x/7e/52/26/7e5226222b95626d23fd1a2c630ad52b.jpg"
  },
  {
    name: "Always",
    artist: "Daniel Ceasar",
    src: "https://open.spotify.com/track/2LlOeW5rVcvl3QcPNPcDus?si=cbd1123ff7824e5e",
    img: "https://cdn-images.dzcdn.net/images/cover/0d571082af7c78114321031d7f84d331/1900x1900-000000-80-0-0.jpg"
  },
  {
    name: "Pretty boy",
    artist: "The Neighbourhood",
    src: "https://open.spotify.com/track/7IL8PSVwLOJxqYne6azxQv?si=b0aaeaa63e344194",
    img: "https://i.scdn.co/image/ab67616d0000b27354fa8ed109151d0443dc8246"
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
