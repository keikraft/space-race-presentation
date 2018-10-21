// Slides Youtube Videos Control
function slideVideoFragmentHandler() {
  const fadeOutDuration = 1500;
  let videoElem;

  function playerSeekTo(seconds) {
    videoElem.fastSeek(seconds);
  }

  function lowerPlayerVolume() {
    const currentVolume = videoElem.volume;
    if (currentVolume > 0) {
      videoElem.volume = parseFloat((currentVolume - 0.01).toFixed(2));
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

  async function fadeOutVideo() {
    videoElem.style.opacity = 0;
    await fadeOutVolume();
  }

  function unmountPlayer() {
    setTimeout(() => {
      videoElem.load();
      videoElem.volume = 1;
      videoElem.style.opacity = 1;
    }, 300);
  }

  async function fragmentEventHandler(event) {
    const fragmentClass = event.fragment.classList.item(1);
    if (fragmentClass === "video") {
      videoElem = event.fragment;
      videoElem.style.transition = `opacity ${fadeOutDuration}ms ease-out`;
    }

    if (fragmentClass === "video-seek" && videoElem) {
      const seconds = event.fragment.classList.item(2);
      playerSeekTo(seconds);
    }

    if (fragmentClass === "video-fade-out" && videoElem) {
      await fadeOutVideo();
      unmountPlayer();
      Reveal.next();
    }

    if (fragmentClass === "video-fade-out-sound" && videoElem) {
      await fadeOutVolume();
      unmountPlayer();
      Reveal.next();
    }
  }

  function playbackEventHandler() {
    if (videoElem) {
      if (!videoElem.paused) {
        videoElem.pause();
      } else {
        videoElem.play();
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
