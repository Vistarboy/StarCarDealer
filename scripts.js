// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout");
  const contactForm = document.getElementById("contact-form");
  const sliderImage = document.getElementById("slider-image");
  let cartItems = [];
  let currentImageIndex = 0;

  // List of images for the slider
  const sliderImages = ["car1.jpg", "car2.jpg", "car3.jpg"];

  // Function to update the slider image
  function updateSliderImage() {
    currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
    sliderImage.src = sliderImages[currentImageIndex];
  }

  // Change image every 5 seconds
  setInterval(updateSliderImage, 5000);

  // Function to update the cart total
  function updateCartTotal() {
    let total = cartItems.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.textContent = total.toFixed(2);
  }

  // Function to render cart items
  function renderCartItems() {
    cartItemsContainer.innerHTML = "";
    cartItems.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-from-cart");
      removeButton.setAttribute("data-index", index);
      li.appendChild(removeButton);
      cartItemsContainer.appendChild(li);
    });
    updateCartTotal();
  }

  // Event listener for "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const carId = this.getAttribute("data-id");
      const carName = this.parentElement.querySelector("h3").textContent;
      const carPrice = parseFloat(this.getAttribute("data-price"));

      const cartItem = {
        id: carId,
        name: carName,
        price: carPrice,
      };

      cartItems.push(cartItem);
      renderCartItems();
    });
  });

  // Event listener for remove buttons in cart items
  cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart")) {
      const index = event.target.getAttribute("data-index");
      cartItems.splice(index, 1);
      renderCartItems();
    }
  });

  // Event listener for checkout button
  checkoutButton.addEventListener("click", function () {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for your purchase!");
    cartItems = [];
    renderCartItems();
  });

  // Event listener for contact form submission
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Here, you would typically send the form data to the server
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    alert("Thank you for contacting us!");

    // Clear the form fields
    contactForm.reset();
  });
});

/*//////////////8/88*/

document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const reviews = document.querySelectorAll("#customer-reviews .review");
  let currentReviewIndex = 0;

  // Function to show the next review
  function showNextReview() {
    reviews.forEach((review, index) => {
      review.style.display = index === currentReviewIndex ? "block" : "none";
    });
    currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
  }

  // Initially show the first review
  showNextReview();

  // Change review every 5 seconds
  setInterval(showNextReview, 5000);

  // Event listener for comment form submission
  const commentForm = document.getElementById("comment-form");
  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("comment-name").value;
    const message = document.getElementById("comment-message").value;

    // Here, you would typically send the comment data to the server
    console.log(`Name: ${name}, Comment: ${message}`);

    alert("Thank you for your comment!");

    // Clear the form fields
    commentForm.reset();
  });
});
