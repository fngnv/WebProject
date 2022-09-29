/*
*
* Tekijä: Vera F
* 28.9.2022
* */
let menuIcon = document.getElementById('iconID');

menuIcon.addEventListener('click', function  () {
    let mainNavigation = document.getElementById('mainNav');

    if (mainNavigation.className == 'topnav') {
        mainNavigation.className += ' narrow';
    } else {
        mainNavigation.className = 'topnav';
    }
})