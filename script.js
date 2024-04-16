document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get all input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var checkInDate = new Date(document.getElementById('checkInDate').value);
    var checkOutDate = new Date(document.getElementById('checkOutDate').value);
    var roomType = document.getElementById('roomType').value;
    var guests = document.getElementById('guests').value;
    var specialRequests = document.getElementById('specialRequests').value;

    // Validate dates
    if (checkOutDate <= checkInDate) {
        alert('Check-out date must be after check-in date.');
        return;
    }

    // Create and store the booking object
    var booking = { name, email, checkInDate: checkInDate.toISOString().split('T')[0], checkOutDate: checkOutDate.toISOString().split('T')[0], roomType, guests, specialRequests };
    var bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Clear form and display bookings
    document.getElementById('bookingForm').reset();
    displayBookings();
});

function displayBookings() {
    var bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    var bookingsDiv = document.getElementById('bookings');
    bookingsDiv.innerHTML = '<h2>Current Bookings</h2>';
    bookings.forEach(function(booking, index) {
        var div = document.createElement('div');
        div.innerHTML = `Name: ${booking.name}, Email: ${booking.email}, Room: ${booking.roomType}, Guests: ${booking.guests}, Check-in: ${booking.checkInDate}, Check-out: ${booking.checkOutDate}, Requests: ${booking.specialRequests} <button onclick='deleteBooking(${index})'>Delete</button>`;
        bookingsDiv.appendChild(div);
    });
}

function deleteBooking(index) {
    var bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.splice(index, 1);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    displayBookings();
}

window.onload = function() {
    displayBookings();
};
