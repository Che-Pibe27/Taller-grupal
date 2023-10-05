const API_URL = 'https://japceibal.github.io/japflix_api/movies-data.json';
const container = document.getElementById('lista');
const btnBuscar  = document.getElementById('btnBuscar');
const inputBuscar = document.getElementById('inputBuscar')

fetch(API_URL)
.then(response => response.json())
.then(data => createCards(data))
.catch("error");




function createCards(obj){
    container.innerHTML += `
<div>
    <div class="cardText">
        <h2 class="title">${obj.title}</h2>
        <p class="tagline">${obj.tagline}</p>
    </div>
    <div class="score">
        <p class="score">${obj.vote_average}</p>
    </div>    
</div>`;
}




 btnBuscar.addEventListener('click', ()=> {
    if (inputBuscar.value !== '') {
        let filterData = [];
        const searchTerm = inputBuscar.value.toLowerCase();
        const filteredProducts = filterData.filter((movies) =>
        (movies?.title?.toLowerCase().includes(searchTerm) || 
        movies?.tagline?.toLowerCase().includes(searchTerm) || 
        movies?.overview?.toLowerCase().includes(searchTerm) ||
        movies?.generes?.toLowerCase().includes(searchTerm))
        );
        createCards(filteredProducts); 
    }
}
)





/*async function fetchData() {
    await fetch(PRODUCT_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch("error");
  }
  console.log(fetchData());*/

  /*function initialize() {
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredProducts = filterData.filter((product) => 
      (product?.name?.toLowerCase().includes(searchTerm) || product?.description?.toLowerCase().includes(searchTerm))
      );
      createProducts(filteredProducts);
    });*/