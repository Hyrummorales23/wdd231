// Hamburger button functionality
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('#animate');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});
document.addEventListener('DOMContentLoaded', function () {
    // Update footer year
    document.getElementById('year').textContent = new Date().getFullYear();
});