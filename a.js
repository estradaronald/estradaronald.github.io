/*=============== MENU SHOW ===============*/

const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
   navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
   });
}

if (navClose) {
   navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
   });
}


/*=============== CLOSE MENU WHEN LINK IS CLICKED ===============*/

const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach(link => {
   link.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
   });
});


/*=============== HEADER SHADOW ===============*/

const header = document.getElementById("header");

function scrollHeader() {
   if (window.scrollY >= 50) {
      header.classList.add("shadow-header");
   } else {
      header.classList.remove("shadow-header");
   }
}

window.addEventListener("scroll", scrollHeader);


/*=============== SECTION REVEAL ===============*/

const sections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver(
   (entries) => {

      entries.forEach(entry => {

         if (entry.isIntersecting) {

            entry.target.classList.add("section-visible");

         }

      });

   },
   {
      threshold: 0.10
   }
);

sections.forEach(section => {
   sectionObserver.observe(section);
});


/*=============== MAKE HOME VISIBLE IMMEDIATELY ===============*/

const homeSection = document.getElementById("home");

if (homeSection) {
   homeSection.classList.add("section-visible");
}


/*=============== ACTIVE NAV LINK ===============*/

const sectionElements = document.querySelectorAll(
   "section[id]"
);

function updateActiveLink() {

   const scrollPosition = window.scrollY + 150;

   sectionElements.forEach(section => {

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
         scrollPosition >= sectionTop &&
         scrollPosition < sectionTop + sectionHeight
      ) {

         navLinks.forEach(link => {
            link.classList.remove("active-link");
         });

         const activeLink = document.querySelector(
            `.nav__link[href="#${sectionId}"]`
         );

         if (activeLink) {
            activeLink.classList.add("active-link");
         }

      }

   });
}

window.addEventListener("scroll", updateActiveLink);

window.addEventListener("load", updateActiveLink);


/*=============== TYPED TEXT ===============*/

const typedText = document.getElementById("typed-text");

if (typedText && typeof Typed !== "undefined") {

   new Typed("#typed-text", {
      strings: [
         "Aspiring Data Engineer",
         "Python & SQL Learner",
         "ETL & Data Pipeline Builder",
         "Database Enthusiast"
      ],

      typeSpeed: 60,

      backSpeed: 35,

      backDelay: 1800,

      loop: true
   });

}


/*=============== SCROLL UP ===============*/

const scrollUp = document.getElementById("scroll-up");

function showScrollUp() {

   if (window.scrollY >= 500) {
      scrollUp.classList.add("show-scroll");
   } else {
      scrollUp.classList.remove("show-scroll");
   }

}

window.addEventListener("scroll", showScrollUp);


/*=============== INITIALIZE ===============*/

document.addEventListener("DOMContentLoaded", () => {

   scrollHeader();

   showScrollUp();

   updateActiveLink();

});
