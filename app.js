const view0 = document.querySelector(".view-0");
const view1 = document.querySelector(".view-1");
const view2 = document.querySelector(".view-2");
const view3 = document.querySelector(".view-3");
const view4 = document.querySelector(".view-4");
const view5 = document.querySelector(".view-5");

var stackCounter = 1;
totalPages = 6;

function applyContinuous3DTilt(element, tiltIntensity = 15) {
  element.style.transition = "transform 0.2s ease"; // Smooth transition

  window.addEventListener("mousemove", (event) => {
    const { width, height, left, top } = element.getBoundingClientRect();
    const mouseX = event.clientX - left;
    const mouseY = event.clientY - top;

    // Calculate tilt based on cursor position
    const rotateY = (mouseX / width - 0.5) * tiltIntensity * 2;
    const rotateX = (mouseY / height - 0.5) * -tiltIntensity * 2;

    element.style.transform = `perspective(500px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });
}

// Usage
const h1s = document.querySelector("h1");
const bokeh = document.querySelector(".bokeh");
const bokeh2 = document.querySelector(".bokeh2");
const socials = document.querySelectorAll(".social");

// console.log(socials);

applyContinuous3DTilt(bokeh, 10); // Apply tilt effect to bokeh
applyContinuous3DTilt(bokeh2, 15); // Apply tilt effect to bokeh
applyContinuous3DTilt(h1s, 2); // Apply tilt effect to h1
socials.forEach((social) => {
  applyContinuous3DTilt(social, 1.5);
});

var stackIncrementationEnabled = true;
var stackDecrementationEnabled = true;

const enableStackIncrementation = () => {
  const reactivator = setTimeout(() => {
    stackIncrementationEnabled = true;
    return clearTimeout(reactivator);
  }, 1000);
};

const enableStackDecrementation = () => {
  const reactivator = setTimeout(() => {
    stackDecrementationEnabled = true;
    return clearTimeout(reactivator);
  }, 1000);
};

function detectScroll(onScrollDown, onScrollUp) {
  window.addEventListener("wheel", (event) => {
    if (!stackIncrementationEnabled) return;
    if (event.deltaY > 0) {
      stackIncrementationEnabled && onScrollDown();
      stackIncrementationEnabled = false;
      enableStackIncrementation();
    } else if (event.deltaY < 0) {
      stackDecrementationEnabled && onScrollUp();
      stackDecrementationEnabled = false;
      enableStackDecrementation();
    }
  });
}

function detectSlide(onSlideUp, onSlideDown) {
  let startY = null;
  document.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY; // Store the initial touch Y position
  });
  document.addEventListener("touchmove", (e) => {
    if (startY === null) return; // Ignore if startY hasn't been set
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;
    if (distance < -30) {
      // Threshold for slide up
      onSlideUp();
      startY = null; // Reset startY after detecting the slide up
    } else if (distance > 30) {
      // Threshold for slide down
      onSlideDown();
      startY = null; // Reset startY after detecting the slide down
    }
  });

  // Reset startY when the touch ends
  document.addEventListener("touchend", () => {
    startY = null;
  });
}

function detectUpDown(onArrowDown, onArrowUp) {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      onArrowDown(); // Arrow Down key pressed
    } else if (event.key === "ArrowUp") {
      onArrowUp(); // Arrow Up key pressed
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowDown") {
      console.log("Arrow Down key released");
    } else if (event.key === "ArrowUp") {
      console.log("Arrow Up key released");
    }
  });
}

StackIncrementor = () => {
  if (stackCounter == totalPages) {
    return;
  }
  stackCounter += 1;
  stackUpdater();
  if (navigator.vibrate) {
    navigator.vibrate([10]);
  }

  console.log(stackCounter);
};

StackDecrementor = () => {
  if (stackCounter == 1) {
    return;
  }
  stackCounter -= 1;
  stackUpdater();
  navigator.vibrate([10]);

  console.log(stackCounter);
};

detectScroll(
  () => StackIncrementor(),
  () => StackDecrementor()
);

detectSlide(
  () => StackIncrementor(),
  () => StackDecrementor()
);

detectUpDown(
  () => StackIncrementor(),
  () => StackDecrementor()
);

const stackUpdater = () => {
  switch (stackCounter) {
    case 1:
      view0.style.display = "flex";
      view1.style.display = "none";
      view2.style.display = "none";
      view3.style.display = "none";
      view4.style.display = "none";
      view5.style.display = "none";
      console.log("View 1 Active");
      break;
    case 2:
      view0.style.display = "none";
      view1.style.display = "flex";
      view2.style.display = "none";
      view3.style.display = "none";
      view4.style.display = "none";
      view5.style.display = "none";
      console.log("View 2 Active");
      break;
    case 3:
      view0.style.display = "none";
      view1.style.display = "none";
      view2.style.display = "flex";
      view3.style.display = "none";
      view4.style.display = "none";
      view5.style.display = "none";
      console.log("View 3 Active");
      break;
    case 4:
      view0.style.display = "none";
      view1.style.display = "none";
      view2.style.display = "none";
      view3.style.display = "flex";
      view4.style.display = "none";
      view5.style.display = "none";
      console.log("View 4 Active");
      break;
    case 5:
      view0.style.display = "none";
      view1.style.display = "none";
      view2.style.display = "none";
      view3.style.display = "none";
      view4.style.display = "flex";
      view5.style.display = "none";
      console.log("View 5 Active");
      break;
    case 6:
      view0.style.display = "none";
      view1.style.display = "none";
      view2.style.display = "none";
      view3.style.display = "none";
      view4.style.display = "none";
      view5.style.display = "flex";
      console.log("View 5 Active");
      break;
  }
};

stackUpdater();
