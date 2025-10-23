 console.log("Script loaded and running");
/// Wait until DOM is fully loaded
//document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // 1. Custom Horizontal Slider
  // ===============================
//   const slider = document.getElementById("slider");
//   if (slider) {
//     let currentIndex = 0;

//     function scrollSlider(direction) {
//       const cardWidth =
//         slider.querySelector(".col-md-6").offsetWidth + 20; // include gap
//       currentIndex = Math.min(
//         Math.max(currentIndex + direction, 0),
//         slider.children.length - 2 // adjust for visible cards
//       );
//       slider.scrollTo({
//         left: currentIndex * cardWidth,
//         behavior: "smooth",
//       });
//     }

//     // Auto-scroll on mouse wheel
//     slider.addEventListener("wheel", (e) => {
//       e.preventDefault();
//       scrollSlider(e.deltaY > 0 ? 1 : -1);
//     });
//   }
// });
  // ===============================
  // 2. Swipers
  // ===============================

  // Home page Swiper (autoplay, pagination only)
  if (document.querySelector(".home-swiper")) {
    const homeSwiper = new Swiper(".home-swiper", {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".home-swiper .swiper-pagination",
        clickable: true,
      },
        navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
      slidesPerView: 3,
      breakpoints: {
         0: {             // ✅ For mobile screens
        slidesPerView: 1,
        spaceBetween: 10,
      },
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
      loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
      

      navigation: {
        nextEl: ".partner-next",
      prevEl: ".partner-prev",
      },
      breakpoints: {
        1200: { slidesPerView: 5, spaceBetween: 30 },
        992: { slidesPerView: 5 },
        768: { slidesPerView: 3 },
        576: { slidesPerView: 2 },
        0: { slidesPerView: 2, spaceBetween: 10 },
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
// Loading footer dynamically
loadHTML("footer.html", "footer", () => {
  console.log("Footer loaded!");
  initBookForm(); // Attach the form event listener now
});

loadHTML("ourwork.html", "ourwork", initOurWork);

loadHTML("expert.html", "expert");
loadHTML("rating.html", "rating", initSwiper);

// ✅ Load carousel + initialize Swiper only after injection
loadHTML("carousel.html", "carousel", initPartnerSwiper);



// !-- OUR WORKS SLIDER SECTION --

function initOurWork() {
  const workData = [
    { category: "all", title: "All-cases", desc: " project example 1", img: "Images/wsocial.jpg", views: "517507", likes: "7701", reposts: "2530", comments: "2343" },
    { category: "B2B", title: "B2B Project 2", desc: "B2B project example 2", img: "Images/wb2b.jpg", views: "431200", likes: "6700", reposts: "1900", comments: "1600" },
    { category: "video-edit", title: "Video Editing Project 1", desc: "video-edit project example", img: "Images/wvideo.jpg", views: "420891", likes: "6890", reposts: "2230", comments: "2104" },
    { category: "E-commerce", title: "E-commerce Project 1", desc: "E-commerce project", img: "Images/wecommerce.jpg", views: "398123", likes: "6405", reposts: "1921", comments: "1750" },
    { category: "appdev", title: "Appdev Project 1", desc: "appdev project", img: "Images/wappdev.jpg", views: "512000", likes: "7021", reposts: "2100", comments: "1850" },
    { category: "Gaming", title: "Gaming Project 1", desc: "Gaming project", img: "Images/wgaming.jpg", views: "609000", likes: "8900", reposts: "3200", comments: "2500" },
    { category: "email", title: "Email Project 1", desc: "email project", img: "Images/wemail.jpg", views: "350000", likes: "6000", reposts: "1800", comments: "1500" },
    { category: "iGaming", title: "iGaming Project 1", desc: "iGaming project", img: "Images/wgaming.jpg", views: "290000", likes: "4500", reposts: "1200", comments: "1100" },
    { category: "IT & Software", title: "IT Project 1", desc: "IT & Software project", img: "Images/wsoftware.jpg", views: "410000", likes: "6800", reposts: "2000", comments: "1700" },
    { category: "podcast", title: "podcast Project 1", desc: "podcast project", img: "Images/wpodcast.jpg", views: "560000", likes: "7500", reposts: "2400", comments: "2000" },
    { category: "seo", title: "Seo Project 1", desc: "seo project", img: "Images/wseo.jpg", views: "470000", likes: "7100", reposts: "2100", comments: "1800" },
    { category: "uiux", title: "Ui-Ux Project 1", desc: "ui-ux project", img:"Images/wuiux.jpg", views: "300000", likes: "5000", reposts: "1500", comments: "1300" },
  ];

  let currentIndex = 0;
  let filteredData = [...workData];
  const sliderInner = document.getElementById("slider-inner");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  function renderSlides(data) {
    if (!sliderInner) return;
    sliderInner.innerHTML = "";
    data.forEach(item => {
      const slide = document.createElement("div");
      slide.classList.add("work-slide");
      slide.innerHTML = `
        <div class="work-media"><img src="${item.img}" alt="${item.title}"></div>
        <div class="work-content">
          <div class="work-title">${item.title}</div>
          <div class="work-desc">${item.desc}</div>
          <div class="work-stats">
            <div class="stat-box"><div class="stat-value">${item.views}</div><div class="stat-label">Views</div></div>
            <div class="stat-box"><div class="stat-value">${item.likes}</div><div class="stat-label">Likes</div></div>
            <div class="stat-box"><div class="stat-value">${item.reposts}</div><div class="stat-label">Reposts</div></div>
            <div class="stat-box"><div class="stat-value">${item.comments}</div><div class="stat-label">Comments</div></div>
          </div>
          <button class="work-btn">Read More</button>
        </div>
      `;
      sliderInner.appendChild(slide);
    });
    updateSlider();
  }

  function updateSlider() {
    if (!sliderInner) return;
    sliderInner.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % filteredData.length;
      updateSlider();
    });
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + filteredData.length) % filteredData.length;
      updateSlider();
    });
  }

  const filterButtons = document.querySelectorAll(".tag-btn");
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.category;
        filteredData = category === "all" ? [...workData] : workData.filter(w => w.category === category);
        currentIndex = 0;
        renderSlides(filteredData);
      });
    });
  }

  // Touch swipe support
  let startX = 0;
  if (sliderInner) {
    sliderInner.addEventListener("touchstart", e => { startX = e.touches[0].clientX; });
    sliderInner.addEventListener("touchend", e => {
      let endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) { currentIndex = (currentIndex + 1) % filteredData.length; updateSlider(); }
      if (endX - startX > 50) { currentIndex = (currentIndex - 1 + filteredData.length) % filteredData.length; updateSlider(); }
    });
  }

  renderSlides(filteredData);
}


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
// document.addEventListener("DOMContentLoaded", () => {
//   const readMoreBtn = document.getElementById("readMoreBtn");
//   const extraCards = document.querySelectorAll(".extra-card");
//   let expanded = false;

//   readMoreBtn.addEventListener("click", () => {
//     extraCards.forEach((card) => {
//       card.style.display = expanded ? "none" : "block";
//     });

//     readMoreBtn.textContent = expanded ? "Read more" : "Show less";
//     expanded = !expanded;
//   });
// });

//job vacancies
// const showMoreBtn = document.getElementById("showMoreBtn");
// if (showMoreBtn) {
//   showMoreBtn.addEventListener("click", function (e) {
//     e.preventDefault();

//     // Get all hidden jobs
//     const hiddenJobs = document.querySelectorAll(".hidden-job");

//     hiddenJobs.forEach(job => {
//       job.style.display = "block"; // Show them
//     });

//     // Optionally hide the button after showing
//     this.style.display = "none";
//   });
// }



// document.addEventListener("DOMContentLoaded", () => {
//   const exploreBtn = document.getElementById("exploreBtn");
//   const extraCards = document.querySelectorAll(".extra-team"); // selects col-md-4 wrapper
//   let expanded = false;

//   exploreBtn.addEventListener("click", () => {
//     extraCards.forEach(col => {
//       col.style.display = expanded ? "none" : "flex"; // flex for col wrapper
//     });

//     exploreBtn.textContent = expanded ? "Explore Team" : "Show Less";
//     expanded = !expanded;
//   });
// });






// ===============================
// Book A Call Form Submission
// ===============================
function initBookForm() {
  const form = document.getElementById("bookForm");
  const submitBtn = document.getElementById("bookSubmitBtn");

  if (!form) return;

  const API_BASE = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000"
    : "https://your-production-backend.com";

  // feedback element
  let feedback = document.createElement("p");
  feedback.id = "formFeedback";
  feedback.style.marginTop = "10px";
  feedback.style.fontWeight = "500";
  feedback.style.transition = "opacity 0.5s ease";
  form.appendChild(feedback);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot
    if (document.getElementById("website").value) return;

    const payload = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    if (!payload.firstName || !payload.email) {
      feedback.textContent = "Please enter your first name and email.";
      feedback.style.color = "red";
      hideFeedbackAfterDelay(feedback);
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    feedback.textContent = "";

    try {
      const res = await fetch(`${API_BASE}/api/forms/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        feedback.textContent = data.message || "Failed to send. Please try again.";
        feedback.style.color = "red";
      } else {
        feedback.textContent = data.message || "Thank you! We'll get back to you soon.";
        feedback.style.color = "green";
        form.reset();
      }

      hideFeedbackAfterDelay(feedback);
    } catch (err) {
      console.error(err);
      feedback.textContent = "Network error — please try again later.";
      feedback.style.color = "red";
      hideFeedbackAfterDelay(feedback);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  function hideFeedbackAfterDelay(element) {
    setTimeout(() => {
      element.style.opacity = "0";
      setTimeout(() => {
        element.textContent = "";
        element.style.opacity = "1";
      }, 500);
    }, 5000);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js loaded successfully");

  // 1️⃣ B2B Read More
  const readMoreBtn = document.getElementById("readMoreBtn");
  const extraCards = document.querySelectorAll(".extra-card");
  let expanded = false;

  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", () => {
      extraCards.forEach(card => {
        card.style.display = expanded ? "none" : "block";
      });
      readMoreBtn.textContent = expanded ? "Read more" : "Show less";
      expanded = !expanded;
    });
  }

  // 2️⃣ Show More Jobs
  const showMoreBtn = document.getElementById("showMoreBtn");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const hiddenJobs = document.querySelectorAll(".hidden-job");
      hiddenJobs.forEach(job => job.style.display = "block");
      showMoreBtn.style.display = "none";
    });
  }

  // 3️⃣ Extra Vacancies
  const btnVacancies = document.querySelector(".btn-all-vacancies");
  const extraJobs = document.querySelectorAll(".extra-job");
  if (btnVacancies) {
    btnVacancies.addEventListener("click", (e) => {
      e.preventDefault();
      extraJobs.forEach(job => job.style.display = "block");
      btnVacancies.style.display = "none";
    });
  }

  // 4️⃣ Career Form
  const form = document.getElementById("careerForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("🚀 Career form submit intercepted!");

      const formData = Object.fromEntries(new FormData(form).entries());

      try {
        const response = await fetch("http://localhost:5000/api/career", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log("📥 Server response:", data);

        if (response.ok) {
          alert("✅ Application submitted successfully!");
          form.reset();
        } else {
          alert("❌ " + (data.message || "Failed to submit form."));
        }
      } catch (err) {
        console.error("❌ Error submitting form:", err);
        alert("⚠️ Something went wrong.");
      }
    });
  }

 // 5️⃣ Explore Team Section
  const exploreBtn = document.getElementById("exploreBtn");
  const extraTeamCards = document.querySelectorAll(".extra-team");
  let expandedExplore = false;

  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      extraTeamCards.forEach(col => {
        col.style.display = expandedExplore ? "none" : "flex";
      });
      exploreBtn.textContent = expandedExplore ? "Explore Team" : "Show Less";
      expandedExplore = !expandedExplore;
    });
  }
   // 6️⃣ Index Explore Section
  const indexExploreBtn = document.getElementById("indexexplore-btn");
  if (indexExploreBtn) {
    indexExploreBtn.addEventListener("click", function () {
      const hiddenCards = document.getElementById("hidden-team");
      if (hiddenCards.style.display === "none" || hiddenCards.style.display === "") {
        hiddenCards.style.display = "flex";
        hiddenCards.style.flexWrap = "wrap";
        this.textContent = "Show Less";
      } else {
        hiddenCards.style.display = "none";
        this.textContent = "Explore Team";
      }
    });
  }
// 7️⃣ AdBorn Experience Slider (Unique)
const expTrack = document.querySelector("#adbornExpSlider .exp-slide-track");
const expSlides = document.querySelectorAll("#adbornExpSlider .exp-slide-card");
const expPrev = document.getElementById("expPrev");
const expNext = document.getElementById("expNext");

let expIndex = 0;

// ✅ Run only if the slider exists on this page
if (expTrack && expSlides.length > 0) {
  function showExpSlide(index) {
    expTrack.style.transform = `translateX(-${index * 100}%)`;
  }

  expNext?.addEventListener("click", () => {
    expIndex = (expIndex + 1) % expSlides.length;
    showExpSlide(expIndex);
  });

  expPrev?.addEventListener("click", () => {
    expIndex = (expIndex - 1 + expSlides.length) % expSlides.length;
    showExpSlide(expIndex);
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    expIndex = (expIndex + 1) % expSlides.length;
    showExpSlide(expIndex);
  }, 5000);
}

});




