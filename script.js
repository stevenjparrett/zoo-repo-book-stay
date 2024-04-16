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


let currentYear, currentMonth;

function showCalendar(field) {
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    const calendarEl = document.getElementById(`${field}Calendar`);
    calendarEl.style.display = 'block';
    renderCalendar(field, currentYear, currentMonth);
}

function renderCalendar(field, year, month) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const firstDay = new Date(year, month, 1);
    let startingDay = firstDay.getDay();

    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let calendarHtml = '<table>';
    calendarHtml += `<tr><th colspan="7">${monthNames[month]} ${year}</th></tr>`;
    calendarHtml += '<tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr>';
    calendarHtml += '<tr>';

    for (let i = 0; i < startingDay; i++) {
        calendarHtml += '<td></td>';
    }

    let day = 1;
    for (let i = startingDay; day <= daysInMonth; i++) {
        if (i % 7 === 0) {
            calendarHtml += '</tr><tr>';
        }
        calendarHtml += `<td onclick="selectDate('${field}', ${day}, ${month + 1}, ${year})">${day}</td>`;
        day++;
    }

    for (let i = day + startingDay - 1; i % 7 !== 0; i++) {
        calendarHtml += '<td></td>';
    }

    calendarHtml += '</tr>';
    calendarHtml += '<tr><td colspan="7"><button onclick="changeMonth(\'previous\', \'' + field + '\')">Prev</button><button onclick="changeMonth(\'next\', \'' + field + '\')">Next</button></td></tr>';
    calendarHtml += '</table>';
    document.getElementById(`${field}Calendar`).innerHTML = calendarHtml;
}

function selectDate(field, day, month, year) {
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    document.getElementById(`${field}Date`).value = dateStr;
    document.getElementById(`${field}Calendar`).style.display = 'none';
}

function changeMonth(direction, field) {
    if (direction === 'next') {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
    } else if (direction === 'previous') {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
    }
    renderCalendar(field, currentYear, currentMonth);
}
