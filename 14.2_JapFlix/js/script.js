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
        let releaseDate = item.release_date;
        let dateComponents = releaseDate.split('-');
        let releaseYear = dateComponents[0];
        container.innerHTML += `
<div>
    <div class="cardText" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${item.id}" aria-controls="offcanvasTop">
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
    
    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${item.id}" aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">${item.title}</h5>

            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p>${item.overview}</p> 
            <hr> 
        </div>
        <section class="d-flex justify-content-between align-items-center p-2 mb-5">
            <div>
                <div class="d-flex justify-content-start genres">
                    <p>${item.genres.map(genre => genre.name).join(', ')}</p>
                </div>   
            </div>
            <div class="dropdown d-flex justify-content-end">
                    <button class="btn btn-secondary dropdown-toggle align-self-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        More
                    </button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">
                            <p><span class="fw-bold">Year:</span> <span class="float-end">${releaseYear}</span></p>
                        </li>
                        <li class="dropdown-item">
                            <p><span class="fw-bold">Runtime:</span> <span class="float-end">${item.runtime} Mins</span></p>
                        </li>
                        <li class="dropdown-item">
                            <p><span class="fw-bold">Budget:</span> <span class="float-end">$${item.budget}</span></p>
                        </li>
                        <li class="dropdown-item">
                            <p><span class="fw-bold">Revenue:</span> <span class="float-end">$${item.revenue}</span></p>
                        </li>
                    </ul>
            </div>
        </section>
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