



document.addEventListener("DOMContentLoaded", () => {

  const IMAGES = [
  "./aac-images/aac-board/aac-bastyqs.jpg",
  "./aac-images/aac-board/aac-pr.jpg",
  "./aac-images/aac-board/aac-hr.jpg",
  "./aac-images/aac-board/aac-event.jpg",
];

  const SLIDE_DURATION = 1600;
  const MAX_PRELOAD_TIME = 7000;
  const MIN_SHOW = 600;

  const preloader = document.getElementById("preloader");
  const slideshow = preloader.querySelector(".slideshow");
  const progressBar = document.getElementById("progressBar");
  const statusText = document.getElementById("statusText");
  const skipBtn = document.getElementById("skipBtn");
  const siteContent = document.getElementById("site-content");

  const slidesPRELOAD = IMAGES.map((src, i) => {
    const img = document.createElement("img");
    img.className = "slide";
    img.alt = "";
    img.dataset.index = i;
    slideshow.appendChild(img);
    return img;
  });

  let loaded = 0;
  let index = 0;
  let interval;
  const startTime = Date.now();

  function updateProgress() {
    const pct = Math.round((loaded / IMAGES.length) * 100);
    progressBar.style.width = pct + "%";
    statusText.textContent = `Loading — ${pct}%`;
  }

  function preload() {
    return new Promise((resolve) => {
      IMAGES.forEach((url, i) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          slidesPRELOAD[i].src = url;
          loaded++;
          updateProgress();
          if (loaded === IMAGES.length) resolve();
        };
        img.src = url;
      });

      setTimeout(resolve, MAX_PRELOAD_TIME);
    });
  }

  function startSlideshow() {
    slidesPRELOAD[0].classList.add("active");
    interval = setInterval(() => {
      slidesPRELOAD[index].classList.remove("active");
      index = (index + 1) % slidesPRELOAD.length;
      slidesPRELOAD[index].classList.add("active");
    }, SLIDE_DURATION);
  }

  function stopSlideshow() {
    clearInterval(interval);
  }

  function hidePreloader() {
    stopSlideshow();
    const elapsed = Date.now() - startTime;
    const wait = Math.max(0, MIN_SHOW - elapsed);

    setTimeout(() => {
      preloader.style.transition = "opacity 0.4s ease";
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.remove();
        siteContent.style.visibility = "visible";
      }, 420);
    }, wait);
  }

  skipBtn.addEventListener("click", hidePreloader);

  preload().then(() => {
    startSlideshow();

    if (document.readyState === "complete") {
      setTimeout(hidePreloader, 800);
    } else {
      window.addEventListener("load", () => {
        setTimeout(hidePreloader, 500);
      });
    }

    setTimeout(hidePreloader, MAX_PRELOAD_TIME + 1500);
  });


  // SLIDER SCRIPTS
  const buttonPrev = document.querySelector(".slider-section__prev-button");
  const buttonNext = document.querySelector(".slider-section__next-button");

  const slides = document.querySelectorAll(".background-swiper .swiper-slide");

  // Content Preparation

  const titles = [],
    texts = [];

  slides.forEach((slide) => {
    const title = slide.dataset.title.trim() || "";
    const desc = slide.dataset.desc.trim() || "";

    titles.push(title);
    texts.push(desc);
  });

  // Buttons State Update

  const updateState = (swiper) => {
    const { isBeginning, isEnd } = swiper;

    isBeginning
      ? buttonPrev.classList.add("disabled")
      : buttonPrev.classList.remove("disabled");
    isEnd
      ? buttonNext.classList.add("disabled")
      : buttonNext.classList.remove("disabled");
  };

  // Background Slider Initialization

  const backgroundSwiper = new Swiper(".background-swiper", {
    slidesPerView: "auto",
    spaceBetween: 45,
    centeredSlides: true,
    initialSlide: 2,
    speed: 800,
    navigation: {
      prevEl: buttonPrev,
      nextEl: buttonNext
    },
    on: {
      init: function () {
        updateState(this);
      },
      slideChange: function () {
        updateState(this);
      }
    }
  });

  // Centered Slider Initialization

  const centerSwiper = new Swiper(".centered-swiper", {
    slidesPerView: 1,
    loop: true,
    initialSlide: 2,
    speed: 800
  });

  // Sliders Interactions

  const title = document.getElementById("slideTitle");
  const text = document.getElementById("slideText");

  backgroundSwiper.on("slideChange", function () {
    const index = this.realIndex;

    centerSwiper.slideToLoop(index, 600);

    title.classList.add("hidden-out");
    text.classList.add("hidden-out");

    setTimeout(() => {
      title.classList.remove("hidden-out");
      text.classList.remove("hidden-out");

      title.textContent = titles[index];
      text.textContent = texts[index];

      title.classList.add("hidden-in");
      text.classList.add("hidden-in");

      setTimeout(() => {
        title.classList.remove("hidden-in");
        text.classList.remove("hidden-in");
      }, 300);
    }, 300);
  });
});
