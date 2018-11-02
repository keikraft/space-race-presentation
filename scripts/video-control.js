// Slides Youtube Videos Control
function slideVideoFragmentHandler() {
  const fadeOutDuration = 1500;
  let videoElem;

  function loadVideo(elem, startTime) {
    videoElem = elem;
    videoElem.volume = 1;
    videoElem.currentTime = startTime;
    videoElem.style.opacity = 1;
    videoElem.style.transition = `opacity ${fadeOutDuration}ms ease-out`;
  }

  function VideoSeekTo(seconds) {
    videoElem.currentTime = seconds;
  }

  function lowerVideoVolume() {
    const currentVolume = videoElem.volume;
    if (currentVolume > 0) {
      videoElem.volume = parseFloat((currentVolume - 0.01).toFixed(2));
    }
  }

  function fadeOutVolume() {
    return new Promise(resolve => {
      const timerId = setInterval(lowerVideoVolume, 10);
      setTimeout(() => {
        clearInterval(timerId);
        videoElem.load();
        resolve();
      }, fadeOutDuration);
    });
  }

  async function fadeOutVideo() {
    videoElem.style.opacity = 0;
    await fadeOutVolume();
    videoElem.load();
  }

  async function fragmentEventHandler(event) {
    const fragmentClass = event.fragment.classList.item(1);
    if (fragmentClass === "video") {
      const timeClass = event.fragment.classList.item(2);
      const startTime = parseInt(timeClass, 10) || 0;
      loadVideo(event.fragment, startTime);
    }

    if (fragmentClass === "video-seek" && videoElem) {
      const seconds = event.fragment.classList.item(2);
      VideoSeekTo(parseInt(seconds, 10));
    }

    if (fragmentClass === "video-fade-out" && videoElem) {
      await fadeOutVideo();
      Reveal.next();
    }

    if (fragmentClass === "video-fade-out-sound" && videoElem) {
      await fadeOutVolume();
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
