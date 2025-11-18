// Modal function
// Get modal element, button, and close button
var modal = document.getElementById('bookNowModal');
var btn = document.querySelector('.add-to-cart');
var closeBtn = document.querySelector('.close-btn');
// Listen for button click
btn.addEventListener('click', function() {
    modal.style.display = 'block';
});
// Listen for close click
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});
// Listen for outside click
window.addEventListener('click', function(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

// Get today's date for calendar validation
document.addEventListener('DOMContentLoaded', function() {
    // Set min date for both inputs to tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]'); 
    dateInputs.forEach(input => input.setAttribute('min', formattedTomorrow));

    // Enforce drop-off date logic
    const pickUpDateInput = document.querySelector('input[name="pick-up-date"]');
    const dropOffDateInput = document.querySelector('input[name="drop-off-date"]');

    pickUpDateInput.addEventListener('input', function() {
        const pickUpDate = new Date(this.value);
        const minDropOffDate = new Date(pickUpDate);
        minDropOffDate.setDate(minDropOffDate.getDate() + 1);
        const formattedDate = minDropOffDate.toISOString().substring(0, 10);
        dropOffDateInput.min = formattedDate;
    });
});

// Time validation
document.addEventListener('DOMContentLoaded', function() {
    const startTime = "07:00";
    const endTime = "17:00";

    const enforceBusinessHours = function(event) {
        const time = event.target.value;

        if (time < startTime) {
            event.target.value = startTime;
        } else if (time > endTime) {
            event.target.value = endTime;
        }
    };
    document.getElementById('pick-up-time').addEventListener('input', enforceBusinessHours);
    document.getElementById('drop-off-time').addEventListener('input', enforceBusinessHours);
});


// Sticky button feature:
const bookNowBtn = document.querySelector('.add-to-cart'); // original button
const stickyBtn = bookNowBtn.cloneNode(true); // clone the button
stickyBtn.classList.add('sticky-btn'); // add class for styling
document.body.appendChild(stickyBtn); // add to the body

window.addEventListener('scroll', function() {
    const rect = bookNowBtn.getBoundingClientRect();
    
    // If the button is not in the viewport, show the sticky button
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
        stickyBtn.style.display = 'block';
        stickyBtn.style.bottom = (window.innerHeight / 2) - (stickyBtn.offsetHeight / 2) + 'px'; // center it vertically
    } else {
        stickyBtn.style.display = 'none'; // hide sticky button when original is in view
    }

    stickyBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});
});

// Accordion function:
document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                this.classList.remove('active'); // Remove 'active' class
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                this.classList.add('active'); // Add 'active' class
            }
        });
    });
});

// Back to top button functionality
var topButton = document.querySelector('.back-to-top');
// Show or hide the button depending on scroll position
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) { // Adjust this value to your preference
        topButton.style.display = 'block';
    } else {
        topButton.style.display = 'none';
    }
});
// Add smooth scrolling when clicking the button
topButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});