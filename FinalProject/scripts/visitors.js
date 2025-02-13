// Hamburger button functionality
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('#animate');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('visitor-form');
    const timestampInput = document.getElementById('timestamp');

    // Set timestamp when the form is loaded
    function setTimestamp() {
        const now = new Date();
        timestampInput.value = now.toISOString();
    }

    // Validate required selects with disabled option
    function validateSelects() {
        const selects = form.querySelectorAll('select[required]');
        let isValid = true;

        selects.forEach(select => {
            if (select.value === '') {
                select.classList.add('invalid');
                isValid = false;
            } else {
                select.classList.remove('invalid');
            }
        });

        return isValid;
    }

    // Form submission handler
    form.addEventListener('submit', function (e) {
        setTimestamp();

        if (!validateSelects()) {
            e.preventDefault(); // Stop form submission if selects are invalid
            alert('Please select an option in all required fields.');
        }
    });

    // Optional: Remove invalid class on change
    form.addEventListener('change', function (e) {
        if (e.target.tagName === 'SELECT' && e.target.classList.contains('invalid')) {
            e.target.classList.remove('invalid');
        }
    });

    // Set the timestamp when the page loads
    setTimestamp();
});