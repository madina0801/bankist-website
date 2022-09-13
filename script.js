'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  // e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

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
})





// THEORY LECTURES

/*
const header = document.querySelector('.header');

const allButtons = document.getElementsByTagName('button'); // returns automatically updated collection of html elements

// Creating and inserting elements
// .insertAdjacentHTML

// Cookie message

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality.';
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

header.append(message);
// header.prepend(message.cloneNode(true)); // clone an element

// Delete elements
document.querySelector('.btn--close--cookie').addEventListener('click', function() {
  message.remove();
})

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '110%';

console.log(getComputedStyle(message).color);

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// console.log(message.style.height);

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes. You can't access not-standard HTML properties
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.alt);
console.log(logo.className);

// How to change properties values
logo.alt = 'Minimalist logo';
console.log(logo.alt);

// How to access not standard HTML properties
// console.log(logo.getAttribute('designer'));

// Data Attributes data-
console.log(logo.dataset.versionNumber);

// Classes
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();

// Change class name. Don't use it, cause it overwrites all of the existing classes and allows us have only one class on any element

// logo.className = 'name';
// console.log(logo.className); // name
*/