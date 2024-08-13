// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const cartItemsContainer = document.querySelector(".cart-items");
  const carList = document.querySelector(".car-list");
  const totalPriceElement = document.getElementById("total-price");
  const totalItemElement = document.getElementById("total-items");
  const checkoutButton = document.getElementById("checkout");
  const contactForm = document.getElementById("contact-form");
  const slider = document.querySelector(".slider");
  let cartItems = [];

  // collection of cars
  let availableCars = [
    { name: "Car Model 1", price: 20000, src: "cars/car1.jpg" },
    { name: "Car Model 2", price: 25000, src: "cars/car2.jpg" },
    { name: "Car Model 3", price: 20000, src: "cars/car3.jpg" },
    { name: "Car Model 4", price: 25000, src: "cars/car4.jpg" },
  ];

  let currentImageIndex = 0;
  // Function to update the slider image
  function updateSliderImage() {
    currentImageIndex = (currentImageIndex + 1) % availableCars.length;

    slider.innerHTML = ` <img id="slider-image" src="${availableCars[currentImageIndex].src}" alt="Featured ${availableCars[currentImageIndex].name}" />`;

    slider.style.animation = "fade 2.5s infinite alternate";
  }
  updateSliderImage();
  // Change image every 5 seconds
  setInterval(updateSliderImage, 5000);

  //render availablecars
  renderAvailableCars();

  //generate html
  function renderAvailableCars() {
    let carsHTML = "";
    availableCars.forEach((car, index) => {
      carsHTML += ` <div class="car-item">
          <img src=${car.src} alt=Image of ${car.name} />
          <h3>${car.name}</h3>
          <p>Price: $${car.price}</p>
          <button class="add-to-cart" data-id=${index} data-price=${car.price}>
            Add to Cart
          </button>
        </div>`;
    });
    carList.innerHTML = carsHTML;
  }

  // Function to update the cart total
  function updateCartTotal() {
    let total = cartItems.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.textContent = total.toFixed(2);
    totalItemElement.textContent = cartItems.length;
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
  const reviews = document.querySelectorAll(".review");
  let currentReviewIndex = 0;
  console.log();

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
  setInterval(showNextReview, 3000);

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
