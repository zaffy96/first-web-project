/* ================================
   CONFIGURAZIONE DELLA PAGINA

   Qui puoi modificare:
   1. concorsi di poesia
   2. frasi motivazionali
   3. vacanze

   Per cambiare una data, modifica solo targetDate.

   Formato data:
   "AAAA-MM-GGTHH:MM:SS"

   Esempio:
   "2026-12-31T23:59:59"
================================ */

window.siteConfig = {
  poetryCompetitions: [
    {
      id: "concorso-letterario",
      title: "Concorso letterario",
      targetDate: "2026-05-11T23:59:59",
      finishedMessage: "Il conto alla rovescia per il concorso letterario è terminato."
    },
    {
      id: "premio-poesia-estate",
      title: "Premio poesia estate",
      targetDate: "2026-07-15T23:59:59",
      finishedMessage: "La scadenza del premio poesia estate è arrivata."
    },
    {
      id: "concorso-autunnale",
      title: "Concorso autunnale",
      targetDate: "2026-10-01T23:59:59",
      finishedMessage: "La scadenza del concorso autunnale è arrivata."
    }
  ],

  motivationQuotes: [
    "Scrivere poco, ma tornare spesso: anche una frase salvata oggi può diventare una poesia domani.",
    "Un concorso non è solo una scadenza: è un modo per dare forma a qualcosa che altrimenti resterebbe sospeso.",
    "Non serve sentirsi pronti. Serve consegnare una versione viva, imperfetta, ma reale."
  ],

  vacations: [
    {
      id: "vacanze",
      title: "Vacanze",
      targetDate: "2026-04-01T00:00:00",
      finishedMessage: "Le vacanze sono iniziate."
    },
    {
      id: "weekend-mare",
      title: "Weekend al mare",
      targetDate: "2026-08-01T09:00:00",
      finishedMessage: "Il weekend al mare è iniziato."
    },
    {
      id: "viaggio-autunno",
      title: "Viaggio d'autunno",
      targetDate: "2026-11-20T08:00:00",
      finishedMessage: "Il viaggio d'autunno è iniziato."
    }
  ]
};

/* 
   Questa parte serve solo a mantenere compatibilità
   con il JavaScript attuale.

   Nel prossimo micro-step aggiorneremo script.js
   in modo che legga direttamente da siteConfig.
*/

window.countdownConfig = [
  ...window.siteConfig.poetryCompetitions,
  ...window.siteConfig.vacations
];
