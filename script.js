/* ================================
   SCRIPT PRINCIPALE DELLA PAGINA

   Questo file:
   1. legge i dati da config.js
   2. crea automaticamente le card dei countdown
   3. crea automaticamente le frasi motivazionali
   4. aggiorna i countdown ogni secondo
================================ */


/* ================================
   1. CREAZIONE CARD COUNTDOWN
================================ */

function createCountdownCard(countdown) {
  const card = document.createElement("article");

  card.className = "countdown-card";
  card.id = countdown.id;

  card.innerHTML = `
    <h3>${countdown.title}</h3>

    ${
      countdown.description
        ? `<p class="countdown-description">${countdown.description}</p>`
        : ""
    }

    <div class="countdown-timer">
      <div>
        <span class="countdown-number" data-days>0</span>
        <span class="countdown-label">giorni</span>
      </div>

      <div>
        <span class="countdown-number" data-hours>0</span>
        <span class="countdown-label">ore</span>
      </div>

      <div>
        <span class="countdown-number" data-minutes>0</span>
        <span class="countdown-label">minuti</span>
      </div>

      <div>
        <span class="countdown-number" data-seconds>0</span>
        <span class="countdown-label">secondi</span>
      </div>
    </div>

    <p class="countdown-message" data-message></p>
  `;

  return card;
}


function renderCountdownCards(countdowns, containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    return;
  }

  container.innerHTML = "";

  countdowns.forEach(function (countdown) {
    const card = createCountdownCard(countdown);
    container.appendChild(card);
  });
}


/* ================================
   2. CREAZIONE FRASI MOTIVAZIONALI
================================ */

function createMotivationCard(quote) {
  const card = document.createElement("article");

  card.className = "motivation-card";

  card.innerHTML = `
    <p>${quote}</p>
  `;

  return card;
}


function renderMotivationQuotes(quotes) {
  const container = document.querySelector(".motivation-grid");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  quotes.forEach(function (quote) {
    const card = createMotivationCard(quote);
    container.appendChild(card);
  });
}


/* ================================
   3. CALCOLO DEL TEMPO RIMANENTE
================================ */

function calculateTimeLeft(targetDate) {
  const targetTime = new Date(targetDate).getTime();
  const now = new Date().getTime();

  if (Number.isNaN(targetTime)) {
    return {
      invalid: true,
      expired: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  const difference = targetTime - now;

  if (difference <= 0) {
    return {
      invalid: false,
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  return {
    invalid: false,
    expired: false,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
}


/* ================================
   4. AGGIORNAMENTO COUNTDOWN
================================ */

function updateCountdown(countdown) {
  const countdownElement = document.getElementById(countdown.id);

  if (!countdownElement) {
    return;
  }

  const timeLeft = calculateTimeLeft(countdown.targetDate);

  const timerElement = countdownElement.querySelector(".countdown-timer");
  const messageElement = countdownElement.querySelector("[data-message]");

  if (timeLeft.invalid) {
    if (timerElement) {
      timerElement.style.display = "none";
    }

    if (messageElement) {
      messageElement.textContent = "Data non valida. Controlla il file config.js.";
      messageElement.classList.add("is-visible");
    }

    return;
  }

  if (timeLeft.expired) {
    if (timerElement) {
      timerElement.style.display = "none";
    }

    if (messageElement) {
      messageElement.textContent = countdown.finishedMessage;
      messageElement.classList.add("is-visible");
    }

    return;
  }

  if (timerElement) {
    timerElement.style.display = "grid";
  }

  if (messageElement) {
    messageElement.textContent = "";
    messageElement.classList.remove("is-visible");
  }

  countdownElement.querySelector("[data-days]").textContent = timeLeft.days;
  countdownElement.querySelector("[data-hours]").textContent = timeLeft.hours;
  countdownElement.querySelector("[data-minutes]").textContent = timeLeft.minutes;
  countdownElement.querySelector("[data-seconds]").textContent = timeLeft.seconds;
}


function startCountdowns(allCountdowns) {
  allCountdowns.forEach(function (countdown) {
    updateCountdown(countdown);

    setInterval(function () {
      updateCountdown(countdown);
    }, 1000);
  });
}


/* ================================
   5. AVVIO DELLA PAGINA
================================ */

function initPage() {
  if (!window.siteConfig) {
    console.error("Errore: config.js non trovato oppure siteConfig non definito.");
    return;
  }

  const poetryCompetitions = window.siteConfig.poetryCompetitions || [];
  const vacations = window.siteConfig.vacations || [];
  const motivationQuotes = window.siteConfig.motivationQuotes || [];

  renderCountdownCards(poetryCompetitions, ".poetry-grid");
  renderMotivationQuotes(motivationQuotes);
  renderCountdownCards(vacations, ".vacation-grid");

  const allCountdowns = [
    ...poetryCompetitions,
    ...vacations
  ];

  startCountdowns(allCountdowns);
}

initPage();
