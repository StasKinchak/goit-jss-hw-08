import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const getCurrentTime = event => {
  localStorage.setItem('videoplayer-current-time', event.seconds);
};

player.on('timeupdate', throttle(getCurrentTime, 1000));

let currentTime = 0;

if (localStorage.getItem('videoplayer-current-time')) {
  currentTime = localStorage.getItem('videoplayer-current-time');
}

player.setCurrentTime(currentTime);
