function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (nav) {
    nav.classList.toggle("show");
  }
}

// Destination search
const destinationSearch = document.getElementById("destinationSearch");

if (destinationSearch) {
  destinationSearch.addEventListener("submit", function (event) {
    event.preventDefault();

    const destination = document.getElementById("destination").value;
    window.location.href = destination;
  });
}

// Do not allow selecting a past travel date
const travelDate = document.getElementById("travelDate");

if (travelDate) {
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  travelDate.min = localToday;
  travelDate.value = localToday;
}

// Back to top
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", function () {
    backToTop.style.display = window.scrollY > 350 ? "block" : "none";
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Update the active navigation link
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("#navLinks a").forEach(function (link) {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  const checkin = document.getElementById("checkin");
  const checkout = document.getElementById("checkout");
  const bookingMessage = document.getElementById("bookingMessage");

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  checkin.min = minDate;
  checkout.min = minDate;

  checkin.addEventListener("change", function () {
    checkout.min = checkin.value || minDate;

    if (checkout.value && checkout.value <= checkin.value) {
      checkout.value = "";
    }
  });

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (checkout.value <= checkin.value) {
      alert("Check-out date must be after the check-in date.");
      return;
    }

    bookingMessage.style.display = "block";
    bookingMessage.innerHTML =
      "<strong>Thank you, " +
      bookingForm.elements.fullName.value.replace(/[&<>"']/g, "") +
      "!</strong><p>Your demo booking enquiry has been completed successfully.</p>" +
      "<p>This is a frontend project. No actual hotel reservation has been made.</p>";

    bookingForm.reset();
    bookingMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}