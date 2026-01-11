var destinacije = [
    { naziv: "Grčka", trajanje: 7, tip: "letovanje", slika: "/assets/img/grcka.jpg", cena: "499€", opis: "Hotel 4★, avionski prevoz, doručak." },
    { naziv: "Italija", trajanje: 4, tip: "city", slika: "/assets/img/italija.jpg", cena: "399€", opis: "Rim i Firenca, organizovane ture." },
    { naziv: "Turska", trajanje: 7, tip: "allinclusive", slika: "/assets/img/turska.jpg", cena: "459€", opis: "Resorti 5★, privatna plaža." },
    { naziv: "Španija", trajanje: 10, tip: "letovanje", slika: "/assets/img/spanija.jpg", cena: "699€", opis: "Barselona i Costa Brava." },
    { naziv: "Francuska", trajanje: 5, tip: "city", slika: "/assets/img/francuska.jpg", cena: "549€", opis: "Pariz, Versaj, Luvr." },
    { naziv: "Egipat", trajanje: 8, tip: "allinclusive", slika: "/assets/img/egipat.jpg", cena: "629€", opis: "Hurgada, hotel 5★." },
    { naziv: "Bali", trajanje: 10, tip: "egzoticno", slika: "/assets/img/bali.jpg", cena: "1299€", opis: "Tropske plaže, izleti i relaksacija." },
    { naziv: "Dubai", trajanje: 6, tip: "luksuz", slika: "/assets/img/dubai.jpg", cena: "999€", opis: "Hotel 5★, safari u pustinji." }
];

document.addEventListener("DOMContentLoaded", () => {

  // ======= PRIKAZ KARTICA =======
  const grid = document.getElementById("cardsGrid");
  destinacije.forEach(d => {
    grid.innerHTML += `
      <div class="card">
        <img src="${d.slika}" alt="${d.naziv}">
        <h3>${d.naziv}</h3>
        <p>${d.trajanje} dana • ${d.tip}</p>
        <p><strong>Cena:</strong> ${d.cena}</p>

        <div class="card-content">
          <p>${d.opis}</p>
        </div>

        <button class="prikaziJos">Prikaži još</button>
      </div>
    `;
  });

  // Dugmad "Prikaži još"
  var dugmici = document.getElementsByClassName("prikaziJos");
  for (var i = 0; i < dugmici.length; i++) {
    dugmici[i].addEventListener("click", function() {
      var roditelj = this.parentElement;
      var tekst = roditelj.getElementsByClassName("card-content")[0];
      if (tekst.classList.contains("show")) {
        tekst.classList.remove("show");
        this.textContent = "Prikaži još";
      } else {
        tekst.classList.add("show");
        this.textContent = "Prikaži manje";
      }
    });
  }

  

  // ======= POPUNJAVANJE SELECTA DESTINACIJA =======
  const destinationSelect = document.getElementById("destination");

  // Opcija "Izaberite destinaciju" na vrhu
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Izaberite destinaciju";
  destinationSelect.appendChild(defaultOption);

  destinacije.forEach(d => {
    const option = document.createElement("option");
    option.value = d.naziv;
    option.textContent = d.naziv;
    destinationSelect.appendChild(option);
  });
});

// ================= FORM ELEMENTI =================
const form = document.getElementById("contactForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const destination = document.getElementById("destination");
const message = document.getElementById("message");

// ================= REGEX =================
const nameRegex = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,}(\s[A-ZČĆŽŠĐ][a-zčćžšđ]{2,})+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ================= GREŠKE =================
function showError(input, text) {
    const error = input.parentElement.querySelector(".error");
    error.textContent = text;
    input.style.borderColor = "red";
}

function clearError(input) {
    const error = input.parentElement.querySelector(".error");
    error.textContent = "";
    input.style.borderColor = "#ccc";
}

// ================= VALIDACIJA =================
function validateForm() {
    let valid = true;

    if (!nameRegex.test(fullName.value.trim())) {
        showError(fullName, "Unesite ime i prezime (min. 3 slova po reči, velika početna slova).");
        valid = false;
    } else {
        clearError(fullName);
    }

    if (!emailRegex.test(email.value.trim())) {
        showError(email, "Email nije u ispravnom formatu.");
        valid = false;
    } else {
        clearError(email);
    }

    if (destination.value === "") {
        showError(destination, "Izaberite destinaciju.");
        valid = false;
    } else {
        clearError(destination);
    }

    if (message.value.trim().length < 10) {
        showError(message, "Poruka mora imati bar 10 karaktera.");
        valid = false;
    } else {
        clearError(message);
    }

    return valid;
}

// ================= SUBMIT =================
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
        form.reset();

        // Vizuelni feedback
        const inputs = [fullName, email, destination, message];
        inputs.forEach(input => input.style.borderColor = "green");

        let successMsg = document.createElement("div");
        successMsg.textContent = "Uspešno poslato!";
        successMsg.style.color = "green";
        successMsg.style.fontWeight = "600";
        successMsg.style.marginTop = "12px";
        successMsg.classList.add("success-message");

        form.appendChild(successMsg);

        setTimeout(() => {
            inputs.forEach(input => input.style.borderColor = "#ccc");
            successMsg.remove();
        }, 2000);
    }
});

document.querySelectorAll("input, textarea, select")
    .forEach(el => el.addEventListener("focus", () => {
        el.style.borderColor = "#0077ff";
    }));

const btn = form.querySelector("button");
form.addEventListener("input", () => {
    btn.disabled = !validateForm();
});
