import cover from "./cover.js";
import videoControl from "./video-control.js";
import theJourney from "./the-journey.js";

// Init Slide's Scripts
cover();
videoControl();
theJourney();

// Init RevealJS
Reveal.initialize({
  // Control Setup
  controlsTutorial: false,
  controlsBackArrows: "hidden",
  history: true,
  touch: false,
  progress: false,

  // Animations
  transition: "fade",
  backgroundTransition: "fade",

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

Reveal.configure({
  keyboard: {
    37: "prev", // go to the previous slide when the arrow left key is pressed
    39: "next" // go to the next slide when the arrow right key is pressed
  }
});

// Show first fragment went slide changes.
Reveal.addEventListener("slidechanged", () => {
  Reveal.nextFragment();
});
