"use strict";
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

///////////////////////////////////////
// Modal window

const header = document.querySelector(".header");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  // e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Smooth Scrolling

btnScrollTo.addEventListener("click", function (e) {
  // Scrolling - Modern way
  section1.scrollIntoView({ behavior: "smooth" });

  // Old Way
  /*
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset, 
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  */

  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll(X/Y)', window.pageXOffset, window.pageYOffset);

  // console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
});

///////////////////////////////////////////////// Page Navigation

// Event Delegations:
// 1. Add event listener to common parent elements
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

// Tabbed Component - Operations Section
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Remove Active tab and content
  function removeActive(parent, rem) {
    parent.forEach((e) => e.classList.remove(rem));
  }

  // Guard Clause
  if (!clicked) return;

  // Active Tab
  removeActive(tabs, "operations__tab--active");
  clicked.classList.add("operations__tab--active");

  // Active Content Area
  removeActive(tabsContent, "operations__content--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Menu fade animation
const handleHover = function (o) {
  return function (e) {
    if (e.target.classList.contains("nav__link")) {
      const link = e.target;
      const siblings = link.closest(".nav").querySelectorAll(".nav__link");
      const logo = link.closest(".nav").querySelector("img");

      siblings.forEach((el) => {
        if (el !== link) el.style.opacity = o;
      });
      logo.style.opacity = o;
    }
  };
};

nav.addEventListener("mouseover", handleHover(0.5));

nav.addEventListener("mouseout", handleHover(1));

// Sticky Navigation: Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Revealing Elements on Scroll
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy Loading Images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Reviews Slider Component
const slider = function () {
  const allSlides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = allSlides.length;

  // Functions
  const createDots = function () {
    allSlides.forEach(function (s, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class ="dots__dot" data-slide = "${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    allSlides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Go to the next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.2) translateX(-1200px)";
// slider.style.overflow = "visible";

/*
// Cookie message

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality.';
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

header.append(message);
// header.prepend(message.cloneNode(true)); // clone an element

// Close cookie message

document.querySelector('.btn--close--cookie').addEventListener('click', function() {
  message.remove();
})
*/
