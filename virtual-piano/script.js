const pianoKeys = document.querySelectorAll('.piano-key');
let Click = false;

function playAudio(event) {
  const audio = new Audio(`assets/audio/${event.dataset.note}.mp3`);
  if (!audio) return;

  event.classList.add('piano-key-active');
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  e.target.classList.remove('piano-key-active');
}

function MouseEvent(e) {
  if (!Click) return;
  playAudio(e.target);
}

window.addEventListener('mouseup', () => (Click = false));
pianoKeys.forEach((key) => {
  key.addEventListener('mousedown', (e) => {
    Click = true;
    MouseEvent(e);
  });
  key.addEventListener('mouseover', MouseEvent);
  key.addEventListener('mouseleave', removeTransition);
  key.addEventListener('mouseup', removeTransition);
  key.addEventListener('contextmenu', (e) => e.preventDefault());
});


let keyState = {};

function KeyEvent(e) {
  let elem = [...pianoKeys].find((elem) => elem.dataset.keycode == e.code);
  if (elem && !keyState[e.code]) {
    keyState[e.code] = true;
    playAudio(elem);
  }
}

window.addEventListener('keydown', KeyEvent);

window.addEventListener('keyup', (e) => {
  const elem = [...pianoKeys].find((elem) => elem.dataset.keycode == e.code);
  if (elem) elem.classList.remove('piano-key-active');
  keyState[e.code] = false;
});


const fullScreenButon = document.querySelector('.fullscreen');

function toggleFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
}

fullScreenButon.addEventListener('click', toggleFullScreen);


const lettersButton = document.querySelector('.btn-letters');
const notesButton = document.querySelector('.btn-notes');

function toggleLettersMode(el) {
  notesButton.classList.remove('btn-active');
  lettersButton.classList.add('btn-active');
  pianoKeys.forEach((key) => key.classList.add('letter'));
}

lettersButton.addEventListener('click', toggleLettersMode);

function toggleNotesMode(e) {
  notesButton.classList.add('btn-active');
  lettersButton.classList.remove('btn-active');
  pianoKeys.forEach((key) => key.classList.remove('letter'));
}

notesButton.addEventListener('click', toggleNotesMode);