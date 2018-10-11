// Slides Youtube Videos Control
function slideVideoFragmentHandler() {
  const fadeOutDuration = 1500;
  let player;
  let playerElem;

  function lowerPlayerVolume() {
    const currentVolume = player.getVolume();
    if (currentVolume > 0) {
      player.setVolume(currentVolume - 1);
    }
  }

  function fadeOutVolume() {
    return new Promise(resolve => {
      const timerId = setInterval(lowerPlayerVolume, 10);
      setTimeout(() => {
        clearInterval(timerId);
        resolve();
      }, fadeOutDuration);
    });
  }

  function fadeOutVideo() {
    playerElem.style.opacity = 0;
  }

  function unmountPlayer() {
    player.stopVideo();
    player = null;
    playerElem = null;
  }

  async function fragmentEventHandler(event) {
    if (event.fragment.classList.contains("video")) {
      player = new YT.Player(event.fragment, {});
      playerElem = event.fragment;
      playerElem.style.transition = `opacity ${fadeOutDuration}ms ease-out`;
    }

    if (
      event.fragment.classList.contains("video-fade-out") &&
      player &&
      player.getPlayerState
    ) {
      fadeOutVideo();
      await fadeOutVolume();
      unmountPlayer();
      Reveal.next();
    }

    if (
      event.fragment.classList.contains("video-fade-out-sound") &&
      player &&
      player.getPlayerState
    ) {
      await fadeOutVolume();
      unmountPlayer();
      Reveal.next();
    }
  }

  function playbackEventHandler() {
    if (player && player.getPlayerState) {
      const playerState = player.getPlayerState();
      if (playerState === 1) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  }

  return {
    fragmentEventHandler,
    playbackEventHandler
  };
}

export default function() {
  const {
    fragmentEventHandler,
    playbackEventHandler
  } = slideVideoFragmentHandler();

  Reveal.addEventListener("fragmentshown", fragmentEventHandler);
  Reveal.addEventListener("playvideo", playbackEventHandler);
}
