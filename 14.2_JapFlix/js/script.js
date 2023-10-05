const API_URL = 'https://japceibal.github.io/japflix_api/movies-data.json';
const container = document.getElementById('lista');
const btnBuscar  = document.getElementById('btnBuscar');
const inputBuscar = document.getElementById('inputBuscar')
let movieArray = [];

fetch(API_URL)
.then(response => response.json())
.then(data => movieArray = data)
.then(createCards(movieArray))
.catch("error");

function createCards(array){
    container.innerHTML = ''
    for(let item of array){
        container.innerHTML += `
<div>
    <div class="cardText">
        <h2 class="title text-light">${item.title}</h2>
        <p class="tagline text-light">${item.tagline}</p>
    </div>
    <div class="score" id="${item.id}">
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span> 
          <span class="fa fa-star"></span> 
          <span class="fa fa-star"></span> 
          <span class="fa fa-star"></span>
    </div>    
</div>`

const starContainer = document.getElementById(`${item.id}`);
let estrellas = starContainer.querySelectorAll(".fa.fa-star");
console.log(estrellas)
estrellas.forEach((star, index) => {
   let voteAverage = item.vote_average / 2;
   if(index < Math.round(voteAverage)){
    star.classList.add('checked')
   } else {
    star.classList.add('text-light')
   }
})
    }
}



 btnBuscar.addEventListener('click', ()=> {
    if (inputBuscar.value !== '') {
        const searchTerm = inputBuscar.value.toLowerCase();
        
        const filteredMovies = movieArray.filter((movies) =>
        (movies?.title?.toLowerCase().includes(searchTerm) || 
        movies?.tagline?.toLowerCase().includes(searchTerm) || 
        movies?.overview?.toLowerCase().includes(searchTerm) ||
        (movies.genres.some((genre) => genre.name.toLowerCase().includes(searchTerm)))));

        createCards(filteredMovies); 
    }
    else {
        alert('Ingrese término de busqueda')
    }
}
)