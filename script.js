document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        });
      }
    });
  });

  // Fixed header on scroll
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.boxShadow = "var(--shadow)";
    } else {
      header.style.boxShadow = "var(--shadow-sm)";
    }
    lastScrollY = window.scrollY;
  });

  // Simple form validation
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const details = document.getElementById("project-details");

      let valid = true;

      if (!name.value.trim()) {
        valid = false;
        showError(name, "Name is required");
      } else {
        removeError(name);
      }

      if (!email.value.trim()) {
        valid = false;
        showError(email, "Email is required");
      } else if (!isValidEmail(email.value)) {
        valid = false;
        showError(email, "Please enter a valid email");
      } else {
        removeError(email);
      }

      if (!details.value.trim()) {
        valid = false;
        showError(details, "Project details are required");
      } else {
        removeError(details);
      }

      if (valid) {
        // Here you would typically send data to server
        // For now just show a success message
        alert("Thank you! Your message has been sent successfully.");
        contactForm.reset();
      }
    });
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    let errorDiv = formGroup.querySelector(".error-message");

    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.style.color = "#e53e3e";
      errorDiv.style.fontSize = "0.875rem";
      errorDiv.style.marginTop = "0.375rem";
      formGroup.appendChild(errorDiv);
    }

    input.style.borderColor = "#e53e3e";
    errorDiv.textContent = message;
  }

  function removeError(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector(".error-message");

    if (errorDiv) {
      formGroup.removeChild(errorDiv);
    }

    input.style.borderColor = "var(--border-color)";
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
