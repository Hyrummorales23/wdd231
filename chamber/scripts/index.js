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

// Join Us Today Button
document.getElementById("joinButton").addEventListener("click", () => {
    window.location.href = "join.html";
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
    const lat = "14.640778315638707";
    const lon = "-90.4994444513496";
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

// Fetch and display weather forecast
const fetchWeatherForecast = async () => {
    const apiKey = "9b8a7dfd9edf8f6d0a1089c957064ff4";
    const lat = "14.640778315638707";
    const lon = "-90.4994444513496";
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();

        // Filter the forecast for the next 3 days at 12:00 PM
        const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
        const forecastDays = ["forecast-today", "forecast-tomorrow", "forecast-dayafter"];

        dailyForecasts.forEach((forecast, index) => {
            const dayId = forecastDays[index];
            document.getElementById(`${dayId}-temp`).textContent = Math.round(forecast.main.temp);
            document.getElementById(`${dayId}-desc`).textContent = capitalizeWords(
                forecast.weather.map(event => event.description).join(", ")
            );
        });
    } catch (error) {
        console.error("Error fetching weather forecast:", error);
    }
};

// Fetch and display member spotlight cards
const loadSpotlights = async () => {
    const membersUrl = "data/members.json";

    try {
        const response = await fetch(membersUrl);
        const members = await response.json();

        // Filter members based on membership level
        const spotlightMembers = members.filter(member =>
            ["Gold", "Silver", "Platinum"].includes(member.membershipLevel)
        );

        // Randomly select 2 or 3 members for the spotlight
        const selectedMembers = getRandomMembers(spotlightMembers, 2, 2);

        // Get the container for spotlight cards
        const memberContainer = document.getElementById("memberContainer");
        memberContainer.innerHTML = ""; // Clear any previous cards

        // Create and insert spotlight cards
        selectedMembers.forEach(member => {
            const spotlightCard = createSpotlightCard(member);
            memberContainer.appendChild(spotlightCard);
        });
    } catch (error) {
        console.error("Error loading member data:", error);
    }
};

// Randomly select a specified number of members
const getRandomMembers = (members, min, max) => {
    const numMembers = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = members.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numMembers);
};

// Create a spotlight card for a member
const createSpotlightCard = (member) => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    // Add company logo
    const logo = document.createElement("img");
    logo.src = member.image;
    logo.alt = `${member.name} Logo`;
    card.appendChild(logo);

    // Add company name
    const name = document.createElement("h3");
    name.textContent = member.name;
    card.appendChild(name);

    // Add contact details
    const contactDetails = document.createElement("ul");
    contactDetails.innerHTML = `
        <li><strong>Phone:</strong> ${member.phone}</li>
        <li><strong>Address:</strong> ${member.address}</li>
        <li><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></li>
        <li><strong>Membership Level:</strong> ${member.membershipLevel}</li>
    `;
    card.appendChild(contactDetails);

    return card;
};

// Run all functions once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    fetchCurrentWeather();
    fetchWeatherForecast();
    loadSpotlights();
});