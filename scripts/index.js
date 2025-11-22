// Array of images for slideshow


const images = [
  "/aac-images/aac-slideshow/slide1.jpg",
  "/aac-images/aac-slideshow/slide2.jpg",
  "/aac-images/aac-slideshow/slide3.jpg",
  "/aac-images/aac-slideshow/slide4.jpg",
  "/aac-images/aac-slideshow/slide5.jpg",
  "/aac-images/aac-slideshow/slide6.jpg",
  "/aac-images/aac-slideshow/slide7.jpg",
  "/aac-images/aac-slideshow/slide8.jpg",
  "/aac-images/aac-slideshow/slide9.jpg",
  "/aac-images/aac-slideshow/slide10.jpg",
];

const preloaderImg = document.getElementById("preloader-img");
let index = 0;

const loadedImages = [];
let imagesLoadedCount = 0;

images.forEach(src => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    imagesLoadedCount++;
    loadedImages.push(img);
    
    // Once all images are loaded, start slideshow
    if (imagesLoadedCount === images.length) {
      startSlideshow();
    }
  };
});
function startSlideshow() {
  // Set first image
  preloaderImg.src = images[0];

  // Change images rapidly
  const interval = setInterval(() => {
    index = (index + 1) % images.length;
    preloaderImg.src = images[index];
  }, 200); // adjust speed as needed

  // Remove preloader after 3.5 seconds
  setTimeout(() => {
    clearInterval(interval);
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = 0;
    setTimeout(() => {
      preloader.style.display = "none";
      document.getElementById("content").style.display = "block";
      document.body.style.transform = "translateY(10px)";
      document.body.style.animation = "fadeInUp 0.5s ease-out forwards";
    }, 1000); // match CSS transition
  }, 3500);
}





document.addEventListener("DOMContentLoaded", () => {
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
    slidesPerView: 5,
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
