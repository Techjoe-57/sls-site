//Contact Form
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

// NavLink Collapse
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Testimonial function
function renderTestimonials() {
  if (!track) {
    console.error("Element #testimonialTrack not found in the DOM.");
    return;
  }

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
          <div>
            <strong>${t.name}</strong><br>
            <small>${t.institution}</small><br>
            <small>${t.level}</small>
          </div>
        </div>

      </div>

    </div>
  `).join("");

  updateSlide();
}

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
