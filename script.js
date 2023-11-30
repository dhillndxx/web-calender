const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span"),
  selectedDateTextbox = document.getElementById("selected-date"),
  themeSelect = document.getElementById("theme"),
  eventTextarea = document.getElementById("event"),
  eventListDiv = document.getElementById("event-list"),
  clearButton = document.getElementById("clear-button");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth(),
  selectedDate = null,
  theme = "light",
  events = [],
  eventColors = {}; // Menyimpan warna acara untuk setiap tanggal

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    let eventColor = eventColors[formatDate(new Date(currYear, currMonth, i))];
    liTag += `<li class="${isToday}" style="background-color: ${eventColor}" onclick="selectDate(${i})">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
  applyTheme();
};



const selectDate = (day) => {
  selectedDate = new Date(currYear, currMonth, day);
  selectedDateTextbox.value = formatDate(selectedDate);
  renderCalendar();
};

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const changeTheme = () => {
  theme = themeSelect.value;
  applyTheme();
};

const applyTheme = () => {
  document.body.className = theme;
};

const addEvent = () => {
  const eventText = eventTextarea.value.trim();
  if (eventText && selectedDate) {
    const color = prompt("Enter event color (orange, palevioletred, greenyellow):");
    events.push({ date: selectedDate, text: eventText, color });
    eventColors[formatDate(selectedDate)] = color;
    displayEvents();
    // Clear the textarea after adding the event
    eventTextarea.value = "";
  }
};

const displayEvents = () => {
  eventListDiv.innerHTML = "";
  events.forEach((event) => {
    const eventDiv = document.createElement("div");
    eventDiv.innerHTML = `<strong>${formatDate(event.date)}</strong>: ${event.text}`;
    eventListDiv.appendChild(eventDiv);
  });
  renderCalendar();
};

clearButton.addEventListener("click", () => {
  selectedDate = null;
  selectedDateTextbox.value = "";
  renderCalendar();
});

renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    selectedDate = null;
    selectedDateTextbox.value = "";
    renderCalendar();
  });
});


