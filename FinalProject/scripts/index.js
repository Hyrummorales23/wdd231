// Hamburger button functionality
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('#animate');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

// Explore Button
document.getElementById("joinButton").addEventListener("click", () => {
    window.location.href = "visitors.html";
});

// Function to capitalize each word in a string
const capitalizeWords = (str) => {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

// Fetch and display current weather
const fetchCurrentWeather = async () => {
    const apiKey = "9b8a7dfd9edf8f6d0a1089c957064ff4";
    const lat = "17.145188962500306";
    const lon = "-89.53000415245198";
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(currentWeatherUrl);
        const data = await response.json();

        // Update the weather information on the page
        document.getElementById("current-temp").textContent = Math.round(data.main.temp);
        document.getElementById("current-description").textContent = capitalizeWords(
            data.weather.map(event => event.description).join(", ")
        );
        document.getElementById("current-high").textContent = Math.round(data.main.temp_max);
        document.getElementById("current-low").textContent = Math.round(data.main.temp_min);
        document.getElementById("current-humidity").textContent = data.main.humidity;
        document.getElementById("current-sunrise").textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        document.getElementById("current-sunset").textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        // Get the weather icon and update the image source
        const weatherIconCode = data.weather[0].icon;
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
        const weatherIconElement = document.getElementById("current-icon");
        weatherIconElement.src = weatherIconUrl;
        weatherIconElement.alt = data.weather[0].description;
        weatherIconElement.style.display = "block";
    } catch (error) {
        console.error("Error fetching current weather:", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    fetch("data/gallery.json")
        .then(response => response.json())
        .then(data => {
            const gallery = data.gallery;
            const cardContainer = document.getElementById("cardContainer");

            // Shuffle and select 3 random items
            const shuffled = gallery.sort(() => 0.5 - Math.random()).slice(0, 3);

            shuffled.forEach(item => {
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
// Initialize weather data on page load
document.addEventListener("DOMContentLoaded", fetchCurrentWeather);


document.addEventListener("DOMContentLoaded", function () {
    const visitMessage = document.createElement("div");
    visitMessage.id = "visit-message";
    visitMessage.style.position = "fixed";
    visitMessage.style.top = "20px";
    visitMessage.style.left = "50%";
    visitMessage.style.transform = "translateX(-50%)";
    visitMessage.style.padding = "10px 20px";
    visitMessage.style.backgroundColor = "rgba(0, 100, 0, 0.9)";
    visitMessage.style.color = "white";
    visitMessage.style.borderRadius = "10px";
    visitMessage.style.fontSize = "16px";
    visitMessage.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";
    visitMessage.style.display = "none"; // Hidden by default
    document.body.appendChild(visitMessage);

    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
        visitMessage.innerText = "Welcome to Tikal National Park! Enjoy your first visit!";
    } else {
        visitMessage.innerText = "Welcome back! We hope you enjoy exploring more about Tikal.";
    }

    // Show message for 3 seconds
    visitMessage.style.display = "block";
    setTimeout(() => {
        visitMessage.style.display = "none";
    }, 3000);

    // Store the current visit date
    localStorage.setItem("lastVisit", new Date().toISOString());
});