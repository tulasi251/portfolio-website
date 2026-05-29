document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
      const preloader = document.getElementById("preloader");
      preloader.style.display = "none";
    }, 2000); // 3 seconds delay
  });
  
  const form = document.getElementById("form");
  const result = document.getElementById("result");
  
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait...";
  
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.innerHTML = json.message;
          result.classList.remove("text-gray-500");
          result.classList.add("text-green-500");
        } else {
          console.log(response);
          result.innerHTML = json.message;
          result.classList.remove("text-gray-500");
          result.classList.add("text-red-500");
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          result.style.display = "none";
        }, 5000);
      });
  });
  let currentIndex = 0;
  const cards = document.querySelector(".cards");
  const cardElements = document.querySelectorAll(".card2");
  const cardCount = cardElements.length;
  
  // Function to calculate the number of visible cards based on screen size
  function getVisibleCards() {
    if (window.innerWidth <= 425) {
      return 1; // Show only 1 card at a time on screens <= 425px
    } else if (window.innerWidth <= 768) {
      return 2; // Show 2 cards on tablet screens <= 768px
    }
    return 3; // Show 3 cards on larger screens
  }
  
  // Function to calculate the width of the cards dynamically
  function getCardWidth() {
    if (window.innerWidth <= 425) {
      return window.innerWidth - 40; // Full width of the mobile screen with some margin
    } else if (window.innerWidth <= 768) {
      return window.innerWidth - 40; // Adjust card width for tablet screens
    }
    return 250; // Default card width for larger screens
  }
  
  // Update the slider position based on the current index and visible cards
  function updateSlider() {
    const visibleCards = getVisibleCards();
    const cardWidth = getCardWidth();
    const marginBetweenCards = 20; // Margin between cards
    const moveDistance = cardWidth + marginBetweenCards; // Total distance a card moves
    cards.style.transform = `translateX(-${moveDistance * currentIndex}px)`;
    cards.style.transition = "transform 0.3s ease-in-out"; // Smooth sliding effect
  }
  
  // Next Button Click
  document.getElementById("nextBtn").addEventListener("click", () => {
    const visibleCards = getVisibleCards();
    if (currentIndex < cardCount - visibleCards) {
      currentIndex++;
      updateSlider();
    }
  });
  
  // Previous Button Click
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });
  
  // Adjust the slider when the window is resized
  window.addEventListener("resize", updateSlider);
  
  // Initial setup to position the slider
  updateSlider();
  function openNav() {
    document.getElementById("sidebar").classList.add("open");
    document.getElementById("hamburger-menu").style.display = "none";
  }
  
  function closeNav() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("hamburger-menu").style.display = "block";
  }
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", "#923cb5");