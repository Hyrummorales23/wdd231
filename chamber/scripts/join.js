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

document.addEventListener("DOMContentLoaded", function () {
    // Autofill timestamp field
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Form validation
    const form = document.getElementById("membershipForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                alert("Please fill out all required fields correctly.");
            }
        });
    }

    // Modal functionality
    const modalLinks = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    modalLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const modalId = this.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const modal = this.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    // Close modal when clicking outside
    document.querySelectorAll("dialog").forEach(modal => {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.close();
            }
        });

        // Close modal with Escape key
        modal.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                modal.close();
            }
        });
    });

    // Animation for membership cards on page load
    const membershipCards = document.querySelectorAll(".membership-card");
    membershipCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("show");
        }, index * 300);
    });
});

