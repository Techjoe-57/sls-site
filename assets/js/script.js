// Dark mode or light button toggle
// Dark/light mode function
const btn = document.getElementById("themeToggle");

// Check the saved theme on load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  if (btn) btn.textContent = "☀️"; // Optional: Change icon to sun in dark mode
}

// Toggle theme on click safely
btn?.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  
  // Save the preference and swap the icon
  localStorage.setItem("theme", isDark ? "dark" : "light");
  btn.textContent = isDark ? "☀️" : "🌙"; 
});

// Event countdown
const countdownEl = document.getElementById("countdownTimer")
const events = document.querySelectorAll(".calendar-list li")

let nextEventDate = null;

events.forEach(event => {
  const date = new Date(event.dataset.date).getTime();
  const now = new Date().getTime();

  if (date > now) {
    if (!nextEventDate || date < nextEventDate) {
      nextEventDate = date;
    }
  }
});

if (countdownEl && nextEventDate) {
  setInterval(() => {

    const now = new Date().getTime();
    const distance = nextEventDate - now;

    if (distance < 0) {
      countdownEl.textContent = "Event Started!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

// Start of commented JS
//Testimonial slide script
// let currentSlide = 0;
// let testimonialsData = [];

// const track = document.getElementById("testimonialTrack");
// const prevBtn = document.querySelector(".prev");
// const nextBtn = document.querySelector(".next");

// fetch("assets/data/testimonials.json")
//   .then(res => res.json())
//   .then(data => {
//     testimonialsData = data;
//     renderTestimonials();
//     attachControls();
//     autoSlide();
//   });

//   function renderTestimonials() {
//   if (!track) {
//     console.error("Element #testimonialTrack not found in the DOM.");
//     return;
//   }

//   track.innerHTML = testimonialsData.map((t, index) => `
//     <div class="testimonial-card">
//       <img src="${t.image}" alt="${t.name}">

//       <div class="testimonial-content">
//         <p class="testimonial-message" id="msg-${index}">
//           “${t.message}”
//         </p>

//         ${
//           t.message.length > 180
//             ? `<button class="read-more-btn" onclick="toggleReadMore(${index})">
//                 Read More
//               </button>`
//             : ""
//         }

//         <strong>${t.name}</strong><br>
//         <small>${t.institution}</small><br>
//         <small>${t.level}</small>
//       </div>
//     </div>
//   `).join("");

//   updateSlide();
// }
// function toggleReadMore(index) {
//   const message = document.getElementById(`msg-${index}`);

//   message.classList.toggle("expanded");
// }
// function renderTestimonials() {
//   if (!track) {
//     console.error("Element #testimonialTrack not found in the DOM.");
//     return;
//   }
  
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

//   updateSlide();
// }

// function attachControls() {
//   prevBtn.addEventListener("click", () => moveSlide(-1));
//   nextBtn.addEventListener("click", () => moveSlide(1));
// }

// function moveSlide(direction) {
//   currentSlide =
//     (currentSlide + direction + testimonialsData.length) %
//     testimonialsData.length;

//   updateSlide();
// }

// function updateSlide() {
//   track.style.transform = `translateX(-${currentSlide * 100}%)`;
// }

// function autoSlide() {
//   setInterval(() => moveSlide(1), 6000);
// }

// Reset the timer to prevent auto-slide disrupting manual clicks
// let autoTimer;

// function autoSlide() {
//   autoTimer = setInterval(() => moveSlide(1), 6000);
// }

// function moveSlide(direction) {
//   clearInterval(autoTimer);
//   currentSlide =
//     (currentSlide + direction + testimonialsData.length) %
//     testimonialsData.length;

//   updateSlide();
//   autoSlide();
// } End of commented code

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

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const status = form.querySelector(".form-status");

    emailjs.sendForm("service_iippmsj", "template_sdf8mu3", this)
      .then(() => {
        status.textContent = "Message sent successfully!";
        status.style.color = "green";
        form.reset();
      })
      .catch(() => {
        status.textContent = "Something went wrong.";
        status.style.color = "red";
      });
  });
}

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

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Floating contact modal
const contactFloat = document.getElementById("contactFloat");
const contactModal = document.getElementById("contactModal");
const closeModal = document.getElementById("closeModal");

if (contactFloat && contactModal && closeModal) {

  contactFloat.addEventListener("click", () => {
    contactModal.classList.add("active");
  });

  closeModal.addEventListener("click", () => {
    contactModal.classList.remove("active");
  });

  // Close when clicking outside
  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove("active");
    }
  });

}

// Blog Script
fetch('assets/data/blog.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('blogContainer');

    data.forEach(post => {
      container.innerHTML += `
        <div class="blog-card">
          <img src="${post.image}" alt="">
          <div class="blog-content">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <a href="#">Read More →</a>
          </div>
        </div>
      `;
    });
  });