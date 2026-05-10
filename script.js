/* ================================
   COUNTDOWN LOGIC

   Legge le date da config.js
   e aggiorna automaticamente i countdown.
================================ */

function calculateTimeLeft(targetDate) {
  const targetTime = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const difference = targetTime - now;

  if (difference <= 0) {
    return {
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  return {
    expired: false,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
}

function updateCountdown(countdown) {
  const countdownElement = document.getElementById(countdown.id);

  if (!countdownElement) {
    return;
  }

  const timeLeft = calculateTimeLeft(countdown.targetDate);

  const timerElement = countdownElement.querySelector(".countdown-timer");
  const messageElement = countdownElement.querySelector("[data-message]");

  if (timeLeft.expired) {
    if (timerElement) {
      timerElement.style.display = "none";
    }

    if (messageElement) {
      messageElement.textContent = countdown.finishedMessage;
    }

    return;
  }

  if (timerElement) {
    timerElement.style.display = "grid";
  }

  if (messageElement) {
    messageElement.textContent = "";
  }

  countdownElement.querySelector("[data-days]").textContent = timeLeft.days;
  countdownElement.querySelector("[data-hours]").textContent = timeLeft.hours;
  countdownElement.querySelector("[data-minutes]").textContent = timeLeft.minutes;
  countdownElement.querySelector("[data-seconds]").textContent = timeLeft.seconds;
}

function startCountdowns() {
  if (!window.countdownConfig) {
    console.error("Errore: config.js non trovato oppure countdownConfig non definito.");
    return;
  }

  window.countdownConfig.forEach(function (countdown) {
    updateCountdown(countdown);

    setInterval(function () {
      updateCountdown(countdown);
    }, 1000);
  });
}

startCountdowns();

