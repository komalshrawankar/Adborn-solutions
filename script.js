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
});
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
        nextEl: ".partner-next",
      prevEl: ".partner-prev",
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
 function loadHTML(file, elementId, callback) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      const el = document.getElementById(elementId);
      if (el) {
        el.innerHTML = data;
        if (callback) callback(); // run callback AFTER content loads
      }
    })
    .catch((error) => console.error("Error loading " + file, error));
}

// Load other sections
loadHTML("header.html", "header");
loadHTML("footer.html", "footer");
loadHTML("ourwork.html", "ourwork");
loadHTML("expert.html", "expert");
loadHTML("rating.html", "rating", initSwiper);

// ✅ Load carousel + initialize Swiper only after injection
loadHTML("carousel.html", "carousel", initPartnerSwiper);

function initPartnerSwiper() {
  console.log("Carousel HTML injected!");

  // Wait a tiny bit so DOM is painted before Swiper runs
  setTimeout(() => {
    if (document.querySelector(".partner-swiper")) {
      new Swiper(".partner-swiper", {
        slidesPerView: 5,
        spaceBetween: 30,
        navigation: {
          nextEl: ".partner-swiper .swiper-button-next",
          prevEl: ".partner-swiper .swiper-button-prev",
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        loop: true,
        breakpoints: {
          1200: { slidesPerView: 5 },
          992: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          576: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        },
      });
      console.log("Partner Swiper initialized ✅");
    } else {
      console.warn("Carousel HTML injected but .partner-swiper not found!");
    }
  }, 50); // 50ms delay ensures DOM is painted
}

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return; // ✅ stop if no carousel on page

  const items = document.querySelectorAll('.item');
  const itemCount = items.length;
  const angle = 360 / itemCount;

  items.forEach((item, i) => {
    item.style.transform = `rotateY(${i * angle}deg) translateZ(250px)`;
  });

  let rotation = 0;

  function animate() {
    rotation += 0.2; // rotation speed
    carousel.style.transform = `rotateY(${rotation}deg)`;

    items.forEach((item, i) => {
      const itemAngle = (i * angle + rotation) % 360;
      if (itemAngle > 90 && itemAngle < 270) {
        item.style.filter = 'blur(3px)';
        item.style.opacity = '0.4';
      } else {
        item.style.filter = 'blur(0)';
        item.style.opacity = '1';
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
});

// seo final slider
if (document.querySelector(".seo-final")) {
  const seoSwiper = new Swiper(".seo-final", {
    loop: true,
    slidesPerView: 4,        // four cards visible at once
    spaceBetween: 20,        // gap between slides
    navigation: {
      nextEl: ".seo-next",
      prevEl: ".seo-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 15 },
      640: { slidesPerView: 2, spaceBetween: 15 },
      992: { slidesPerView: 3, spaceBetween: 20 },
      1200: { slidesPerView: 4, spaceBetween: 20 },
    },
  });
}



// review slider
// ===============================
// Review Slider Init Function
// ===============================
function initSwiper() {
  new Swiper(".review-slider", {
    loop: true,
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 30,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    breakpoints: {
      768: { slidesPerView: 1, spaceBetween: 40 },
      992: { slidesPerView: 1, spaceBetween: 50 },
    },
  });

 
}


// b2b read more
document.addEventListener("DOMContentLoaded", () => {
  const readMoreBtn = document.getElementById("readMoreBtn");
  const extraCards = document.querySelectorAll(".extra-card");
  let expanded = false;

  readMoreBtn.addEventListener("click", () => {
    extraCards.forEach((card) => {
      card.style.display = expanded ? "none" : "block";
    });

    readMoreBtn.textContent = expanded ? "Read more" : "Show less";
    expanded = !expanded;
  });
});

//job vacancies
document.getElementById("showMoreBtn").addEventListener("click", function (e) {
  e.preventDefault();

  // Get all hidden jobs
  const hiddenJobs = document.querySelectorAll(".hidden-job");

  hiddenJobs.forEach(job => {
    job.style.display = "block"; // Show them
  });

  // Optionally hide the button after showing
  this.style.display = "none";
});
