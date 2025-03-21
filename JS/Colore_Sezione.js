document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section"),
    navLinks = document.querySelectorAll("nav ul li a"),
    header = document.querySelector("header");

  // Colori per ciascuna sezione
  const sectionColors = {
    home: "black", // Colore per la homepage
    calendario: "black", // Colore per il calendario
    piloti: "black", // Colore per piloti
    classifica: "black", // Colore per la classifica
  };

  // Colore dell'hover per il calendario
  const hoverColor = sectionColors.calendario;

  function changeActiveMenu() {
    let currentSection = "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - header.offsetHeight,
        sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3)
        currentSection = section.getAttribute("id");
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      link.style.color = ""; // Reset al colore predefinito
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active-link");
        link.style.color = sectionColors[currentSection]; // Applica il colore specifico
      }
    });
  }

  // Imposta inizialmente il colore dell'hover per il calendario
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === "#calendario") {
      link.style.color = hoverColor; // Imposta il colore hover per il link calendario
    }
  });

  window.addEventListener("scroll", changeActiveMenu);
  changeActiveMenu();
});
