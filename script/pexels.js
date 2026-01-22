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

        // salvo info utili nella card per il modal
        card.dataset.large = photo.src.large2x || photo.src.large || photo.src.medium;
        card.dataset.photographer = photo.photographer;
        card.dataset.photographerUrl = photo.photographer_url;
        card.dataset.alt = photo.alt || "";
        card.dataset.id = photo.id;
        card.dataset.pexelsUrl = photo.url;

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

  const pexelsURL = "https://api.pexels.com/v1/search?query=sea&per_page=9";

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

        // salvo info utili nella card per il modal
        card.dataset.large = photo.src.large2x || photo.src.large || photo.src.medium;
        card.dataset.photographer = photo.photographer;
        card.dataset.photographerUrl = photo.photographer_url;
        card.dataset.alt = photo.alt || "";
        card.dataset.id = photo.id;
        card.dataset.pexelsUrl = photo.url;

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

// ESERCIZIO 9: clic su VIEW → apre immagine in MODAL

// creo il modal una sola volta e lo aggiungo al body
const modalContainer = document.createElement("div");
modalContainer.innerHTML = `
  <div class="modal fade" id="pexelsModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content bg-dark text-white border-0">

        <div class="modal-header border-0">
          <h5 class="modal-title">Preview</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body d-flex flex-column align-items-center">
          <div id="modalLoader" class="spinner-border text-light my-4" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>

          <img id="pexelsModalImg" src="" class="img-fluid rounded" alt="preview" style="display:none; max-height:75vh; object-fit:contain; cursor:zoom-in;">
          
          <div class="mt-3 w-100 text-start">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <strong id="modalPhotographerName"></strong>
                <a id="modalPhotographerLink" href="#" target="_blank" class="ms-2 text-info">Profilo</a>
              </div>
              <small class="text-secondary">ID: <span id="modalPhotoId"></span></small>
            </div>

            <p id="modalAlt" class="mt-2 text-secondary mb-2"></p>

            <a id="modalPexelsLink" class="btn btn-outline-light btn-sm" href="#" target="_blank">
              Apri su Pexels
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
`;
document.body.appendChild(modalContainer);

const pexelsModalEl = document.getElementById("pexelsModal");
const pexelsModal = new bootstrap.Modal(pexelsModalEl);

const modalImg = document.getElementById("pexelsModalImg");
const modalLoader = document.getElementById("modalLoader");
const modalPhotographerName = document.getElementById("modalPhotographerName");
const modalPhotographerLink = document.getElementById("modalPhotographerLink");
const modalAlt = document.getElementById("modalAlt");
const modalPhotoId = document.getElementById("modalPhotoId");
const modalPexelsLink = document.getElementById("modalPexelsLink");

// zoom toggle
modalImg.addEventListener("click", function () {
  if (modalImg.style.transform === "scale(1.8)") {
    modalImg.style.transform = "scale(1)";
    modalImg.style.cursor = "zoom-in";
  } else {
    modalImg.style.transform = "scale(1.8)";
    modalImg.style.cursor = "zoom-out";
  }
});

// Ascolta TUTTI i click che succedono nella pagina
document.addEventListener("click", function (e) {
  const btn = e.target;

  if (btn.tagName === "BUTTON" && btn.innerText.trim() === "View") {
    const card = btn.closest(".card");
    if (!card) return;

    // reset zoom
    modalImg.style.transform = "scale(1)";
    modalImg.style.cursor = "zoom-in";

    // spinner ON
    modalLoader.style.display = "inline-block";
    modalImg.style.display = "none";

    // prendo dati dalla card
    const bigSrc = card.dataset.large || card.querySelector("img").src;
    const photographer = card.dataset.photographer;
    const photographerUrl = card.dataset.photographerUrl;
    const alt = card.dataset.alt;
    const id = card.dataset.id;
    const pexelsUrl = card.dataset.pexelsUrl;

    // set info
    modalPhotographerName.innerText = photographer || "Unknown";
    modalPhotographerLink.href = photographerUrl || "#";
    modalAlt.innerText = alt || "";
    modalPhotoId.innerText = id || "";
    modalPexelsLink.href = pexelsUrl || "#";

    // carico immagine grande
    modalImg.onload = function () {
      modalLoader.style.display = "none";
      modalImg.style.display = "block";
    };

    modalImg.src = bigSrc;

    pexelsModal.show();
  }
});
