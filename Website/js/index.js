document.addEventListener('DOMContentLoaded', function() {
    // FullCalendar initialization
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
            {
                title: 'Robotics Competition',
                start: '2024-07-10',
                end: '2024-07-12'
            },
            {
                title: 'Bootcamp',
                start: '2024-08-01',
                end: '2024-08-03'
            },
            {
                title: 'Summer High School Workshop',
                start: '2024-09-10',
                end: '2024-09-20'
            }
        ]
    });

    calendar.render();

    // Slider functionality
    let currentIndex = 0;

    function showSlide(index) {
        const slides = document.querySelector('.slides');
        const totalSlides = slides.children.length;
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }
        const offset = -currentIndex * 100;
        slides.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function previousSlide() {
        showSlide(currentIndex - 1);
    }

    setInterval(nextSlide, 3000);

    document.getElementById('next').addEventListener('click', nextSlide);
    document.getElementById('prev').addEventListener('click', previousSlide);

    // Dynamic fields in the sign-up form
    const divisionSelect = document.getElementById('division');
    const additionalFieldsContainer = document.getElementById('additional-fields');

    divisionSelect.addEventListener('change', (event) => {
        const selectedDivision = event.target.value;
        additionalFieldsContainer.innerHTML = '';

        if (selectedDivision === 'university') {
            additionalFieldsContainer.innerHTML = `
                <label for="major">Major:</label>
                <input type="text" id="major" name="major" required>
                <label for="year">Year of Study:</label>
                <input type="text" id="year" name="year" required>
            `;
        } else if (selectedDivision === 'corporate') {
            additionalFieldsContainer.innerHTML = `
                <label for="company">Company:</label>
                <select id="company" name="company" required>
                    <option value="">Select Company</option>
                    <option value="company1">Company 1</option>
                    <option value="company2">Company 2</option>
                    <option value="company3">Company 3</option>
                </select>
            `;
        } else if (selectedDivision === 'high_school') {
            additionalFieldsContainer.innerHTML = `
                <label for="high_school">High School:</label>
                <select id="high_school" name="high_school" required>
                    <option value="">Select High School</option>
                    <option value="school1">High School 1</option>
                    <option value="school2">High School 2</option>
                    <option value="school3">High School 3</option>
                </select>
            `;
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            slide.style.display = 'none';
        });

        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = 'block';
        setTimeout(showSlides, 3000); // Change image every 3 seconds
    }

    document.querySelector('.prev').addEventListener('click', () => {
        showSlides(slideIndex -= 2);
    });

    document.querySelector('.next').addEventListener('click', () => {
        showSlides(slideIndex += 0);
    });

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
});
