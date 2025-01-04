document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navLinks1 = document.querySelector(".nav-links-1 ul");
    const navLinks2 = document.querySelector(".nav-links-2 ul");
  
    // Toggle visibility of nav links on hamburger menu click
    hamburgerMenu.addEventListener("click", () => {
      navLinks1.classList.toggle("show");
      navLinks2.classList.toggle("show");
    });
  
    // Close the menu when a link is clicked (optional)
    const navLinks = document.querySelectorAll(".nav-links-1 ul li a, .nav-links-2 ul li a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navLinks1.classList.remove("show");
        navLinks2.classList.remove("show");
      });
    });
  });
  
// Slider Functionality
const track = document.querySelector(".slider-track");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let currentSlide = 0;

function calculateDimensions() {
  const card = document.querySelector(".card");
  const cardWidth = card.offsetWidth + 10; // Include margin
  const slider = document.querySelector(".slider");
  const sliderWidth = slider.offsetWidth;
  const cardsToShow = Math.floor(sliderWidth / cardWidth);
  const totalCards = document.querySelectorAll(".card").length;

  return { cardWidth, cardsToShow, totalCards };
}

function updateSlider() {
  const { cardWidth, cardsToShow, totalCards } = calculateDimensions();
  const offset = -(currentSlide * cardWidth);
  track.style.transform = `translateX(${offset}px)`; // Fixed template literal

  prevButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide >= totalCards - cardsToShow;
}

nextButton.addEventListener("click", () => {
  const { cardsToShow, totalCards } = calculateDimensions();
  if (currentSlide < totalCards - cardsToShow) {
    currentSlide++;
    updateSlider();
  }
});

prevButton.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlider();
  }
});

// Update card dimensions on window resize
window.addEventListener("resize", updateSlider);

// Initialize slider
updateSlider();

// Cart Functionality
const cart = [];
const cartCountElement = document.getElementById("cart-count");

const cartModal = document.getElementById("cart-modal");
const closeModalButton = document.getElementById("close-modal");
const cartItemsElement = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

const shopNowButtons = document.querySelectorAll(".shopnow-btn");

shopNowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const productName = card.querySelector("h3").textContent;
    const productPrice = parseFloat(
      card.querySelector("h4").textContent.replace(/[^0-9.-]+/g, "")
    );

    const product = {
      name: productName,
      price: productPrice,
    };

    cart.push(product);
    alert(`${productName} has been added to the cart`); // Fixed alert template literal
    updateCart();
  });
});

function updateCart() {
  cartCountElement.innerHTML = `
    <img class="cart" src="assets/shopping-bag.png" alt="cart-icon">
    <span class="cart-count-badge">${cart.length}</span>
  `;
}

cartCountElement.addEventListener("click", () => {
  updateCartModal();
  cartModal.style.display = "block"; // Show the modal
});

closeModalButton.addEventListener("click", () => {
  cartModal.style.display = "none"; // Hide the modal
});

function updateCartModal() {
  cartItemsElement.innerHTML = ""; // Clear previous items
  let totalPrice = 0;

  cart.forEach((product) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    itemElement.innerHTML = `
      <p>${product.name}</p>
      <p>Price: $${product.price}</p>
    `;

    cartItemsElement.appendChild(itemElement);
    totalPrice += product.price;
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

window.onclick = (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
};
// Example: Adjust the layout or add an animation on page load

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth <= 786) {
      // Do something special for mobile screens
      document.querySelector('.hero-section').style.backgroundColor = '#f0f0f0'; // Change background color on mobile
    }
  });
  
  // Example: Adjust layout dynamically when the window is resized
  window.addEventListener('resize', function () {
    if (window.innerWidth <= 786) {
      document.querySelector('.hero-section').style.height = 'auto'; // Adjust hero section height on smaller screens
    } else {
      document.querySelector('.hero-section').style.height = '80vh'; // Reset height for larger screens
    }
  });
 // Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk16IjGxe1MCLFoo8logapXb3MA-VUVHo",
  authDomain: "hackathon-1822a.firebaseapp.com",
  projectId: "hackathon-1822a",
  storageBucket: "hackathon-1822a.firebasestorage.app",
  messagingSenderId: "22724491091",
  appId: "1:22724491091:web:010efdff22988008a853a6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get form elements
const contactForm = document.getElementById('Contactform');

// Add event listener to form
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const consent = document.getElementById('data').checked;

  // Validate consent
  if (!consent) {
    alert('Please consent to the processing of personal data.');
    return;
  }

  // Push data to Firebase
  push(ref(database, 'contacts'), {
    name: name,
    email: email,
    message: message,
  })
    .then(() => {
      alert('Message submitted successfully!');
      contactForm.reset();
    })
    .catch((error) => {
      console.error("Error writing to Firebase:", error);
      alert('An error occurred. Please try again.');
    });
});