import videoControl from "./video-control.js";
import audioControl from "./audio-control.js";
import theJourney from "./the-journey.js";

// Init Slide's Scripts
videoControl();
audioControl();
theJourney();

// Init RevealJS
Reveal.initialize({
  // Control Setup
  controls: false,
  controlsTutorial: false,
  controlsBackArrows: "hidden",
  history: true,
  touch: false,
  progress: false,

  // Animations
  transition: "fade",
  backgroundTransition: "fade",

  // Parallax Background
  parallaxBackgroundImage: "media/images/sky_background2.jpg",
  parallaxBackgroundSize: "3840px 2160px",

  // Slides Layout
  display: "flex",
  width: 1600,
  height: 900,
  margin: 0.1,
  center: false,
  minScale: 0.2,
  maxScale: 1.5,

  dependencies: [
    { src: "scripts/revealjs/plugin/markdown/marked.js" },
    { src: "scripts/revealjs/plugin/markdown/markdown.js" },
    { src: "scripts/revealjs/plugin/notes/notes.js", async: true }
  ]
});

// ------- KEY BINDINGS

// Play Video on spacebar
Reveal.addKeyBinding(32, () => {
  Reveal.dispatchEvent("playvideo");
});
// Previous slide on arrow left
Reveal.addKeyBinding(37, () => {
  Reveal.prev();
});
// Next slide on arrow right
Reveal.addKeyBinding(39, () => {
  Reveal.next();
});

// ------- FRAGMENTS

// Show first fragment when slide changes forward.
let indexh = 0;
let indexv = 0;
Reveal.addEventListener("slidechanged", event => {
  const navigatingBackwards = event.indexh < indexh || event.indexv < indexv;
  if (!navigatingBackwards) {
    Reveal.nextFragment();
  }
  // Update indices
  indexh = event.indexh;
  indexv = event.indexv;
});
