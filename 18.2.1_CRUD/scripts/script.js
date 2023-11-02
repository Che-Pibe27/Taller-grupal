
// LLinks API
const link_users = 'https://6540ffaf45bedb25bfc30910.mockapi.io/users'

//Cuadro de respuesta
const results = document.getElementById("results")

// Modal
const dataModal = document.getElementById('dataModal');
const modal = new bootstrap.Modal(dataModal);

// Función para mostrar toda la lista

async function mostrarLista() {
  //mostrar todos los registros
  fetch(link_users)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud GET');
      }
      return response.json(); // Si esperas una respuesta en JSON
    })
    .then(data => {
      console.log('Solicitud POST exitosa:', data);
      data.forEach(element => {
        results.innerHTML += `<li>ID: ${element.id}</li>
                    <li>Name: ${element.name}</li>
                    <li>Last Name: ${element.last_name}</li>
                    <br>`
      });
    })
    .catch(error => {
      // Maneja errores aquí
      console.error('Error en la solicitud GET:', error);
    });
}


// GET
const btnGet1 = document.getElementById("btnGet1")
const inputGet1Id = document.getElementById("inputGet1Id")

btnGet1.addEventListener("click", ()=>{
    if (inputGet1Id.value != ''){
        //Muestra registro de ID especifico
        console.log("entre al if")
        fetch(link_users + `/` + inputGet1Id.value)
            .then(response => {
              if (!response.ok) {
                throw new Error('Error en la solicitud POST');
              }
              return response.json(); // Si esperas una respuesta en JSON
            })
            .then(data => {console.log('Solicitud POST exitosa:', data);

                results.innerHTML = `<li>ID: ${data.id}</li>
                    <li>Name: ${data.name}</li>
                    <li>Last Name: ${data.last_name}</li>` 
        })
        .catch(error => {
          // Maneja errores aquí
          console.error('Error en la solicitud POST:', error);
        }); 
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
    if (inputPostNombre.value != '' && inputPostApellido.value != ''){
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
                  'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
              };
              fetch(link_users, requestOptions)
                .then(response => {
                  if (!response.ok) {
                    alert('Error en la solicitud POST');
                    throw new Error('Error en la solicitud POST');                    
                  }
                  return response.json(); 
                })
                .then(data => {
                  console.log('Solicitud POST exitosa:', data);
                  mostrarLista();
                })
                .catch(error => {
                  console.error('Error en la solicitud POST:', error);
                  alert('Error en la solicitud POST')
                });
    }
    else {
        alert("Falltan datos")
    }
})

// PUT
const btnSendChanges = document.getElementById("btnSendChanges")
const inputPutId = document.getElementById("inputPutId")
const inputPutNombre = document.getElementById("inputPutNombre")
const inputPutApellido = document.getElementById("inputPutApellido")
const btnPut = document.getElementById("btnPut")



btnPut.addEventListener("click", ()=>{
    if (inputPutId.value != ''){
      
      fetch(link_users + `/` + inputPutId.value)
                .then(response => {
                  if (!response.ok) {
                    alert('Error en la solicitud PUT')
                    throw new Error('Error en la solicitud PUT');                    
                  }
                  return response.json();
                  
                })
                  .then(data => {
                    console.log('Solicitud exitosa:', data);
                    inputPutNombre.value = data.name;
                    inputPutApellido.value = data.last_name;
                    modal.show();                  
                })       
    }
    else {
        alert("Debe ingresar ID del registro")
    }
})

btnSendChanges.addEventListener("click", ()=>{
  if (inputPutNombre.value != '' && inputPutApellido.value != ''){
      
          console.log("entre al if")
          const data = {
              name: inputPutNombre.value,
              last_name: inputPutApellido.value
            };
            const requestOptions = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            };
            fetch(link_users + `/` + inputPutId.value, requestOptions)
              .then(response => {
                if (!response.ok) {
                  alert('Error en la solicitud PUT');
                  throw new Error('Error en la solicitud PUT');                  
                }
                return response.json();
              })
              .then(data => {
                console.log('Solicitud PUT exitosa:', data);
                mostrarLista();
                modal.hide();
              })
              .catch(error => {
                console.error('Error en la solicitud PUT:', error);
                alert('Error en la solicitud PUT');
              });
  }
  else {
      alert("Falltan datos")
  }
})



// DELETE

const btnDelete = document.getElementById("btnDelete")
const inputDelete = document.getElementById("inputDelete")

btnDelete.addEventListener("click", ()=>{
    if (inputDelete.value != ''){
        fetch(link_users + `/` + inputDelete.value, {method: 'DELETE'})
              .then(response => {
                if (!response.ok) {
                  alert('Error en la solicitud DELETE');
                  throw new Error('Error en la solicitud DELETE');                  
                }
                return response.json();
              })
              .then(data => {
                console.log('Solicitud DELETE exitosa:', data);
                mostrarLista();
              })
              .catch(error => {
                console.error('Error en la solicitud DELETE:', error);
                alert('Error en la solicitud DELETE')
              });
    }
    else {
        alert("Debe ingresar ID del registro")
    }
})

