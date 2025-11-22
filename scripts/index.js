document.addEventListener("DOMContentLoaded", () => {

  const slidesPRE = document.querySelectorAll(".slide");
    let index = 0;

    const interval = 120; // CHANGE SPEED HERE (ms)

    function showNext() {
        slidesPRE.forEach((s, i) => s.style.opacity = i === index ? "1" : "0");
        index = (index + 1) % slidesPRE.length;
    }

    setInterval(showNext, interval);
    showNext();

    // Remove preloader when everything loads
    window.onload = () => {
        setTimeout(() => {
            document.getElementById("preloader").style.opacity = "0";
            document.getElementById("preloader").style.pointerEvents = "none";
        }, 600); // Delay removing if needed
    };

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
