// Journey Slides fragments control

function theJourneyFragmentHandler() {
  const transformations = {
    initialPosition: {
      transform: "scale(1) translate(0, 0)",
      duration: 1000
    },
    launch: {
      transform: "scale(3) translate(300px, 20px)",
      duration: 1000,
      video: "media/videos/edit/journey-1.mp4",
      videoPosition: { top: "-70px", right: "-90px" }
    },
    toTheMoon: {
      transform: "scale(3.5) translate(370px, -130px)",
      duration: 800,
      video: "media/videos/edit/journey-2.mp4",
      videoPosition: { top: "-70px", right: "-90px" }
    },
    landing: {
      transform: "scale(3.5) translate(-450px, -150px)",
      duration: 5000,
      video: "media/videos/edit/journey-2.mp4",
      videoPosition: { bottom: "10px", left: "-90px" }
    },
    backHome: {
      transform: "scale(3.5) translate(-450px, 130px)",
      duration: 1000,
      video: "media/videos/edit/journey-2.mp4",
      videoPosition: { top: "-70px", left: "-90px" }
    },
    reentry: {
      transform: "scale(3.5) translate(550px, 70px",
      duration: 5000,
      video: "media/videos/edit/journey-2.mp4",
      videoPosition: { bottom: "-25px", right: "-90px" }
    }
  };

  const journeyTitleElem = document.getElementById("the-journey-title");
  const journeyImageElem = document.getElementById("the-journey-img");
  const journeyVideoElem = document.getElementById("the-journey-video");

  function fadeOutVideo() {
    journeyVideoElem.style.opacity = 0;
    return new Promise(resolve =>
      setTimeout(() => {
        journeyVideoElem.pause();
        resolve();
      }, 800)
    );
  }

  function fadeInVideo(src) {
    journeyVideoElem.src = src;
    journeyVideoElem.style.opacity = 1;
    journeyVideoElem.play();
    return new Promise(resolve => setTimeout(() => resolve(), 800));
  }

  function setVideoPosition({
    top = null,
    bottom = null,
    left = null,
    right = null
  }) {
    journeyVideoElem.style.top = top;
    journeyVideoElem.style.bottom = bottom;
    journeyVideoElem.style.left = left;
    journeyVideoElem.style.right = right;
  }

  function imageTraveling(duration, transform) {
    journeyImageElem.style.transitionDuration = `${duration}ms`;
    journeyImageElem.style.webkitTransform = transform;
    return new Promise(resolve => setTimeout(() => resolve(), duration));
  }

  async function fragmentEventHandler(event) {
    if (event.fragment.classList.contains("journey")) {
      const stage = event.fragment.classList.item(2);
      const { duration, transform, video, videoPosition } = transformations[
        stage
      ];

      // Title Display
      journeyTitleElem.style.opacity = stage !== "initialPosition" ? 0 : 1;

      await fadeOutVideo();
      await imageTraveling(duration, transform);

      if (stage !== "initialPosition") {
        setVideoPosition(videoPosition);
        await fadeInVideo(video);
      } else {
      }
    }
  }

  return fragmentEventHandler;
}

export default function() {
  const eventHandler = theJourneyFragmentHandler();
  Reveal.addEventListener("fragmentshown", eventHandler);
  Reveal.addEventListener("fragmenthidden", eventHandler);
}
