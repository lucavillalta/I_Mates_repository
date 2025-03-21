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
const generateRanking = (ridersWithPoints) =>
  ridersWithPoints
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((rider, index) => ({
      position: index + 1,
      name: rider.name,
      team: rider.team,
      totalPoints: rider.totalPoints,
      image: rider.image,
    }));

// Funzione per mostrare le card dei piloti con i punteggi
function displayRidersWithPoints(ridersWithPoints) {
  const container = document.getElementById("riders-cards");
  if (!container) return;

  container.innerHTML = "";

  // Ordinare i piloti in ordine alfabetico per nome
  ridersWithPoints.sort((a, b) => a.name.localeCompare(b.name));

  ridersWithPoints.forEach(({ name, team, points, totalPoints, image }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <h3>${name}</h3>
            <img src="Img/Piloti/${image}" alt="${name}" class="rider-image" />
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
            <img src="Img/Piloti/${image}" alt="${name}" class="rider-image" />
            <p><strong>Scuderia:</strong> ${team}</p>
            <p><strong>Punti:</strong> ${totalPoints}</p>
        `;
    container.appendChild(card);
  });
}

// Funzione per mostrare il calendario delle gare// Funzione per mostrare il calendario delle gare
function displayCalendar(tracks) {
  const container = document.getElementById("calendar-cards");
  if (!container) return;

  container.innerHTML = "";

  tracks.sort((a, b) => a.name.localeCompare(b.name));

  tracks.forEach(({ name, location, date, image }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <h3>${name}</h3>
            <img src="Img/Piste/${image}" alt="${name}" class="track-image" />
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Data:</strong> ${date}</p>
        `;
    container.appendChild(card);
  });
}

// Funzione generica per caricare un file JSON
function loadJSON(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Errore nel caricamento del file JSON: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => console.error(error));
}

// Uso della funzione per caricare i dati dei piloti
document.addEventListener("DOMContentLoaded", () => {
  loadJSON("JSON/piloti.json")
    .then((data) => {
      const ridersWithPoints = generateRacePoints(data.riders),
        ranking = generateRanking(ridersWithPoints);
      displayRidersWithPoints(ridersWithPoints);
      displayRanking(ranking);
    })
    .catch((error) =>
      console.error("Errore nel caricamento dei dati piloti:", error)
    );

  // Uso della funzione per caricare il calendario delle gare
  loadJSON("JSON/calendario.json")
    .then((data) => displayCalendar(data.tracks))
    .catch((error) =>
      console.error("Errore nel caricamento del calendario:", error)
    );
});
