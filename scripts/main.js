const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: false },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false },
];

// Populate courses dynamically
function renderCourses(filter = 'all') {
    const courseCards = document.getElementById('course-cards');
    courseCards.innerHTML = '';
    const filteredCourses = courses.filter(
        course => filter === 'all' || course.subject === filter
    );
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        if (course.completed) card.classList.add('completed');
        card.innerHTML = `
        <h3>${course.subject} ${course.number}: ${course.title}</h3>
        <p>Credits: ${course.credits}</p>
        <span class="status ${course.completed ? 'completed' : 'in-progress'}">
          ${course.completed ? 'Completed' : 'In Progress'}
        </span>
      `;
        courseCards.appendChild(card);
    });
    updateTotalCredits(filteredCourses);
}

// Update total credits dynamically
function updateTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = `${totalCredits} Credits`;
}

// Footer: current year and last modified
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Initialize
renderCourses();
function filterCourses(subject) {
    renderCourses(subject);
}