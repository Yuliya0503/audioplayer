const player = document.querySelector('.player'),
      prevBtn = document.querySelector('.prev'),
      playBtn = document.querySelector('.play'),
      nextBtn = document.querySelector('.next'),
      audio = document.querySelector('.audio'),
      progressContainer = document.querySelector('.progress_container'),
      progress = document.querySelector('.progress'),
      coverImg = document.querySelector('.cover_img'),
      title = document.querySelector('.song'),
      imgSrc = document.querySelector('.img_src')

//названия песен
const songs = [
  'Zitti e buoni',
  'Coraline',
  'Lividi sui gomiti',
  'I Wanna Be Your Slave',
  'In nome del padre',
  'For Your Love',
  'La paura del buio',
  "Vent'anni"
]

//Песня по умолчанию
let songIndex = 0

//Init
function loadSong(song) {
  title.innerHTML = song
  audio.src = `audio/${song}.mp3`
}

loadSong(songs[songIndex])

//Play
function playSong() {
  player.classList.add('play');
  coverImg.classList.add('active');
  imgSrc.src ='./img/pause.svg'
  audio.play();
}

//Pause
function pauseSong() {
  player.classList.remove('play');
  coverImg.classList.remove('active');
  imgSrc.src ='./img/play.svg'
  audio.pause();
}

playBtn.addEventListener('click', () => {
  const isPalying = player.classList.contains('play');
  if(isPalying) {
    pauseSong()
  } else {
    playSong();
  }
})

//Next song
function nextSong() {
  songIndex ++;
  if(songIndex > songs.length -1) {
    songIndex = 0
  }
  loadSong(songs[songIndex]);
  playSong()
}
nextBtn.addEventListener('click', () => {
  nextSong();
})

//Prev song
function prevSong() {
  songIndex--;
  if(songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong()
}
prevBtn.addEventListener('click', () => {
  prevSong();
});

//progress bar 
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPrecent = (currentTime / duration) * 100
  progress.style.width = `${progressPrecent}%`
}
audio.addEventListener('timeupdate', updateProgress)


//Set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress)

//Autoplay
audio.addEventListener('ended', nextSong);