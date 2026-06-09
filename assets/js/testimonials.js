//Current JS
let currentSlide = 0;
let testimonialsData = [];

const track = document.getElementById("testimonialTrack");
const grid = document.getElementById("testimonialGrid");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

fetch("assets/data/testimonials.json")
  .then(res => res.json())
  .then(data => {

    testimonialsData = data;

    renderFeaturedTestimonials();

    renderGridTestimonials();

    attachControls();

    autoSlide();

  });

/* FEATURED */
function renderFeaturedTestimonials() {

  track.innerHTML = testimonialsData.map(t => `

    <div class="testimonial-card">

      <div class="testimonial-left">

        <img src="${t.image}" alt="${t.name}">

      </div>

      <div class="testimonial-right">

        <div class="quote-icon">❝</div>

        <p class="testimonial-message">
          ${t.message}
        </p>

        <div class="testimonial-footer">

          <strong>${t.name}</strong><br>

          <small>${t.institution}</small><br>

          <small>${t.level}</small>

        </div>

      </div>

    </div>

  `).join("");

  updateSlide();
}

/* GRID */
function renderGridTestimonials() {

  grid.innerHTML = testimonialsData.map(t => `

    <div class="testimonial-grid-card">

      <div class="testimonial-top">

        <img src="${t.image}" alt="${t.name}">

        <div class="testimonial-info">

          <strong>${t.name}</strong>

          <small>${t.institution}</small><br>

          <small>${t.level}</small>

        </div>

      </div>

      <p>
        ${t.message}
      </p>

    </div>

  `).join("");
}

/* CONTROLS */
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

  track.style.transform =
    `translateX(-${currentSlide * 100}%)`;

}

function autoSlide() {

  setInterval(() => moveSlide(1), 7000);

}
// End of Current JS

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