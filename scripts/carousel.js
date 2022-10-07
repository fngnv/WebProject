let slideIndex = 0;
showSlides();

function showSlides () {
    let cSlides = document.getElementsByClassName('carouselSlide');

    for(let i = 0; i < cSlides.length; i++) {
        cSlides[i].style.display = 'none';
    }
    slideIndex ++;

    if (slideIndex > cSlides.length) {
        slideIndex = 1;
    }

    cSlides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 5000);
}