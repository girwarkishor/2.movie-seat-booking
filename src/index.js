import "./sass/main.scss";

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// convert string to integer
let ticketPrice = +movieSelect.value;

// console.log(typeof ticketPrice); //String

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); // Tjos will select all in Node List
  //   console.log(selectedSeats); // shows NodeList

  // Copy selected seats into array
  // Map through array
  // return a new array indexes
  //   const seatsIndex = [...selectedSeats].map(function (seat) {
  //     return [...seats].indexOf(seat);
  //   });
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  console.log(seatsIndex);

  const selectedSeatsCount = selectedSeats.length;
  //   console.log(selectedSeatsCount); // Shows NodeList length

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  //   console.log(e.target); // Show exact target list
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // console.log(e.target);
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});
