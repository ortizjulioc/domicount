const input = document.querySelector('.ipequipo1');
const addbtn1 = document.querySelector('#btn1');
const ulequipo1 = document.querySelector('.ulequipo1');

const input2 = document.querySelector('.ipequipo2');
const addbtn2 = document.querySelector('.voton2');
const ulequipo2 = document.querySelector('.ulequipo2');
const spanTotalEquipo1 = document.querySelector("#totalEquipo1")
const spanTotalEquipo2 = document.querySelector("#totalEquipo2")

const settingsMenu = document.querySelector("#settings");
const txtBono = document.querySelector("#txtBono");
const txtNombreEquipo1 = document.querySelector("#txtNombreEquipo1");
const txtNombreEquipo2 = document.querySelector("#txtNombreEquipo2");
const btnGuardar = document.querySelector("#btnGuardar");
const btnCancelar = document.querySelector("#btnCancelar");
const btnSetting = document.querySelector("#btnSetting");
const btnReset = document.querySelector("#btnReset");
const btnAgregarBono1 = document.querySelector("#agregarBono1")
const btnAgregarBono2 = document.querySelector("#agregarBono2")
const lblNombreEquipo1 = document.querySelector("#lblNombreEquipo1");
const lblNombreEquipo2 = document.querySelector('#lblNombreEquipo2');

var puntajeEquipo1 = []
var puntajeEquipo2 = []
var totalEquipo1 = 0;
var totalEquipo2 = 0;
var menuAbierto = false;
const miStorage = window.localStorage;

btnAgregarBono1.addEventListener("click",(e) => {
  e.preventDefault();
  let obtenerBono1LocalStorage = JSON.parse(miStorage.getItem("datosUsuario"))
  if (input.value == ""){
    input.value = parseInt(obtenerBono1LocalStorage.bono); 
  }else if (input.value != ""){
    input.value = parseInt(input.value) + parseInt(obtenerBono1LocalStorage.bono); 
  }
  
})

btnAgregarBono2.addEventListener("click",(e) => {
  e.preventDefault();
  let obtenerBono1LocalStorage = JSON.parse(miStorage.getItem("datosUsuario"))
  if (input2.value == ""){
    input2.value = parseInt(obtenerBono1LocalStorage.bono); 
  }else if (input2.value != ""){
    input2.value = parseInt(input2.value) + parseInt(obtenerBono1LocalStorage.bono); 
  }
  
})

btnSetting.addEventListener("click",() => {
  if (menuAbierto == false) {
    settingsMenu.classList.remove("settings-menu-hide")
    menuAbierto = true
  } else {
    settingsMenu.classList.add("settings-menu-hide")
    menuAbierto = false
  }
}
)
btnCancelar.addEventListener("click", () => {
  menuAbierto = false
  settingsMenu.classList.add("settings-menu-hide")
  txtNombreEquipo1.value = ""
  txtNombreEquipo2.value = ""
  txtBono.value = ""
}) 

btnGuardar.addEventListener("click" ,() => {
  let datosUsuario = {
    "equipo1":txtNombreEquipo1.value,
    "equipo2":txtNombreEquipo2.value,
    "bono":txtBono.value
    
  }
  miStorage.setItem("datosUsuario",JSON.stringify(datosUsuario)) //json a texto para guardar en el local storage//
  console.log (JSON.parse(miStorage.getItem("datosUsuario")))
  let datosUsuariodelLocalStorage = JSON.parse(miStorage.getItem("datosUsuario"))
  console.log(datosUsuariodelLocalStorage.equipo1)
  console.log(datosUsuariodelLocalStorage.equipo2)
  console.log(datosUsuariodelLocalStorage.bono)
  cargarDatosUsuario();
  menuAbierto = false
  settingsMenu.classList.add("settings-menu-hide")
}) 

function cargarDatosUsuario () {
  let datosUsuariodelLocalStorage = JSON.parse(miStorage.getItem("datosUsuario"))
  lblNombreEquipo1.innerHTML = datosUsuariodelLocalStorage.equipo1;
  btnAgregarBono1.innerHTML = datosUsuariodelLocalStorage.bono
  btnAgregarBono2.innerHTML = datosUsuariodelLocalStorage.bono
  lblNombreEquipo2.innerHTML = datosUsuariodelLocalStorage.equipo2;
}
function getPuntos() {
  
  let puntosEquipo1 = miStorage.getItem("equipo1")
  if (puntosEquipo1!= null ) {
  puntosEquipo1 = puntosEquipo1.split(",")
  puntajeEquipo1 = puntosEquipo1
  console.log(puntosEquipo1)
  }
 
  let puntosEquipo2 = miStorage.getItem("equipo2")
  if (puntosEquipo2!= null ) {
  puntosEquipo2 = puntosEquipo2.split(",")
  puntajeEquipo2 = puntosEquipo2
  console.log(puntosEquipo2)
}
}


function mostrarPuntos() {

  ulequipo1.innerHTML = "";
  puntajeEquipo1.forEach(punto => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = punto;
    li.appendChild(p);
    ulequipo1.appendChild(li)
  })

  ulequipo2.innerHTML = "";
  puntajeEquipo2.forEach(punto => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = punto;
    li.appendChild(p);
    ulequipo2.appendChild(li)
  })
  calcularTotalEquipo1();
  calcularTotalEquipo2();
}

function calcularTotalEquipo1() {
  totalEquipo1 = 0;
  puntajeEquipo1.forEach(punto => {
    totalEquipo1 = totalEquipo1 + parseInt(punto);
  })
  spanTotalEquipo1.innerHTML = totalEquipo1;
}

function calcularTotalEquipo2() {
  totalEquipo2 = 0;
  puntajeEquipo2.forEach(punto => {
    totalEquipo2 = totalEquipo2 + parseInt(punto);
  })
  spanTotalEquipo2.innerHTML = totalEquipo2;
}

addbtn1.addEventListener("click", (e) => {
  e.preventDefault();

  const text = input.value;
  if (input.value !== "") {
  puntajeEquipo1.push(text);
  miStorage.setItem("equipo1", puntajeEquipo1)
  getPuntos();
  mostrarPuntos();
  }
  input.value = "";
});

addbtn2.addEventListener("click", (e) => {
  e.preventDefault();

  const text = input2.value;
  if (input2.value !== "") {
  puntajeEquipo2.push(text);
  miStorage.setItem("equipo2",puntajeEquipo2)
  getPuntos();
  mostrarPuntos();
  }
  input2.value = "";

});

btnReset.addEventListener("click",() => {
 localStorage.removeItem("equipo1");
 localStorage.removeItem("equipo2");
 location.reload()
}
)
cargarDatosUsuario ()
getPuntos();
mostrarPuntos();


