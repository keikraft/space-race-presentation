// Slides Audio Control
function slideAudioFragmentHandler() {
  async function fragmentEventHandler(event) {
    if (event.fragment.classList.contains("audio")) {
      const audioElem = event.fragment;
      audioElem.play();
    }
  }

  return fragmentEventHandler;
}

export default function() {
  const fragmentEventHandler = slideAudioFragmentHandler();

  Reveal.addEventListener("fragmentshown", fragmentEventHandler);
}
