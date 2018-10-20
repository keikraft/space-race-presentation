// Slides Youtube Videos Control
function slideVideoFragmentHandler() {
  const fadeOutDuration = 1500;
  let player;
  let playerElem;
  let iframeElem;

  function loadScript() {
    const script = document.createElement("script");
    script.id = "yt-iframe";
    script.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
  }

  function unloadScript() {
    const script = document.getElementsById("yt-iframe");
    script.remove();
  }

  function onYouTubeIframeAPIReady() {
    player = new YT.Player("existing-iframe-example", {
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  }

  function removePlayerHeader(event) {
    if (playerElem.contentWindow.document) {
      const titleElem = player.document.getElementByClass("ytp-title");
      const playlistMenuElem = player.document.getElementByClass(
        "ytp-playlist-menu-button"
      );
      const chromeButtonsElem = player.document.getElementByClass(
        "ytp-chrome-top-buttons"
      );

      titleElem.style.display = "none";
      playlistMenuElem.style.display = "none";
      chromeButtonsElem.style.display = "none";
    }
  }

  function playerSeekTo(seconds) {
    player.seekTo(seconds, true);
  }

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

  async function fadeOutVideo() {
    playerElem.style.opacity = 0;
    await fadeOutVolume();
  }

  function unmountPlayer() {
    player.stopVideo();
    player = null;
    playerElem = iframeElem;
    unloadScript();
    setTimeout(() => (playerElem.style.opacity = 1), 200);
  }

  async function fragmentEventHandler(event) {
    if (event.fragment.classList.contains("video")) {
      loadScript();
      // player = new YT.Player(event.fragment, {});
      playerElem = player.getIframe();
      playerElem.style.transition = `opacity ${fadeOutDuration}ms ease-out`;
    }

    const isPlayerMounted = player && player.getPlayerState;
    if (event.fragment.classList.contains("video-seek") && isPlayerMounted) {
      const seconds = event.fragment.classList.item(2);
      playerSeekTo(seconds);
    }

    if (
      event.fragment.classList.contains("video-fade-out") &&
      isPlayerMounted
    ) {
      await fadeOutVideo();
      unmountPlayer();
      Reveal.next();
    }

    if (
      event.fragment.classList.contains("video-fade-out-sound") &&
      isPlayerMounted
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
