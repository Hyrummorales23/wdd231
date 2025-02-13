document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const displayDiv = document.getElementById('form-data-display');

    const fields = {
        'full-name': 'Full Name',
        'email': 'Email Address',
        'phone': 'Phone Number (Optional)',
        'visit-date': 'Planned Visit Date',
        'visitors': 'Number of Visitors',
        'tour-type': 'Preferred Tour Type',
        'services[]': 'Additional Services',
        'message': 'Message/Comments (Optional)',
        'timestamp': 'Submission Timestamp'
    };

    const optionalFields = ['phone', 'services[]', 'message'];

    let displayHtml = '<ul>';

    Object.keys(fields).forEach((key) => {
        if (urlParams.has(key)) {
            const value = urlParams.getAll(key);

            // Skip optional fields if empty
            if (optionalFields.includes(key) && (value.length === 0 || value[0].trim() === '')) {
                return;
            }

            // Display multiple values for checkboxes
            const displayValue = value.length > 1 ? value.join(', ') : value[0];

            displayHtml += `<li><strong>${fields[key]}:</strong> ${displayValue}</li>`;
        }
    });

    displayHtml += '</ul>';

    displayDiv.innerHTML = displayHtml;

    // Update footer year
    document.getElementById('year').textContent = new Date().getFullYear();
});