const cohort = "2304-FTB-ET-WEB-FT"
const baseURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohort}`;

const cards = document.getElementById("cards");
const currentRoster = []

let allPlayers = []
let selectedPlayer = undefined


async function fetchPlayers () {
  try {
    let response = await fetch(`${baseURL}/players`);
    console.log(response);

    let translatedData = await response.json(); 

    let actualPlayers = translatedData.data.players;

    console.log("Actual players are:", actualPlayers);
    
    return actualPlayers;

  } catch (error) {
    console.log("Fetch players", error);
  }
}

async function renderPlayers() {
  let allPlayers = await fetchPlayers();
  try {
    for (let i = 0; i < allPlayers.length; i++){
      let currentPlayerObject = allPlayers[i];
      cards.appendChild(newPuppy(currentPlayerObject));
    }
  } catch (error) {
    console.log(error)  
  }
}

async function renderRoster() {
let rosterContainer = document.getElementById("roster-list");
rosterContainer.innerHTML=""
  try {
    for (let i = 0; i < currentRoster.length; i++){
      let currentRosterObject = currentRoster[i];
      rosterContainer.appendChild(newPuppy(currentRosterObject));
    }

  } catch (error) {
    console.log(error)  
  }
}

function newPuppy (pup) {

  let puppyCard = document.createElement("div");
  puppyCard.className = "player-card";

  let nameBreed = document.createElement("div");
  nameBreed.className = "name-breed";
  
  let picture = document.createElement("div");
  picture.className = "image";

  let name = document.createElement("h4");
  name.className = "name";
  name.innerText = pup.name;

  let breed = document.createElement("h4");
  breed.className = "breed";
  breed.innerText = pup.breed;

  let image = document.createElement("img");
  image.src = pup.imageUrl;

  picture.appendChild(image)
  nameBreed.appendChild(name)
  nameBreed.appendChild(breed)

  puppyCard.appendChild(nameBreed)
  puppyCard.appendChild(picture)

  puppyCard.addEventListener("click", () => {
    selectAPup (pup)
  })
  return puppyCard;
}

function selectAPup (pup) {
let html = 
` <h1> Selected Puppy: </h1>
<div class="selected-pup-display">
    <img id="pup-selected-img" src="${pup.imageUrl}" />
      <h3>Name: ${pup.name}</h3>

      <h3>Pup ID: ${pup.id}</h3>

      <h3>Bench Status: ${pup.status}</h3>
</div>`

let selectedPlayerElement = document.getElementById("selected-player-content")
selectedPlayerElement.innerHTML = html
selectedPlayer = pup

let button = document.createElement("button")

  if (currentRoster.includes(pup)) {
 
      button.innerText = "Remove from Roster"
      button.onclick = () => {
        removeFromCurrentRoster(pup);
      }
    console.log("We found pup in roster")
  } else {
    button.innerText = "Add to Roster"
    console.log("We did not find pup in roster")
      button.onclick = () => {
        addToCurrentRoster(pup);
      }
  }
  selectedPlayerElement.appendChild(button)
}


function addToCurrentRoster (pup) {

currentRoster.push(pup)
console.log(currentRoster)
selectAPup(pup)
renderRoster()
}

function removeFromCurrentRoster (pup) {
  let index = currentRoster.findIndex( (element) => {
    if (element.id === pup.id) {
      return true
    }
    return false
  })
  if (index !== false) {
    currentRoster.splice(index, 1)
  }
  console.log(currentRoster)

  selectAPup(pup)
  renderRoster()
}

renderPlayers();


