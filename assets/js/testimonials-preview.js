// assets/js/testimonials-preview.js

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("testimonialTrack");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  let index = 0;
  let autoPlayInterval;
  let isPaused = false;

  // Get all testimonial cards (after injection)
  function getCards() {
    return track.querySelectorAll(".testimonial-card");
  }

  function getCardWidth() {
    const card = track.querySelector(".testimonial-card");
    if (!card) return 0;

    const style = window.getComputedStyle(track);
    const gap = parseInt(style.gap || 0);

    return card.offsetWidth + gap;
  }

  function scrollToIndex(i) {
    const cards = getCards();
    if (!cards.length) return;

    track.scrollTo({
      left: i * getCardWidth(),
      behavior: "smooth",
    });
  }

  function nextSlide() {
    const cards = getCards();
    if (!cards.length) return;

    index++;
    if (index >= cards.length) index = 0;

    scrollToIndex(index);
  }

  function prevSlide() {
    const cards = getCards();
    if (!cards.length) return;

    index--;
    if (index < 0) index = cards.length - 1;

    scrollToIndex(index);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 4000); // speed
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Buttons
  nextBtn?.addEventListener("click", () => {
    nextSlide();
  });

  prevBtn?.addEventListener("click", () => {
    prevSlide();
  });

  // Pause on hover
  track.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  track.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  // Mobile touch pause
  track.addEventListener("touchstart", () => {
    isPaused = true;
  });

  track.addEventListener("touchend", () => {
    isPaused = false;
  });

  // Keep index synced when user manually scrolls
  track.addEventListener("scroll", () => {
    clearTimeout(track._scrollTimer);

    track._scrollTimer = setTimeout(() => {
      const cards = getCards();
      if (!cards.length) return;

      index = Math.round(track.scrollLeft / getCardWidth());
    }, 100);
  });

  // Start
  startAutoPlay();

  // Optional cleanup (good practice)
  window.addEventListener("beforeunload", stopAutoPlay);
});