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


import { places } from '../data/places.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".grid-container");

    places.forEach(place => {
        // Create article (card)
        const card = document.createElement("article");
        card.classList.add("card");

        // Create and add title
        const title = document.createElement("h2");
        title.textContent = place.name;
        card.appendChild(title);

        // Create and add figure & image
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = place.image;
        image.alt = place.alt;
        figure.appendChild(image);
        card.appendChild(figure);

        // Create and add address
        const address = document.createElement("address");
        address.textContent = place.address;
        card.appendChild(address);

        // Create and add description
        const description = document.createElement("p");
        description.textContent = place.description;
        card.appendChild(description);

        // Create and add button
        const button = document.createElement("button");
        button.textContent = "Learn More";
        card.appendChild(button);

        // Append card to the grid container
        gridContainer.appendChild(card);
    });
});