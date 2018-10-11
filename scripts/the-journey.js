// Journey Slides fragments control

function theJourneyFragmentHandler() {
  const transformations = {
    initialPosition: {
      transform: "scale(1) translate(0, 0)",
      duration: "1s"
    },
    launch: { transform: "scale(3) translate(35%, -4%)", duration: "1s" },
    toTheMoon: {
      transform: "scale(3.5) translate(25%, -40%)",
      duration: ".8s"
    },
    landing: {
      transform: "scale(3.5) translate(-35%, -30%)",
      duration: "5s"
    },
    backHome: {
      transform: "scale(3.5) translate(-35%, 25%)",
      duration: "1s"
    },
    reentry: { transform: "scale(3.4) translate(35%, 15%)", duration: "5s" }
  };
  const journeyTitleElement = document.getElementById("the-journey-title");
  const journeyImageElement = document.getElementById("the-journey-img");

  function fragmentEventHandler(event) {
    if (event.fragment.classList.contains("journey")) {
      const stage = event.fragment.classList.item(2);

      // Title Display
      journeyTitleElement.style.opacity = stage !== "initialPosition" ? 0 : 1;

      // Image Traveling
      journeyImageElement.style.transitionDuration =
        transformations[stage].duration;
      journeyImageElement.style.webkitTransform =
        transformations[stage].transform;
    }
  }

  return fragmentEventHandler;
}

export default function() {
  const eventHandler = theJourneyFragmentHandler();
  Reveal.addEventListener("fragmentshown", eventHandler);
  Reveal.addEventListener("fragmenthidden", eventHandler);
}
