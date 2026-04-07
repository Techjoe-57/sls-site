// Dark mode or light button toggle
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  toggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Event countdown
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

//Testimonial slide script
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
// Mail Script
// emailjs.init("UkSAZDqrmMplp5IcO");

const form = document.getElementById("contactForm");
const status = document.querySelector(".form-status");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_iippmsj", "template_sdf8mu3", this)
      .then(() => {
        status.textContent = "Message sent successfully!";
        status.style.color = "green";
        form.reset();
      })
      .catch(() => {
        status.textContent = "Something went wrong. Try again.";
        status.style.color = "red";
      });
  });
}


//Slider
// let currentSlidee = 0;
// const slides = document.querySelectorAll(".slide");

// function showSlide(index) {
//   slides.forEach(s => s.classList.remove("active"));
//   slides[index].classList.add("active");
// }

// document.querySelector(".simple-next").onclick = () => {
//   currentSlidee = (currentSlidee + 1) % slides.length;
//   showSlide(currentSlidee);
// };

// document.querySelector(".simple-prev").onclick = () => {
//   currentSlidee = (currentSlidee - 1 + slides.length) % slides.length;
//   showSlide(currentSlidee);
// };

// /* Auto slide */
// setInterval(() => {
//   currentSlidee = (currentSlidee + 1) % slides.length;
//   showSlide(currentSlidee);
// }, 5000);

document.addEventListener("DOMContentLoaded", () => {

  let heroSlideIndex = 0;

  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".simple-next");
  const prevBtn = document.querySelector(".simple-prev");

  // Stop if slider not on page
  if (!slides.length || !nextBtn || !prevBtn) return;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    heroSlideIndex = (heroSlideIndex + 1) % slides.length;
    showSlide(heroSlideIndex);
  });

  prevBtn.addEventListener("click", () => {
    heroSlideIndex =
      (heroSlideIndex - 1 + slides.length) % slides.length;
    showSlide(heroSlideIndex);
  });

  // Auto slide
  let auto = setInterval(() => {
    heroSlideIndex = (heroSlideIndex + 1) % slides.length;
    showSlide(heroSlideIndex);
  }, 5000);

});
