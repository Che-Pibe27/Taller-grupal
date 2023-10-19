const submitBtn = document.getElementById('submitBtn');

function validate() {
    const email = document.getElementById("email");
    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");
    const checkbox = document.getElementById('terminos');
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const modalTerminos = document.getElementById("modalTerminos");
    let btnModalTerminos = document.getElementById("btnModalTerminos");

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(email.value)) {
      email.setCustomValidity('Los datos del email son incorrectos');
    } else if (password1.length < 6) {
      password1.setCustomValidity('La contraseña debe ser de 6 caracteres o más')
    } else if (password1.value !== password2.value) {
        password2.setCustomValidity('Las contraseñas deben coincidir')
    } else if (!checkbox.checked){
        btnModalTerminos.classList.add('text-danger');
        modalTerminos.setCustomValidity('¡Debes aceptar los términos y condiciones!')
    } else if( nombre.value == '' || apellido.value == '' || email.value == '' || password1 == '' || password2 == ''){
        nombre.setCustomValidity('¡Debes rellenar todos los campos!');
        apellido.setCustomValidity('¡Debes rellenar todos los campos!');
        email.setCustomValidity('¡Debes rellenar todos los campos!');
        password1.setCustomValidity('¡Debes rellenar todos los campos!');
        password2.setCustomValidity('¡Debes rellenar todos los campos!');
    } else {
        password2.setCustomValidity('');
        email.setCustomValidity('');
        btnModalTerminos.classList.remove('text-danger');
        return Swal.fire({
            icon: "success",
            title: "¡Datos Correctos!",
            confirmButtonText: "Aceptar",
        });
        nombre.setCustomValidity('');
        apellido.setCustomValidity('');
        password1.setCustomValidity('');
        checkbox.setCustomValidity('');
    }
  }

submitBtn.addEventListener('click', validate);

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()