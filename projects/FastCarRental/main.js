// Booking modal
// Get modal element, button, and close button
document.addEventListener('DOMContentLoaded', function () {
    var bookNowModal = document.getElementById('bookNowModal');
    var btn = document.getElementById('openModalBtn');
    var closeBtn = document.querySelector('.close-btn');
    var carModelDropdown = document.getElementById('car-model-dropdown');
    var pickupLocation = document.getElementById('pickup-location');
    var dropoffLocation = document.getElementById('dropoff-location');
    var pickupDate = document.getElementById('pickup-date');
    var pickupTime = document.getElementById('pickup-time');
    var dropoffDate = document.getElementById('dropoff-date');
    var dropoffTime = document.getElementById('dropoff-time');
    // Function to validate business time ours for booking.
    function enforceTimeRestrictions(timeInput) {
        var selectedTime = timeInput.value;
        if (selectedTime < "07:00") {
            timeInput.value = "07:00";
            alert("Pick-up time cannot be earlier than 7am.");
        } else if (selectedTime > "18:00") {
            timeInput.value = "18:00";
            alert("Pick-up time cannot be later than 6pm.");
        }
    }
    pickupTime.addEventListener('change', function() {
        enforceTimeRestrictions(pickupTime);
    });
    dropoffTime.addEventListener('change', function() {
        enforceTimeRestrictions(dropoffTime);
    });
    // Check if all fields are filled
    function fieldsAreFilled() {
        return carModelDropdown.value !== "" && 
               pickupLocation.value !== "" && 
               dropoffLocation.value !== "" &&
               pickupDate.value !== "" &&
               pickupTime.value !== "" &&
               dropoffDate.value !== "" &&
               dropoffTime.value !== "";
    }
    // Set the min attribute for the pick-up date to tomorrow's date
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    pickupDate.min = tomorrow.toISOString().split('T')[0];
    // Update the min attribute for the drop-off date when the pick-up date changes
    pickupDate.addEventListener('change', function() {
        var selectedPickupDate = new Date(pickupDate.value);
        var minDropoffDate = new Date(selectedPickupDate);
        minDropoffDate.setDate(minDropoffDate.getDate() + 1);
        dropoffDate.min = minDropoffDate.toISOString().split('T')[0];
    });
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        if (carModelDropdown.value === "SELECT YOUR NEXT CAR" || !fieldsAreFilled()) {
            alert("Please fill out all fields before completing your reservation.");
            return;
        }
        bookNowModal.style.display = 'block';
    });
    closeBtn.addEventListener('click', function() {
        bookNowModal.style.display = 'none';
    });
    window.addEventListener('click', function(e) {
        if (e.target == bookNowModal) {
            bookNowModal.style.display = 'none';
        }
    });
    // Get modal input elements for later updating
    var modalPickUpDate = document.getElementById('pick-up-date');
    var modalPickUpTime = document.getElementById('pick-up-time');
    var modalDropOffDate = document.getElementById('drop-off-date');
    var modalDropOffTime = document.getElementById('drop-off-time');
    var modalPickUpLocation = document.querySelector("[name='pick-up-location']");
    var modalDropOffLocation = document.querySelector("[name='drop-off-location']");
    var modalCarImage = document.querySelector(".modal-vehicle-image");
    //
    function updateModalFields() {
        modalPickUpDate.value = pickupDate.value;
        modalPickUpTime.value = pickupTime.value;
        modalDropOffDate.value = dropoffDate.value;
        modalDropOffTime.value = dropoffTime.value;
        // Set the selected option for the modal's pick-up location
        var modalPickUpOption = Array.from(modalPickUpLocation.options).find(option => option.value === pickupLocation.value);
        if (modalPickUpOption) modalPickUpOption.selected = true;

        // Set the selected option for the modal's drop-off location
        var modalDropOffOption = Array.from(modalDropOffLocation.options).find(option => option.value === dropoffLocation.value);
        if (modalDropOffOption) modalDropOffOption.selected = true;
    // Updating the car image based on the selection
    switch(carModelDropdown.selectedIndex) {
        case 1:
            modalCarImage.src = "./images/supra/Supra.png";
            break;
        case 2:
            modalCarImage.src = "./images/s2000/s2000.png";
            break;
        case 3:
            modalCarImage.src = "./images/eclipse/Eclipse.png";
            break;
        case 4:
            modalCarImage.src = "./images/Skyline/skyline.png";
            break;
        case 5:
            modalCarImage.src = "./images/charger/Charger.png";
            break;
        default:
            modalCarImage.src = "";  // default image or blank
            break;
    }
}
    // Update modal with user's inputs:
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        
        if (carModelDropdown.value === "SELECT YOUR NEXT CAR" || !fieldsAreFilled()) {
            alert("Please fill out all fields before completing your reservation.");
            return;
        }
        
        updateModalFields();
        bookNowModal.style.display = 'block';
    });
});

// Car Carousel
$(document).ready(function() {
    const $carousel = $('#imageCarousel'); 

    $('#car-model-dropdown').on('change', function() {
        let modelIndex = $(this).val();
        
        if (modelIndex === "") {
            $carousel.carousel('cycle');
        } else {
            $carousel.carousel('pause');
            $carousel.carousel(parseInt(modelIndex));
        }
    });
});

// Funtion to match the car image with the car name in drop down menu
$(document).ready(function() {
    const carData = {
        "Supra": {
            image: "./images/supra/Supra.png",
            specs: {
                "Make": "Toyota",
                "Model": "Supra RZ",
                "Year": "1995",
                "Body": "Coupe",
                "Doors": "2",
                "Seats": "2",
                "Drive Terrain": "Rear-Wheel-Drive",
                "Transmission": "6-Speed Manual",
                "Engine": "2JZ-GTE",
                "Power": "569 HP",
                "Cylinders": "Inline 6",
                "Forced Induction": "Twin-Turbo Charged",
            },
            price: 99
        },
        "S2000": {
            image: "./images/s2000/s2000.png",
            specs: {
                "Make": "Honda",
                "Model": "S2000",
                "Year": "2000",
                "Body": "Coupe",
                "Doors": "2",
                "Seats": "2",
                "Drive Terrain": "Rear-Wheel-Drive",
                "Transmission": "6-Speed Manual",
                "Engine": "K20A",
                "Power": "295 HP",
                "Cylinders": "Inline 4",
                "Forced Induction": "Super-charged + VTEC",
            },
            price: 88
        },
        "Eclipse": {
            image: "./images/eclipse/Eclipse.png",
            specs: {
                "Make": "Mitsubishi",
                "Model": "Eclipse",
                "Year": "1995",
                "Body": "Coupe",
                "Doors": "2",
                "Seats": "2",
                "Drive Terrain": "Front-Wheel-Drive",
                "Transmission": "5-Speed Manual",
                "Engine": "420A Neon",
                "Power": "210 HP",
                "Cylinders": "Inline 4",
                "Forced Induction": "None",
            },
            price: 79 
        },
        "Skyline": {
            image: "./images/Skyline/skyline.png",
            specs: {
                "Make": "Nissan",
                "Model": "Skyline GT-R R34",
                "Year": "1999",
                "Body": "Coupe",
                "Doors": "2",
                "Seats": "4",
                "Drive Terrain": "All-Wheel-Drive",
                "Transmission": "5-Speed Manual",
                "Engine": "RB26DETT",
                "Power": "550 HP",
                "Cylinders": "Inline 6",
                "Forced Induction": "Twin-Turbo Charged",
            },
            price: 109 
        },
        "Charger": {
            image: "./images/charger/Charger.png",
            specs: {
                "Make": "Dodge",
                "Model": "Charger R/T",
                "Year": "1970",
                "Body": "Coupe",
                "Doors": "2",
                "Seats": "2",
                "Drive Terrain": "Rear-Wheel-Drive",
                "Transmission": "5-Speed Manual",
                "Engine": "498ci Big-block",
                "Power": "1200 HP",
                "Cylinders": "V8",
                "Forced Induction": "Twin-screw Supercharged",
            },
            price: 149
        }
    };

// Function to update the car image and info table with a fading effect.
function updateCarInfoWithFade(carKey) {
    const $carImage = $(".car-image img");
    const $carInfoTable = $(".car-info table tbody");
    $carImage.fadeOut(500, function() {
        $carImage.attr("src", carData[carKey].image);
        $carImage.fadeIn(500);
    });
    $carInfoTable.fadeOut(500, function() {
        let carInfoHtml = '';
        for (const key in carData[carKey].specs) {
            carInfoHtml += `<tr><td>${key}:</td><td>${carData[carKey].specs[key]}</td></tr>`;
        }
        $carInfoTable.html(carInfoHtml);
        $carInfoTable.fadeIn(500);
    });
}

// Image and Table information fade effect.
$(".car-cell").on("click", function() {
    $(".car-cell").removeClass("selected");
    const carKey = $(this).data('car');
    updateCarInfoWithFade(carKey);
    if (carData[carKey].price !== undefined) {
        $(".table-heading span").text(carData[carKey].price);
        $(".table-heading").text(`$ ${carData[carKey].price} rent per day`);
    } else {
        $(".table-heading span").text("");
        $(".table-heading").text(`Car Information`);
    }
    $(this).addClass("selected");
    });
});

// Map function: change map location based on user input.
document.addEventListener('DOMContentLoaded', function () {
    // Map modal
    var mapModal = document.getElementById('mapModal');
    var locations = document.querySelectorAll('.location');
    var mapImage = document.getElementById('mapImage');
    var locationName = document.getElementById('locationName');
    var locationAddress = document.getElementById('locationAddress');

    const locationData = {
        brisbane: {
            image: './images/maps/brisbane.png',
            address: '456 Boundary Street, Fortitude Valley, Brisbane 4001, QLD.'
        },
        byronbay: {
            image: './images/maps/byronbay.png',
            address: '16 Seaview Street, Byron Bay 2481, NSW.'
        },
        goldcoast: {
            image: './images/maps/goldcoast.png',
            address: '28 Titan Street, South Port, Gold Coast 4200, QLD.'
        },
        noosaheads: {
            image: './images/maps/noosaheads.png',
            address: '3 Noosaville street, Noosa Heads 4567, QLD.'
        },
        sunshinecoast: {
            image: './images/maps/sunshinecoast.png',
            address: '42 circle way, Maroochydore, Sunshine Coast 4551, QLD.'
        },
        toowoomba: {
            image: './images/maps/toowoomba.png',
            address: '19 Wilson Avenue, Toowoomba 4350, QLD.'
        },
    };

    locations.forEach(location => {
        location.addEventListener('click', function() {
            const locName = this.getAttribute('data-name');
            mapImage.src = locationData[locName].image;
            locationName.textContent = this.textContent;
            locationAddress.textContent = locationData[locName].address;

            locations.forEach(loc => loc.classList.remove('active'));
            this.classList.add('active');
        });
         // Only set these event listeners once, not inside the locations forEach loop
        const mapModal = document.getElementById('mapModal');
        const modalImg = document.getElementById('modalImg');
        const span = document.querySelector('.close');

        mapImage.addEventListener('click', function(){
            mapModal.style.display = "block";
            modalImg.src = this.src;
        });
        // Close the modal when the close button (x) is clicked
        span.addEventListener('click', function(){
            mapModal.style.display = "none";
        });
        // Close the modal when the user clicks outside of the image
        mapModal.addEventListener('click', function(event){
            if (event.target === mapModal) {
            mapModal.style.display = "none";
        }
    });
});
});

// Scroll to top of page:
$(document).ready(function(){
    $(".reserve-button").on('click', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
});