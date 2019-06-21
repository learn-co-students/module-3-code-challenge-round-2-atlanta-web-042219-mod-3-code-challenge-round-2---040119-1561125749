

document.addEventListener('DOMContentLoaded', ()=>{

  showBeerList()
  document.addEventListener('click',clickEvent)
})

function showBeerList(){
  fetch("http://localhost:3000/beers/")
  .then(res=> res.json())
  .then(data => {
      showAllBeer(data)
  })
}

function showAllBeer(data){
  data.forEach(beer => {
      addBeer(beer)
  });
}

function addBeer(beer){
  const beer_list = document.getElementById("list-group")
  beer_list.innerHTML += `<li class="list-group-item" data-id="${beer.id}" >${beer.name}</li>`

}

function clickEvent(e){
  if(e.target.className === "list-group-item"){
      console.log(e.target)
      fetch(`http://localhost:3000/beers/${e.target.dataset.id}`)
      .then(res => res.json())
      .then(beer => {
        singleBeer(beer)
      })
}else if (e.target.className === "btn btn-info"){
  console.log(e.target.dataset.id)

  updateDescription(e.target.dataset.id)
}

}

function singleBeer(beer){
  const div = document.getElementById("beer-detail")
  div.innerHTML = 
  `<h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea id="desc">${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info" data-id="${beer.id}">
  Save
  </button>`
}

function updateDescription(beer_id){
  const desc = document.getElementById("desc")
  // console.log(desc.value)
  fetch(`http://localhost:3000/beers/${beer_id}`, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json',
      'Accept': 'application/json'},
      body: JSON.stringify({description: desc.value})
    }).then(resp => resp.json())
    .then(beer => {
        singleBeer(beer)
    })
}










