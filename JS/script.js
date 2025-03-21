// Funzione per generare punteggi casuali per le gare
function generateRacePoints(riders, races = 10) {
  return riders.map((rider) => {
    let points = Array.from({ length: races }, () =>
      Math.floor(Math.random() * 26)
    );
    return { ...rider, points, totalPoints: points.reduce((a, b) => a + b, 0) };
  });
}

// Funzione per generare la classifica ordinata
function generateRanking(ridersWithPoints) {
  return ridersWithPoints
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((rider, index) => ({
      position: index + 1,
      name: rider.name,
      team: rider.team,
      totalPoints: rider.totalPoints,
      image: rider.image,
    }));
}

// Funzione per mostrare le card dei piloti con i punteggi
function displayRidersWithPoints(ridersWithPoints) {
  const container = document.getElementById("riders-cards");
  if (!container) return;

  container.innerHTML = "";
  ridersWithPoints.forEach(({ name, team, points, totalPoints, image }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <h3>${name}</h3>
            <img src="${image}" alt="${name}" class="rider-image" />
            <p><strong>Scuderia:</strong> ${team}</p>
            <p><strong>Punti per gara:</strong> ${points.join(", ")}</p>
            <p><strong>Punti totali:</strong> ${totalPoints}</p>
        `;
    container.appendChild(card);
  });
}

// Funzione per mostrare la classifica finale
function displayRanking(ranking) {
  const container = document.getElementById("ranking-cards");
  if (!container) return;

  container.innerHTML = "";
  ranking.forEach(({ position, name, team, totalPoints, image }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <h3>${position}. ${name}</h3>
            <img src="${image}" alt="${name}" class="rider-image" />
            <p><strong>Scuderia:</strong> ${team}</p>
            <p><strong>Punti:</strong> ${totalPoints}</p>
        `;
    container.appendChild(card);
  });
}

// Funzione per mostrare il calendario delle gare
function displayCalendar(tracks) {
  const container = document.getElementById("calendar-cards");
  if (!container) return;

  container.innerHTML = "";
  tracks.forEach(({ name, location, date }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <h3>${name}</h3>
            <img src="${name}.jpg" alt="${name}" class="track-image" />
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Data:</strong> ${date}</p>
        `;
    container.appendChild(card);
  });
}

// Caricamento dei dati piloti
document.addEventListener("DOMContentLoaded", () => {
  fetch("JSON/piloti.json")
    .then((response) => response.json())
    .then((data) => {
      const ridersWithPoints = generateRacePoints(data.riders),
        ranking = generateRanking(ridersWithPoints);
      displayRidersWithPoints(ridersWithPoints);
      displayRanking(ranking);
    })
    .catch((error) =>
      console.error("Errore nel caricamento dei dati piloti:", error)
    );

  // Caricamento del calendario gare
  fetch("JSON/calendario.json")
    .then((response) => response.json())
    .then((data) => displayCalendar(data.tracks))
    .catch((error) =>
      console.error("Errore nel caricamento del calendario:", error)
    );
});
