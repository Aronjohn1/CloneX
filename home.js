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

const iconMap = {
  gifIcon: 'gifBox',
  pollIcon: 'pollBox',
  emojiIcon: 'emojiBox',
  scheduleIcon: 'scheduleBox',
  locationIcon: 'locationBox'
};

for (let iconId in iconMap) {
  document.getElementById(iconId).addEventListener('click', () => {
      const targetBox = iconMap[iconId];
      document.querySelectorAll('.popup').forEach(popup => {
          popup.style.display = (popup.id === targetBox && popup.style.display !== 'block') ? 'block' : 'none';
      });
  });
}

function gif() {
  // Hide emoji popup
  document.getElementById("popupBoxs").style.display = "none";
  // Show gif popup
  document.getElementById("popupBox").style.display = "block";
}

function emoji() {
  // Hide gif popup
  document.getElementById("popupBox").style.display = "none";
  // Show emoji popup
  document.getElementById("popupBoxs").style.display = "block";
}

// Optional: Close both popups
function closeAllPopups() {
  document.getElementById("popupBox").style.display = "none";
  document.getElementById("popupBoxs").style.display = "none";
}


