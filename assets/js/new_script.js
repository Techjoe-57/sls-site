const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  toggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

const eventDate = new Date("2026-02-20T18:00:00").getTime();
const countdownEl = document.getElementById("countdownTimer");

if (countdownEl) {
  setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      countdownEl.textContent = "Event started!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m`;
  }, 1000);
}

// let currentSlide = 0;
// let testimonialsData = [];

// const track = document.getElementById("testimonialTrack");

// fetch("assets/data/testimonials.json")
//   .then(res => res.json())
//   .then(data => {
//     testimonialsData = data;
//     renderTestimonials();
//     autoSlide();
//   });

// function renderTestimonials() {
//   track.innerHTML = testimonialsData.map(t => `
//     <div class="testimonial-card">
//       <img src="${t.image}" alt="${t.name}">
//       <div class="testimonial-content">
//         <p>“${t.message}”</p>
//         <strong>${t.name}</strong><br>
//         <small>${t.institution}</small><br>
//         <small>${t.level}</small>
//       </div>
//     </div>
//   `).join("");
// }

// function moveSlide(direction) {
//   currentSlide =
//     (currentSlide + direction + testimonialsData.length) %
//     testimonialsData.length;

//   track.style.transform = `translateX(-${currentSlide * 100}%)`;
// }

// document.querySelector(".prev").onclick = () => moveSlide(-1);
// document.querySelector(".next").onclick = () => moveSlide(1);

// function autoSlide() {
//   setInterval(() => moveSlide(1), 6000);
// }

let currentSlide = 0;
let testimonialsData = [];

const track = document.getElementById("testimonialTrack");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

fetch("assets/data/testimonials.json")
  .then(res => res.json())
  .then(data => {
    testimonialsData = data;
    renderTestimonials();
    attachControls();
    autoSlide();
  });

function renderTestimonials() {
  track.innerHTML = testimonialsData.map(t => `
    <div class="testimonial-card">
      <img src="${t.image}" alt="${t.name}">
      <div class="testimonial-content">
        <p>“${t.message}”</p>
        <strong>${t.name}</strong><br>
        <small>${t.institution}</small><br>
        <small>${t.level}</small>
      </div>
    </div>
  `).join("");

  updateSlide();
}

function attachControls() {
  prevBtn.addEventListener("click", () => moveSlide(-1));
  nextBtn.addEventListener("click", () => moveSlide(1));
}

function moveSlide(direction) {
  currentSlide =
    (currentSlide + direction + testimonialsData.length) %
    testimonialsData.length;

  updateSlide();
}

// function attachControls() {
//   prevBtn.addEventListener("click", () => moveSlide(-1));
//   nextBtn.addEventListener("click", () => moveSlide(1));
// }

function updateSlide() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function autoSlide() {
  setInterval(() => moveSlide(1), 6000);
}

// Reset the timer to prevent auto-slide disrupting manual clicks
let autoTimer;

function autoSlide() {
  autoTimer = setInterval(() => moveSlide(1), 6000);
}

function moveSlide(direction) {
  clearInterval(autoTimer);
  currentSlide =
    (currentSlide + direction + testimonialsData.length) %
    testimonialsData.length;

  updateSlide();
  autoSlide();
}
