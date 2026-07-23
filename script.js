// Target WhatsApp number (+230 5767 6809)
const WHATSAPP_PHONE = "23059351567";

const qs = (selector) => document.querySelector(selector);
const question = qs("#question");
const gif = qs("#gif");
const yesBtn = qs("#yes-btn");
const noBtn = qs("#no-btn");
const btnGroup = qs("#btn-group");
const dateTimePanel = qs("#date-time-panel");
const dateDaySelect = qs("#date-day");
const timeHour = qs("#time-hour");
const timeMinute = qs("#time-minute");
const timeAmpm = qs("#time-ampm");
const letsGoBtn = qs("#letsgo-btn");
const heartsBg = qs("#hearts-bg");

let noDodgeCount = 0;
let yesScale = 1;

const funnyNoTexts = [
  "No 😜",
  "Are you sure? 🥺",
  "Try again! 🏃‍♂️",
  "Nice try! 😂",
  "Nope! 🙈",
  "Not an option! 😝",
  "Catch me! 💨",
  "Click YES instead! 💕",
  "Haha can't touch me! 🤪",
  "You can't say no! 😘",
  "Still trying? 😜",
  "Just say YES! 🥰"
];

// Create background floating hearts
function createFloatingHearts() {
  const heartSymbols = ["💖", "💕", "🌸", "✨", "❤️", "💗"];
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.classList.add("floating-heart");
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${6 + Math.random() * 6}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    heart.style.fontSize = `${16 + Math.random() * 16}px`;
    heartsBg.appendChild(heart);
  }
}

// Default day to tomorrow's date
function initializeDaySelection() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayNum = String(tomorrow.getDate());
  if (dateDaySelect) {
    dateDaySelect.value = dayNum;
  }
}

// "No" button dodge functionality
const moveNoButton = (e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const btnRect = noBtn.getBoundingClientRect();

  // Make button position fixed on viewport
  noBtn.style.position = "fixed";

  // Calculate random position on screen keeping safe margins from edges
  const padding = 24;
  const maxX = Math.max(20, window.innerWidth - btnRect.width - padding);
  const maxY = Math.max(20, window.innerHeight - btnRect.height - padding);

  const randomX = Math.floor(padding + Math.random() * (maxX - padding));
  const randomY = Math.floor(padding + Math.random() * (maxY - padding));

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  // Change funny text on No button
  noDodgeCount++;
  const nextText = funnyNoTexts[noDodgeCount % funnyNoTexts.length];
  noBtn.textContent = nextText;

  // Make Yes button grow slightly each time No is attempted to make it irresistible!
  yesScale = Math.min(1.8, yesScale + 0.08);
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.zIndex = "20";
};

// Distance check for proximity dodging
document.addEventListener("pointermove", (e) => {
  if (!noBtn || noBtn.classList.contains("hidden")) return;
  const rect = noBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

  // If pointer is within 70px of "No" button, dodge!
  if (distance < 70) {
    moveNoButton();
  }
});

// "Yes" button handler
const handleYesClick = () => {
  question.innerHTML = "Yaaaaay! See you soon!! 💖";
  gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";

  // Hide Yes/No buttons cleanly
  btnGroup.classList.add("hidden");
  noBtn.style.display = "none";

  // Show Date & Time Selection Panel
  dateTimePanel.classList.remove("hidden");
  initializeDaySelection();
};

// Helper for ordinal suffix (e.g., 1 -> 1st, 24 -> 24th)
function getOrdinalSuffix(day) {
  const d = parseInt(day, 10);
  if (isNaN(d)) return day;
  const j = d % 10, k = d % 100;
  if (j === 1 && k !== 11) return `${d}st`;
  if (j === 2 && k !== 12) return `${d}nd`;
  if (j === 3 && k !== 13) return `${d}rd`;
  return `${d}th`;
}

// "Let's Go!" Button -> Redirects to WhatsApp
const handleLetsGoClick = () => {
  const dayValue = dateDaySelect.value;
  const hour = timeHour.value;
  const minute = timeMinute.value;
  const ampm = timeAmpm.value;

  const formattedDay = getOrdinalSuffix(dayValue);
  const formattedTime = `${hour}:${minute} ${ampm}`;

  // Construct message with "I LOVE YOU." as requested
  let message = `I LOVE YOU. 💖 I would love to go out with you!`;
  if (formattedDay) {
    message += `\n\n📅 Date: Day ${formattedDay}`;
  }
  if (formattedTime) {
    message += `\n⏰ Time: ${formattedTime}`;
  }

  // Create burst of heart particles
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.textContent = "💖";
      heart.style.position = "fixed";
      heart.style.left = `${50 + (Math.random() * 40 - 20)}%`;
      heart.style.top = `${50 + (Math.random() * 40 - 20)}%`;
      heart.style.fontSize = "28px";
      heart.style.pointerEvents = "none";
      heart.style.transition = "all 1s ease-out";
      heart.style.zIndex = "9999";
      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform = `translate(${Math.random() * 200 - 100}px, -150px) scale(1.5)`;
        heart.style.opacity = "0";
      });

      setTimeout(() => heart.remove(), 1000);
    }, i * 40);
  }

  // Open WhatsApp link
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

  setTimeout(() => {
    window.open(whatsappUrl, "_blank") || (window.location.href = whatsappUrl);
  }, 600);
};

// Event Listeners for No Button (multiple triggers to make clicking impossible)
yesBtn.addEventListener("click", handleYesClick);

["mouseover", "pointerenter", "pointerdown", "touchstart", "click"].forEach((eventType) => {
  noBtn.addEventListener(eventType, moveNoButton, { passive: false });
});

letsGoBtn.addEventListener("click", handleLetsGoClick);

// Initialize on load
createFloatingHearts();
initializeDaySelection();

