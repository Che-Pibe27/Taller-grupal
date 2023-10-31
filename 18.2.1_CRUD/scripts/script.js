
// LLinks API
const link_users = 'https://6540ffaf45bedb25bfc30910.mockapi.io/users'

//Cuadro de respuesta
const results = document.getElementById("results")

// GET
const btnGet1 = document.getElementById("btnGet1")
const inputGet1Id = document.getElementById("inputGet1Id")

btnGet1.addEventListener("click", ()=>{
    if (inputGet1Id.value != ''){
        //Muestra registro de ID especifico
        console.log("entre al if")
        fetch(link_users + inputGet1Id.value)
            .then(response => response.json())
            .then(data => {console.log(data);

                results.innerHTML = `<li>ID: ${data.id}</li>
                    <li>Name: ${data.name}</li>
                    <li>Last Name: ${data.last_name}</li>` 
        })
        .catch("error") 
    }
    else{
        //mostrar todos los registros
        fetch(link_users)
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    results.innerHTML += `<li>ID: ${element.id}</li>
                    <li>Name: ${element.name}</li>
                    <li>Last Name: ${element.last_name}</li>
                    <br>` 
                });
            })
    .catch("error")
    }
})


// POST
const btnPost = document.getElementById("btnPost")
const inputPostNombre = document.getElementById("inputPostNombre")
const inputPostApellido = document.getElementById("inputPostApellido")

btnPost.addEventListener("click", ()=>{
    if (inputPostNombre.value != '' && inputPostApellido != ''){
        /* El botón "Agregar" debe enviar al servidor un objeto construido con los valores introducidos por el usuario en los campos nombre y apellido. 
            Deberá mostrar como resultado el listado de registros, incluyendo el agregado. */

            console.log("entre al if")
            const data = {
                name: inputPostNombre.value,
                last_name: inputPostApellido.value
              };
              const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json' // Asegúrate de que el servidor espere datos JSON.
                },
                body: JSON.stringify(data)
              };
              fetch(link_users, requestOptions)
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Error en la solicitud POST');
                  }
                  return response.json(); // Si esperas una respuesta en JSON
                })
                .then(data => {
                  // Maneja la respuesta exitosa aquí
                  console.log('Solicitud POST exitosa:', data);
                })
                .catch(error => {
                  // Maneja errores aquí
                  console.error('Error en la solicitud POST:', error);
                });
    }
    else {
        alert("Falltan datos")
    }
})

// PUT
/* const btnPut = document.getElementById("btnPut")
const inputPutId = document.getElementById("inputPutId")

btnPut.addEventListener("click", ()=>{
    if (inputPutId.value != ''){
        
    }
    else {
        alert("Debe ingresar ID del registro")
    }
})

// DELETE
const btnDelete = document.getElementById("btnDelete")
const inputDelete = document.getElementById("inputDelete")

btnPost.addEventListener("click", ()=>{
    if (inputDelete.value != ''){
        
    }
    else {
        alert("Debe ingresar ID del registro")
    }
})
*/
