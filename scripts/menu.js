/*
*
* Tekijä: Vera F
* 28.9.2022
* */
let menuIcon = document.getElementById('iconID');

menuIcon.addEventListener('click', function  () {
    let mainNavigation = document.getElementById('mainNav');

    if (mainNavigation.className === 'topnav') {
        mainNavigation.className += ' narrow';
    } else {
        mainNavigation.className = 'topnav';
    }
})

/*
const navbar = document.querySelector('nav');
const picHeaderMainPg = document.getElementById('mainPageHeader');
const headerNotMainPg = document.getElementsByClassName('pageHeader');
let options = {};

if (picHeaderMainPg === null) {
    options = {
        rootMargin: '-50px 0px 0px 0px'
    }
    createObserver(headerNotMainPg, options);
} else {
    options = {
        rootMargin: '-130px 0px 0px 0px'
    }
    createObserver(picHeaderMainPg, options);
}

function createObserver (toObserve, options) {
    const sectionObserver = new IntersectionObserver(function (entries, sectionObserver) {
        entries.forEach((entry) => {
            if(!entry.isIntersecting) {
                navbar.classList.add('topnav-scrolled');
            } else {
                navbar.classList.remove('topnav-scrolled');
            }
        })
    }, options);
    sectionObserver.observe(toObserve);
}*/


