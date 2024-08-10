document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 0;
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slides .catchy').length;

    function showSlide(index) {
        const slideWidth = document.querySelector('.slides .catchy').clientWidth;
        slides.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlide(slideIndex);
    }

    function startAutoSlide() {
        setInterval(nextSlide, 3000); // Change slides every 7 seconds
    }

    // Initialize slider
    showSlide(slideIndex);
    startAutoSlide();

    // Handle window resize
    window.addEventListener('resize', () => showSlide(slideIndex));
});
