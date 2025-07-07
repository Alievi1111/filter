const filterForm = document.querySelector("#filterForm");

filterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fetchData();
});

function fetchData() {
  const name = document.querySelector("#name").value;
  const species = document.querySelector("#species").value;

  let url = "https://rickandmortyapi.com/api/character";

  let params = [];

  // http://rickandmortyapi.com/api/character?name=rick&species=human

  if (name !== "") {
    params.push(`name=${name}`);
  }
  if (species !== "") {
    params.push(`species=${species}`);
  }

  if (params.length > 0) {
    url += "?" + params.join("&");
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.results) {
        displayResults(data.results);
      } else {
        displayResults([]);
      }
    });
}

//                       [   ]
function displayResults(characters) {
  const results = document.querySelector("#results");
  results.innerHTML = "";

  if (characters.length === 0) {
    results.innerHTML = "<p>No results found</p>";
  }

  characters.forEach(function (eachElement) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h4>${eachElement.name}</h4> <p>${eachElement.species}</p>     <img src="${eachElement.image}" alt="${eachElement.name}">`;

    results.appendChild(card);
  });
}
