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
const btnAddRound = document.querySelector("#btnAddRound");
const tableListaPuntos = document.querySelector("#tableListaPuntos");

var maxPuntos = 200;
const txtPuntosParaGanar = document.querySelector("#txtPuntosParaGanar");

const userAgent = window.navigator.userAgent;

// boton para llamar al procesamiento de imagenes CV significa 'computer vision'
const countCV1 = document.querySelector("#countCV1");
const countCV2 = document.querySelector("#countCV2");
const imageFile1 = document.querySelector("#imageFile1");
const imageFile2 = document.querySelector("#imageFile2");
const featureContainer = document.querySelector(".feature-container");
var loading = false;

var puntajes = []
var totalEquipo1 = 0;
var totalEquipo2 = 0;
var menuAbierto = false;
const miStorage = window.localStorage;

btnAgregarBono1.addEventListener("click", (e) => {
  e.preventDefault();
  let obtenerBono1LocalStorage = JSON.parse(miStorage.getItem("datosUsuario"))
  if (input.value == "") {
    input.value = parseInt(obtenerBono1LocalStorage.bono);
  } else if (input.value != "") {
    input.value = parseInt(input.value) + parseInt(obtenerBono1LocalStorage.bono);
  }

})

btnAgregarBono2.addEventListener("click", (e) => {
  e.preventDefault();
  let obtenerBono1LocalStorage = JSON.parse(miStorage.getItem("datosUsuario"))
  if (input2.value == "") {
    input2.value = parseInt(obtenerBono1LocalStorage.bono);
  } else if (input2.value != "") {
    input2.value = parseInt(input2.value) + parseInt(obtenerBono1LocalStorage.bono);
  }

})

btnSetting.addEventListener("click", () => {
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

btnGuardar.addEventListener("click", () => {
  let datosUsuario = {
    "equipo1": txtNombreEquipo1.value,
    "equipo2": txtNombreEquipo2.value,
    "bono": txtBono.value,
    "puntosParaGanar": 200

  }
  miStorage.setItem("datosUsuario", JSON.stringify(datosUsuario)) //json a texto para guardar en el local storage//
  cargarDatosUsuario();
  menuAbierto = false
  settingsMenu.classList.add("settings-menu-hide")
})

function cargarDatosUsuario() {
  let datosUsuariodelLocalStorage = JSON.parse(miStorage.getItem("datosUsuario"))
  lblNombreEquipo1.innerHTML = datosUsuariodelLocalStorage.equipo1;
  btnAgregarBono1.innerHTML = "+" + datosUsuariodelLocalStorage.bono
  btnAgregarBono2.innerHTML = "+" + datosUsuariodelLocalStorage.bono
  lblNombreEquipo2.innerHTML = datosUsuariodelLocalStorage.equipo2;
  maxPuntos = datosUsuariodelLocalStorage.puntosParaGanar ? datosUsuariodelLocalStorage.puntosParaGanar : 200;
  txtPuntosParaGanar.value = maxPuntos;
}

function getPuntos() {

  let puntajesLocalStorage = JSON.parse(miStorage.getItem("puntajes"))
  if (puntajesLocalStorage != null) {
    puntajesLocalStorage = puntajesLocalStorage.filter(puntos => puntos[0] != "" && puntos[1] != "")
    puntajes = puntajesLocalStorage;
  }

  calcularTotales();

}


function mostrarPuntos() {

  tableListaPuntos.innerHTML = "";
  puntajes.forEach(puntaje => {
    const tr = document.createElement("tr");
    const th1 = document.createElement("th");
    const th2 = document.createElement("th");
    const thAction = document.createElement("th");

    th1.innerHTML = puntaje[0];
    th2.innerHTML = puntaje[1];
    thAction.appendChild(addbtnDelete());

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(thAction);

    tableListaPuntos.appendChild(tr);
  })
  calcularTotales();
}

function calcularTotales() {
  totalEquipo1 = 0;
  totalEquipo2 = 0;
  puntajes.forEach(puntaje => {
    totalEquipo1 += parseInt(puntaje[0]);
    totalEquipo2 += parseInt(puntaje[1]);
  }
  )

  spanTotalEquipo1.innerHTML = totalEquipo1;
  spanTotalEquipo2.innerHTML = totalEquipo2;
}

btnReset.addEventListener("click", () => {
  localStorage.removeItem("puntajes");
  puntajes = [];
  mostrarPuntos();
}
)

function addbtnDelete() {
  const deleteBtn = document.createElement('button')

  deleteBtn.textContent = "X"
  deleteBtn.className = "btn btn-outline-danger"
  deleteBtn.style = 'font-weight:bold;'

  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement.parentElement;
    const index = Array.from(tableListaPuntos.children).indexOf(item); // Obtener el índice del elemento

    // Eliminar el elemento del arreglo puntajes
    puntajes.splice(index, 1);

    // Actualizar el localStorage con el nuevo arreglo de puntos
    miStorage.setItem("puntajes", JSON.stringify(puntajes));

    // Eliminar el elemento del DOM
    tableListaPuntos.removeChild(item);

    // Recalcular el total del equipo 1 y actualizar la UI
    calcularTotales();
  })

  return deleteBtn;
}

function addbtnDelete2() {
  const deleteBtn = document.createElement('button')

  deleteBtn.textContent = "X"
  deleteBtn.className = "btn btn-outline-danger text-danger"
  deleteBtn.style = 'border-radius:100%;width:40px;height:40px;'

  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    const index = Array.from(ulequipo2.children).indexOf(item); // Obtener el índice del elemento

    // Eliminar el elemento del arreglo puntajeEquipo2
    puntajeEquipo2.splice(index, 1);

    // Actualizar el localStorage con el nuevo arreglo de puntos para equipo2
    miStorage.setItem("equipo2", puntajeEquipo2);

    // Eliminar el elemento del DOM
    ulequipo2.removeChild(item);

    // Recalcular el total del equipo 2 y actualizar la UI
    calcularTotalEquipo2();
  })

  return deleteBtn;
}

countCV1.addEventListener("click",(e) => {
  e.preventDefault();
  imageFile1.click();
})

imageFile1.addEventListener("change", async (e) => {
  e.preventDefault();
  countCV(imageFile1).then((result) => {
    input.value = result.points;
  });
})

countCV2.addEventListener("click",(e) => {
  e.preventDefault();
  imageFile2.click();
})

imageFile2.addEventListener("change", async (e) => {
  e.preventDefault();
  countCV(imageFile2).then((result) => {
    input2.value = result.points;
  });
})

async function countCV(imageFile) {
  loading = true;
  loadingState();
  try {
  const formData = new FormData();
  formData.append("image", imageFile.files[0]);
  const response = await fetch("https://domino.bydpropertiesllc.com/countPoints", {
    method: "POST",
    body: formData,
  }).finally(() => {
    loading = false;
    loadingState();
  });
  const result = await response.json();
  return result;
  } catch (error) {
    alert(error);
  }
}

function loadingState () {
  const loaderContainer = document.querySelector(".loader-container");
  const loader = document.querySelector(".lds-spinner");
  if (loading == false) {
    loaderContainer.classList.add("hide-feature");
    loader.classList.add("hide-feature");
  } else {
    loaderContainer.classList.remove("hide-feature");
    loader.classList.remove("hide-feature");
  }
}

btnAddRound.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value == "") {
    input.value = 0;
  }

  if (input2.value == "") {
    input2.value = 0;
  }

  puntajes.push([input.value, input2.value]);
  miStorage.setItem("puntajes", JSON.stringify(puntajes));

  mostrarPuntos();

  input.value = "";
  input2.value = "";
})

cargarDatosUsuario();
getPuntos();
mostrarPuntos();
loadingState();

