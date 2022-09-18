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


const stickyNav = function(entries) {
  const [entry] = entries;

  if(!entry.isIntersecting) nav.classList.add('sticky') 
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, 
});
headerObserver.observe(header);














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

/*
// Smooth Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
  // Scrolling - Modern way
  section1.scrollIntoView({behavior: 'smooth'});


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
// })





// Going sideways: siblings. We can only address the direct siblings - the previous and the next one
/*
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// To access all of the siblings
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el) {
  if(el !== h1) el.style.transform = 'scale(0.500)'
})
*/

