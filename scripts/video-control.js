// Slides Youtube Videos Control
function slideVideoFragmentHandler() {
  const fadeOutDuration = 1500;
  let player;
  let playerElem;

  function lowerPlayerVolume() {
    player.setVolume(player.getVolume() - 1);
  }

  function fadeOutVolume() {
    return new Promise(resolve => {
      const timerId = setInterval(lowerPlayerVolume, 100);
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
    player = null;
    playerElem = null;
  }

  async function fragmentEventHandler(event) {
    if (event.fragment.classList.contains("video")) {
      player = new YT.Player(event.fragment, {});
      playerElem = event.fragment;
      playerElem.style.transition = `opacity ${fadeOutDuration}ms ease-out`;
    }

    if (event.fragment.classList.contains("video-fade-out") && player) {
      fadeOutVideo();
      await fadeOutVolume();
      unmountPlayer();
      Reveal.next();
    }

    if (event.fragment.classList.contains("video-fade-out-sound") && player) {
      await fadeOutVolume();
      unmountPlayer();
      Reveal.next();
    }
  }

  return fragmentEventHandler;
}

export default function() {
  const eventHandler = slideVideoFragmentHandler();
  Reveal.addEventListener("fragmentshown", eventHandler);
}
