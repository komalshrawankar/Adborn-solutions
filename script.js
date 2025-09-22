// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // 1. Custom Horizontal Slider
  // ===============================
  const slider = document.getElementById("slider");
  if (slider) {
    let currentIndex = 0;

    function scrollSlider(direction) {
      const cardWidth =
        slider.querySelector(".col-md-6").offsetWidth + 20; // include gap
      currentIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        slider.children.length - 2 // adjust for visible cards
      );
      slider.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }

    // Auto-scroll on mouse wheel
    slider.addEventListener("wheel", (e) => {
      e.preventDefault();
      scrollSlider(e.deltaY > 0 ? 1 : -1);
    });
  }

  // ===============================
  // 2. Swipers
  // ===============================

  // Home page Swiper (autoplay, pagination only)
  if (document.querySelector(".home-swiper")) {
    const homeSwiper = new Swiper(".home-swiper", {
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".home-swiper .swiper-pagination",
        clickable: true,
      },
      slidesPerView: 3,
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 2, spaceBetween: 20 },
      },
    });
  }

  // About page Swiper (manual nav, no autoplay)
  if (document.querySelector(".about-swiper")) {
    const aboutSwiper = new Swiper(".about-swiper", {
      loop: true,
      pagination: {
        el: ".about-swiper .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".about-swiper .custom-next",
        prevEl: ".about-swiper .custom-prev",
      },
      slidesPerView: 4.5,
      spaceBetween: 20,
      breakpoints: {
        640: { slidesPerView: 2.5, spaceBetween: 15 },
        1024: { slidesPerView: 4.5, spaceBetween: 20 },
      },
    });
  }

  // Partner logos Swiper
  if (document.querySelector(".partner-swiper")) {
    const partnerSwiper = new Swiper(".partner-swiper", {
      slidesPerView: 5,
      spaceBetween: 30,
      navigation: {
        nextEl: ".partner-swiper .swiper-button-next",
        prevEl: ".partner-swiper .swiper-button-prev",
      },
      breakpoints: {
        992: { slidesPerView: 5 },
        768: { slidesPerView: 3 },
        576: { slidesPerView: 2 },
      },
    });
  }

  // Testimonial Swiper
  if (document.querySelector(".testimonial-swiper")) {
    const testimonialSwiper = new Swiper(".testimonial-swiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        nextEl: ".testimonial-swiper .swiper-button-next",
        prevEl: ".testimonial-swiper .swiper-button-prev",
      },
      breakpoints: {
        992: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
        576: { slidesPerView: 1 },
      },
    });
  }

  // ===============================
  // 3. Load Header & Footer
  // ===============================
  function loadHTML(file, elementId) {
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        const el = document.getElementById(elementId);
        if (el) el.innerHTML = data;
      })
      .catch((error) => console.error("Error loading " + file, error));
  }

  loadHTML("header.html", "header");
  loadHTML("footer.html", "footer");
});
