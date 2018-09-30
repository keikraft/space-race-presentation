// Cover Slide Animation
function coverFragmentHandler() {
  // Cover Title
  const coverTitleElement = document.createElement("h2");
  coverTitleElement.innerText = "SPACE RACE";
  coverTitleElement.style =
    "position: absolute; bottom: 0; left: 0; margin: 40px 60px";

  // Background Images
  const earthImageElement = document.createElement("div");
  earthImageElement.className = "slide-background-content";
  earthImageElement.style =
    "background-image: url('images/cover_earth2.jpg'); transition: transform 20s linear;";

  const moonImageElement = document.createElement("div");
  moonImageElement.className = "slide-background-content";
  moonImageElement.style =
    "background-image: url('images/cover_moon2.png'); transition: transform 20s linear; z-index: 2";

  // Cover Backgrounds Wrapper
  const coverBackgroundElement = document.querySelector(
    "div.reveal > div.backgrounds > div.slide-background"
  );
  coverBackgroundElement.appendChild(earthImageElement);
  coverBackgroundElement.appendChild(coverTitleElement);
  coverBackgroundElement.appendChild(moonImageElement);

  function fragmentEventHandler(event) {
    if (event.fragment.classList.contains("cover")) {
      earthImageElement.style.webkitTransform = "translateY(-25%)";
      moonImageElement.style.webkitTransform =
        "scale(1.2) perspective(450px) translateZ(150px) translateY(15%) rotate3d(1,0,0, 60deg)";
      // "perspective(450px) translateZ(450px) translateY(30%)";
    }
  }

  return fragmentEventHandler;
}
Reveal.addEventListener("ready", () => {
  const eventHandler = coverFragmentHandler();
  Reveal.addEventListener("fragmentshown", eventHandler);
  Reveal.addEventListener("fragmenthidden", eventHandler);
});
