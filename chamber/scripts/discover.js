import { places } from '../data/places.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("places-container");
    const messageContainer = document.getElementById("visitor-message");

    // Handle Visitor Message
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();

    if (!lastVisit) {
        messageContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysElapsed = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
        messageContainer.textContent = daysElapsed < 1
            ? "Back so soon! Awesome!"
            : `You last visited ${daysElapsed} ${daysElapsed === 1 ? "day" : "days"} ago.`;
    }
    localStorage.setItem("lastVisit", currentVisit);

    // Populate Places Grid with Lazy Loading
    places.forEach(place => {
        const card = document.createElement("article");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = place.name;

        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.dataset.src = place.image; // Lazy load
        image.alt = place.alt;
        image.classList.add("lazy");
        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = place.address;

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("button");
        button.textContent = "Learn More";

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        gridContainer.appendChild(card);
    });

    // Lazy Loading Functionality
    const lazyLoadImages = document.querySelectorAll("img.lazy");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyLoadImages.forEach(img => observer.observe(img));
});

// Update year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Updated: ${document.lastModified}`;

// Hamburger Menu Functionality
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('#animate');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});