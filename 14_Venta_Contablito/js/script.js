const navRegister = document.getElementById("nav__register");
const navMovements = document.getElementById("nav__movements");
const registerForm = document.getElementById("register");
const movementsForm = document.getElementById("movement");
let navElements = [navRegister, navMovements];
let forms = [registerForm, movementsForm];

function switchForm() {
  navElements.forEach((item) => {
    item.classList.toggle("active");
  });
  forms.forEach((form) => {
    form.classList.toggle("hidden");
  });
}

navRegister.addEventListener("click", switchForm);
navMovements.addEventListener("click", switchForm);
