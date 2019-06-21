document.addEventListener("DOMContentLoaded", ()=>{
console.log("Yay!! Made with 💙💛🧡 by Deka")
const BEER_URL = "http://localhost:3000/beers/"
const leftBeerList = document.getElementById("list-group")
const detailsDiv = document.getElementById("beer-detail")

leftBeerList.addEventListener("click", showBeer)
document.addEventListener("click", updateBeer)

fetch(BEER_URL)
.then(resp=> resp.json())
.then(beer=>{
    renderBeers(beer)})

///render beer////
function renderBeers(beer){
    beer.map(b=>{
        return leftBeerList.innerHTML += `<li class="list-group-item" data-id="${b.id}">${b.name}</li>`
    })
}

////show beer details////
function showBeer(e){
    let id = e.target.dataset.id

    fetch(BEER_URL + `${id}`)
    .then(resp=> resp.json())
    .then(beer=>{
        detailsDiv.innerHTML = `<h1>${beer.name}</h1>
        <img src=${beer.image_url}>
        <h3>${beer.tagline}</h3>
        <textarea id="description">${beer.description}</textarea>
        <button id="${beer.id}" class="btn btn-info">
          Save
        </button>`
    })
}

///edit beer////
function updateBeer(e){
    let beerDescription = document.getElementById("description")

    e.preventDefault()

    if(e.target.className === "btn btn-info"){
    let newDescription = beerDescription.value
    let id = e.target.id
    
    fetch(BEER_URL + `${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        body: JSON.stringify({description: newDescription})
    }).then(resp=> resp.json())
    }
}










})