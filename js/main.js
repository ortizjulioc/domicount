const input = document.querySelector('.ipequipo1');
const addbtn1 = document.querySelector('#btn1');
const ulequipo1 = document.querySelector('.ulequipo1');

const input2 = document.querySelector('.ipequipo2');
const addbtn2 = document.querySelector('.voton2');
const ulequipo2 = document.querySelector('.ulequipo2');
const spanTotalEquipo1 = document.querySelector("#totalEquipo1")
const spanTotalEquipo2 = document.querySelector("#totalEquipo2")

var puntajeEquipo1 = []
var puntajeEquipo2 = []
var totalEquipo1 = 0;
var totalEquipo2 = 0;

const miStorage = window.localStorage;
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
  puntajeEquipo1.push(text);
  miStorage.setItem("equipo1", puntajeEquipo1)
  getPuntos();
  mostrarPuntos();

  input.value = "";
});

addbtn2.addEventListener("click", (e) => {
  e.preventDefault();

  const text = input2.value;
  puntajeEquipo2.push(text);
  miStorage.setItem("equipo2",puntajeEquipo2)
  getPuntos();
  mostrarPuntos();

  input2.value = "";

});
getPuntos();
mostrarPuntos();

