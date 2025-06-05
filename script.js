let isPlaying = true;
let currentProgress = 30;
let progressInterval;

const artists = {
    'arr': { name: 'A.R. Rahman', song: 'Chinna Chinna Aasai', image: 'arr.jpeg' },
    'ilayaraja': { name: 'Ilayaraja', song: 'Thendral Vanthu', image: 'ilayaraja.jpg' },
    'spb': { name: 'S.P. Balasubrahmanyam', song: 'Mannil Indha Kaadhal', image: 'spb.jpg' }
};

setTimeout(() => showPage('loginPage'), 2000);

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    pageId === 'playerPage' ? startProgressAnimation() : stopProgressAnimation();
}

function login() { showPage('libraryPage'); }
function showLogin() { showPage('loginPage'); }
function showLibrary() { showPage('libraryPage'); }

function showPlayer(artistId) {
    const artist = artists[artistId] || artists['spb'];
    document.getElementById('currentArt').src = artist.image;
    document.getElementById('songTitle').textContent = artist.song;
    document.getElementById('songArtist').textContent = artist.name;
    currentProgress = 0;
    updateProgress();
    showPage('playerPage');
}

function activateTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
}

function search(query) {
    document.querySelectorAll('.artist-card').forEach(card => {
        const name = card.querySelector('.artist-name').textContent.toLowerCase();
        card.style.display = name.includes(query.toLowerCase()) || !query ? 'block' : 'none';
    });
}

function togglePlay() {
    isPlaying = !isPlaying;
    document.getElementById('playBtn').textContent = isPlaying ? '⏸' : '▶';
    isPlaying ? startProgressAnimation() : stopProgressAnimation();
}

function prevSong() { currentProgress = 0; updateProgress(); }
function nextSong() { currentProgress = 0; updateProgress(); }
function shuffle() { alert('Shuffle mode toggled'); }
function toggleRepeat() { alert('Repeat mode toggled'); }

function seekPosition(event) {
    const bar = event.currentTarget;
    const rect = bar.getBoundingClientRect();
    currentProgress = ((event.clientX - rect.left) / rect.width) * 100;
    updateProgress();
}

function startProgressAnimation() {
    stopProgressAnimation();
    progressInterval = setInterval(() => {
        if(isPlaying && currentProgress < 100) {
            currentProgress += 0.1;
            updateProgress();
        }
        if(currentProgress >= 100) nextSong();
    }, 100);
}

function stopProgressAnimation() { clearInterval(progressInterval); }
function updateProgress() { document.getElementById('progressFill').style.width = currentProgress + '%'; }