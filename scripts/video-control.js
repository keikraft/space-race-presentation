// Slides Youtube Videos Control
function slideVideoFragmentHandler() {
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
      }, 1500);
    });
  }

  function fadeOutVideo() {
    playerElem.style.opacity = 0;
  }

  function unmountPlayer() {
    player.destroy();
    player = null;
    playerElem = null;
  }

  async function keyDownEventHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    document.removeEventListener("keydown", keyDownEventHandler);

    // fadeOutVideo();
    await fadeOutVolume();
    // unmountPlayer();
    Reveal.next();
  }

  function fragmentEventHandler(event) {
    if (event.fragment.classList.contains("video")) {
      player = new YT.Player(event.fragment, {});
      playerElem = event.fragment;
      playerElem.style.transition = "opacity 1.5s ease-out";
      document.addEventListener("keydown", keyDownEventHandler);
    }
  }

  return fragmentEventHandler;
}

export default function() {
  const eventHandler = slideVideoFragmentHandler();
  Reveal.addEventListener("fragmentshown", eventHandler);
  Reveal.addEventListener("slidechanged", event => {
    console.log(event);
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
  });
}
