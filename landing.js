const toggleBtn = document.getElementById("tog-btn");
const body = document.body;

if (!localStorage.getItem("mode")) {
  localStorage.setItem("mode", "light");
}

body.classList.add(localStorage.getItem("mode"));

toggleBtn.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark");
    localStorage.setItem("mode", "dark");
  } else {
    body.classList.replace("dark", "light");
    localStorage.setItem("mode", "light");
  }
});

document.getElementById("popup").style.display = "none";
function createAccount() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}



function populateYears() {
  const yearSelect = document.getElementById("year");
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 100; i <= currentYear; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
}


function updateDays() {
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);
  const daySelect = document.getElementById("day");

  daySelect.innerHTML = '<option value="">Day</option>';

  if (!isNaN(month) && !isNaN(year)) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      daySelect.appendChild(option);
    }
  }
}


function showDate() {
  const month = document.getElementById('month').value;
  const day = document.getElementById('day').value;
  const year = document.getElementById('year').value;

  if (month && day && year) {
    document.getElementById('result').textContent = `Selected Date: ${day}/${parseInt(month) + 1}/${year}`;
  } else {
    document.getElementById('result').textContent = 'Please select a valid date.';
 
  }
}

document.getElementById("month").addEventListener("change", updateDays);
document.getElementById("year").addEventListener("change", updateDays);

populateYears();


function goToNextStep() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const month = document.getElementById("month").value;
  const day = document.getElementById("day").value;
  const year = document.getElementById("year").value;

  if (!name || !email || !day || !month || !year) {
    alert("Please fill up all");
    return;
  }


  document.querySelector(".popup-box").style.display = "none";


  document.querySelector(".popup-box.step2").style.display = "block";
}

function submitPassword() {
  const password = document.getElementById("password").value.trim();

  if (!password) {
    alert("Please enter your password.");
    return;
  }


  document.querySelector(".popup-box.step2").style.display = "none";


  document.querySelector(".popup-box.signin-box").style.display = "block";
}

function togglePassword() {
  const passwordField = document.getElementById("password");
  const toggleBtn = document.querySelector(".toggle-password");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleBtn.textContent = "🙈";
  } else {
    passwordField.type = "password";
    toggleBtn.textContent = "👁️";
  }
}

function createAccount() {
  document.getElementById("popup").style.display = "flex";


  document.querySelector(".popup-box").style.display = "block";


  document.querySelector(".popup-box.step2").style.display = "none";
  document.querySelector(".popup-box.signin-box").style.display = "none";


  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("month").selectedIndex = 0;
  document.getElementById("day").innerHTML = '<option value="">Select Day</option>';
  document.getElementById("year").selectedIndex = 0;
  document.getElementById("result").textContent = "";
}



function SignIn() {

  document.querySelector(".popup-box").style.display = "none";
  document.querySelector(".popup-box.step2").style.display = "none";
  

  document.querySelector(".popup-box.signin-box").style.display = "block";
  

  document.getElementById("popup").style.display = "flex";

 
  

}


function togglePassword(icon) {
  const input = icon.parentElement.querySelector("input");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}




