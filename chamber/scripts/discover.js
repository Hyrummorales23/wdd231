// Update year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Updated: ${document.lastModified}`;

// Hamburger button functionality
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('#animate');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

document.addEventListener("DOMContentLoaded", () => {
    const messageContainer = document.getElementById("visitor-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();

    if (!lastVisit) {
        messageContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysElapsed = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysElapsed < 1) {
            messageContainer.textContent = "Back so soon! Awesome!";
        } else {
            messageContainer.textContent = `You last visited ${daysElapsed} ${daysElapsed === 1 ? "day" : "days"} ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);
});
