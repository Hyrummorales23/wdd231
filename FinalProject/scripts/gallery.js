// Hamburger button functionality
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('#animate');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("data/gallery.json")
        .then(response => response.json())
        .then(data => {
            const gallery = data.gallery;
            const cardContainer = document.getElementById("cardContainer");

            gallery.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("spotlight-card");

                card.innerHTML = `
                    <h3>${item.name}</h3>
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <p>${item.description}</p>
                `;

                cardContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading gallery data:", error));
});