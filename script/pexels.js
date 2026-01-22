//  metto qui la API KEY presa da Pratica S7/L4
const pexelsKey = "6Nv4MyyKWPGeUDEUozx6hCtZK418duudhXL5TNA7M7eKgmogCAewfwss";

// endpoint
const pexelsURL = "https://api.pexels.com/v1/search?query=mountains&per_page=9";

// prendo i bottoni dal DOM
const loadImagesBtn = document.querySelector(".btn.btn-primary.my-2");
const loadSecondaryBtn = document.querySelector(".btn.btn-secondary.my-2");

// prendo TUTTE le card del template
const allCards = document.querySelectorAll(".album .card");

// ESERCIZIO 6: campo di ricerca
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

console.log("Search input trovato?", searchInput);
console.log("Search button trovato?", searchBtn);

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const userQuery = searchInput.value.trim();

  if (userQuery === "") {
    alert("Scrivi qualcosa da cercare!");
    return;
  }

  const pexelsURL = `https://api.pexels.com/v1/search?query=${encodeURIComponent(userQuery)}&per_page=9`;

  console.log("Query:", userQuery);
  console.log("URL:", pexelsURL);

  fetch(pexelsURL, {
    headers: {
      Authorization: pexelsKey,
    },
  })
    .then((res) => {
      console.log("Status:", res.status);

      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella chiamata SEARCH");
      }
    })
    .then((data) => {
      console.log("Foto ricevute:", data.photos.length);

      const photos = data.photos;

      photos.forEach((photo, index) => {
        const card = allCards[index];
        if (!card) return;

        const img = card.querySelector("img");
        const title = card.querySelector(".card-title");
        const text = card.querySelector(".card-text");
        const small = card.querySelector("small.text-muted"); // ESERCIZIO 5

        img.src = photo.src.medium;
        img.alt = photo.alt || "Pexels photo";

        title.innerText = photo.photographer;
        text.innerText = photo.alt || "Foto da Pexels";
        small.innerText = photo.id; // ESERCIZIO 5

        console.log("ID messo nella card:", photo.id); // ESERCIZIO 5
      });
    })
    .catch((err) => {
      console.log("ERRORE SEARCH:", err);
      alert("Errore nella ricerca! Controlla console o API KEY.");
    });
});

// ESERCIZIO 3: cambio "Edit" in "Hide"
const allCardButtons = document.querySelectorAll(".album .card .btn-group button");

console.log("Bottoni trovati nelle card:", allCardButtons.length);

allCardButtons.forEach((btn) => {
  if (btn.innerText.trim() === "Edit") {
    btn.innerText = "Hide";
  }
});
console.log("Tutti i bottoni Edit sono diventati Hide");

//  CONTROLLo bottoni
console.log(" Bottone Load Images trovato?", loadImagesBtn);
console.log(" Bottone load Secondary Images trovato?", loadSecondaryBtn);
console.log(" Numero di card trovate:", allCards.length);

// ESERCIZIO 1: al click parte la fetch
loadImagesBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const pexelsURL = "https://api.pexels.com/v1/search?query=mountains&per_page=9";

  console.log("Sto chiamando:", pexelsURL);

  fetch(pexelsURL, {
    headers: {
      Authorization: pexelsKey,
    },
  })
    .then((res) => {
      console.log("Status:", res.status);

      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella chiamata Pexels");
      }
    })
    .then((data) => {
      console.log("Foto ricevute:", data.photos.length);

      const photos = data.photos;

      photos.forEach((photo, index) => {
        const card = allCards[index];
        if (!card) return;

        const img = card.querySelector("img");
        const title = card.querySelector(".card-title");
        const text = card.querySelector(".card-text");
        const small = card.querySelector("small.text-muted"); // Esercizio 5

        img.src = photo.src.medium;
        img.alt = photo.alt || "Pexels photo";

        title.innerText = photo.photographer;
        text.innerText = photo.alt || "Foto da Pexels";
        small.innerText = photo.id; // Esercizio 5

        console.log("ID messo nella card:", photo.id); // Esercizio 5

        // ESERCIZIO 7: click su immagine o titolo → pagina dettagli
        img.style.cursor = "pointer";
        title.style.cursor = "pointer";

        img.onclick = function () {
          location.assign(`./photo-details.html?photoId=${photo.id}`);
        };

        title.onclick = function () {
          location.assign(`./photo-details.html?photoId=${photo.id}`);
        };
      });
    })
    .catch((err) => {
      console.log("ERRORE:", err);
      alert("Errore! Controlla la API KEY oppure la console.");
    });
});

// ESERCIZIO 2: Load Secondary Images - al click parte la fetch
loadSecondaryBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const pexelsURL = "https://api.pexels.com/v1/search?query=tigers&per_page=9";

  console.log("Sto chiamando:", pexelsURL);

  fetch(pexelsURL, {
    headers: {
      Authorization: pexelsKey,
    },
  })
    .then((res) => {
      console.log("Status:", res.status);

      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella chiamata Pexels");
      }
    })
    .then((data) => {
      console.log("Foto ricevute:", data.photos.length);

      const photos = data.photos;

      photos.forEach((photo, index) => {
        const card = allCards[index];
        if (!card) return;

        const img = card.querySelector("img");
        const title = card.querySelector(".card-title");
        const text = card.querySelector(".card-text");
        const small = card.querySelector("small.text-muted"); // Esercizio 5

        img.src = photo.src.medium;
        img.alt = photo.alt || "Pexels photo";

        title.innerText = photo.photographer;
        text.innerText = photo.alt || "Foto da Pexels";
        small.innerText = photo.id; // Esercizio 5

        console.log("ID messo nella card:", photo.id); // Esercizio 5

        // ESERCIZIO 7: click su immagine o titolo → pagina dettagli
        img.style.cursor = "pointer";
        title.style.cursor = "pointer";

        img.onclick = function () {
          location.assign(`./photo-details.html?photoId=${photo.id}`);
        };

        title.onclick = function () {
          location.assign(`./photo-details.html?photoId=${photo.id}`);
        };
      });
    })
    .catch((err) => {
      console.log("ERRORE:", err);
      alert("Errore! Controlla la API KEY oppure la console.");
    });
});

// ESERCIZIO 4: quando clicco "Hide" la card sparisce
const hideButtons = document.querySelectorAll(".album .card .btn-group button:nth-of-type(2)");

console.log("Bottoni Hide trovati:", hideButtons.length);

hideButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    console.log("Click su Hide!");

    const col = btn.closest(".col-md-4"); // prendo la colonna che contiene la card
    if (col) {
      col.classList.add("d-none"); // la nasconde
      console.log("Card nascosta!");
    }
  });
});
