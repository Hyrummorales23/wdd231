// Update year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Updated: ${document.lastModified}`;


document.addEventListener('DOMContentLoaded', function () {
    // Retrieve form data from URL parameters
    const params = new URLSearchParams(window.location.search);

    // Function to get form data from parameters
    function getFormData(paramName) {
        return params.has(paramName) ? params.get(paramName) : '';
    }

    // Populate form details
    const formDetails = document.getElementById('form-details');
    formDetails.innerHTML = `
        <li><strong>First Name:</strong> ${getFormData('first-name')}</li>
        <li><strong>Last Name:</strong> ${getFormData('last-name')}</li>
        <li><strong>Email:</strong> ${getFormData('email')}</li>
        <li><strong>Mobile Phone:</strong> ${getFormData('phone')}</li>
        <li><strong>Business/Organization:</strong> ${getFormData('organization')}</li>
        <li><strong>Membership Level:</strong> ${getFormData('membership')}</li>
        <li><strong>Date & Time:</strong> ${getFormData('timestamp')}</li>
    `;
});
