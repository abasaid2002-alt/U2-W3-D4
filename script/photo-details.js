// API KEY
const pexelsKey = "6Nv4MyyKWPGeUDEUozx6hCtZK418duudhXL5TNA7M7eKgmogCAewfwss";

// prendo il parametro dall'URL con URLSearchParams
const params = new URLSearchParams(location.search);
const photoId = params.get("photoId");

console.log("Parametro photoId:", photoId);

const photoContainer = document.getElementById("photoContainer");
const backBtn = document.getElementById("backBtn");

// bottone indietro
backBtn.addEventListener("click", function () {
  history.back();
});

if (!photoId) {
  photoContainer.innerHTML = "<p class='text-danger'>Nessuna foto selezionata!</p>";
} else {
  fetch(`https://api.pexels.com/v1/photos/${photoId}`, {
    headers: {
      Authorization: pexelsKey,
    },
  })
    .then((res) => {
      console.log("Status dettagli:", res.status);

      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore caricamento dettagli foto");
      }
    })
    .then((photo) => {
      console.log("Dettagli foto:", photo);

      photoContainer.innerHTML = `
        <div class="card shadow-sm mx-auto" style="max-width: 900px;">
          <img src="${photo.src.large}" class="card-img-top" alt="${photo.alt || "Pexels photo"}">

          <div class="card-body">
            <h3 class="card-title">${photo.photographer}</h3>
            <p class="card-text">${photo.alt || ""}</p>

            <a class="btn btn-primary" href="${photo.photographer_url}" target="_blank">
              Pagina fotografo
            </a>

            <a class="btn btn-outline-secondary ms-2" href="${photo.url}" target="_blank">
              Apri su Pexels
            </a>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      console.log("ERRORE:", err);
      photoContainer.innerHTML = "<p class='text-danger'>Errore nel caricamento della foto.</p>";
    });
}
