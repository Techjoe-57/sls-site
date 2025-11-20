/* =====================================================
   SMART LIFE SOLUTIONS WEBSITE
   MAIN JAVASCRIPT - v1.0 (October 2025)
   Author: Smart Life Solutions (SLS)
   ===================================================== */

/* ---------------------------
   1. DARK / LIGHT MODE TOGGLE
------------------------------ */

// Grab the theme toggle button
const themeToggle = document.getElementById("theme-toggle");

// Check for saved preference in localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// Add a click listener to toggle between modes
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference to localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  // Optional: Toggle the icon text if desired
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "🌙"
    : "☀️";
});

/* ---------------------------
   2. GALLERY POPUP ALERT
------------------------------ */

// Select all gallery items that have the "gallery-item" class
const galleryItems = document.querySelectorAll(".gallery-item");

// Add event listener to each gallery item
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const caption = item.querySelector(".caption")?.innerText || "Gallery item";
    alert(`You clicked on: ${caption}`);
  });
});

/* ---------------------------
   3. CONTACT FORM ALERT SIMULATION
------------------------------ */

// Get reference to the contact form (if present)
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect data (optional future backend integration)
    const name = contactForm.querySelector("input[name='name']").value;
    const email = contactForm.querySelector("input[name='email']").value;

    // Simple validation check
    if (!name || !email) {
      alert("Please fill in the required fields before submitting.");
      return;
    }

    // Simulated success message
    alert(`Thank you ${name}! Your message has been received.`);

    // Reset form after submission
    contactForm.reset();
  });
}

/* ---------------------------
   4. SCROLL-TO-TOP FEATURE
------------------------------ */

// Create a scroll-to-top button dynamically
const scrollBtn = document.createElement("button");
scrollBtn.textContent = "⬆️";
scrollBtn.id = "scroll-top";
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 25px;
  right: 25px;
  background: #0056b3;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 1.2rem;
  cursor: pointer;
  display: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  transition: background 0.3s ease;
`;

// Add button to the page
document.body.appendChild(scrollBtn);

// Show button when scrolling down 300px
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Scroll smoothly to top when clicked
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ---------------------------
   5. RESPONSIVE NAV (OPTIONAL FUTURE USE)
------------------------------ */
// For mobile responsiveness, add toggleable menu
// Uncomment below if mobile nav collapses are implemented
/*
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show-menu");
});
*/
