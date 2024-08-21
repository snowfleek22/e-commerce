
let slideIndex = 0;
let slideInterval;
const totalSlides = document.querySelectorAll('.item-info a').length;

function showSlide(index) {
  const slides = document.querySelector('.product-deals');
  const slideWidth = document.querySelector('.item-info').clientWidth;
  slides.style.transition = 'transform 0.5s ease';
  slides.style.transform = `translateX(-${index * slideWidth}px)`;
  
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % totalSlides;
  showSlide(slideIndex);
}

function scrollToAbout() {
  const aboutSection = document.getElementById("about");
  aboutSection.scrollIntoView({behavior: "smooth"});
}
function scrollToContact() {
  const contactSection = document.getElementById("contact");
  contactSection.scrollIntoView({behavior: "smooth"});
}

const x = new Date();
const w = x.getDate();
const y = x.getMonth()+1;
const z = x.getFullYear();
let v = w + "/" + y + "/"+ z; 
const date = document.getElementById('date').innerHTML = v;
