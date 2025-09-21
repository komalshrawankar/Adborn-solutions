// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // 1. Custom horizontal slider
  // ===============================
  const slider = document.getElementById("slider");
  if (slider) {
    let currentIndex = 0;

    function scrollSlider(direction) {
      const cardWidth = slider.querySelector(".col-md-6").offsetWidth + 20; // Include gap
      currentIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        slider.children.length - 2 // Adjust for visible cards
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
  // 2. Home page Swiper (autoplay, pagination only)
  // ===============================
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

  // ===============================
  // 3. About page Swiper (manual nav, no autoplay)
  // ===============================
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
      slidesPerView: 3,
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      },
    });
  }
});
// about our-partner slider
var swiper = new Swiper(".partner-swiper", {
    slidesPerView: 5,     // 🔥 5 logos per row (desktop)
    spaceBetween: 30,     // gap between cards
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      992: { slidesPerView: 5 }, // large screen
      768: { slidesPerView: 3 }, // tablet
      576: { slidesPerView: 2 }, // mobile
    }
  });

   var swiper = new Swiper(".testimonial-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      992: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
      576: { slidesPerView: 1 },
    }
  });
