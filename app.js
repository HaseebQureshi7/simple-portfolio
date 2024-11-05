const view0 = document.querySelector(".view-0");
const view1 = document.querySelector(".view-1");

function detectScroll(onScrollDown, onScrollUp) {
  window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
      onScrollDown(); // Scroll down detected
    } else if (event.deltaY < 0) {
      onScrollUp(); // Scroll up detected
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


// document.addEventListener("touchmove", (e) => {
//   console.log("Touch is Moving !",e)
// })

detectScroll(
  () => {
    view0.style.display = "none";
    view1.style.display = "inherit";
    console.log("Scrolling down");
  },
  () => {
    view0.style.display = "inherit";
    view1.style.display = "none";
    console.log("Scrolling up");
  }
);

// Example usage:
detectSlide(
  () => {
    view0.style.display = "none";
    view1.style.display = "inherit";
    console.log("Scrolling down");
  },
  () => {
    view0.style.display = "inherit";
    view1.style.display = "none";
    console.log("Scrolling up");
  }
);