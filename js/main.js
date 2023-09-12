const ulequipo1 = document.querySelector('.ulequipo1');
const ulequipo2 = document.querySelector('.ulequipo2');
const spanTotalEquipo1 = document.querySelector("#totalEquipo1")
const spanTotalEquipo2 = document.querySelector("#totalEquipo2")

const settingsMenu = document.querySelector("#settings");
const btnGuardar = document.querySelector("#btnGuardar");
const btnCancelar = document.querySelector("#btnCancelar");
const btnSetting = document.querySelector("#btnSetting");
const btnReset = document.querySelector("#btnReset");
const btnAgregarBono1 = document.querySelector("#agregarBono1")
const btnAgregarBono2 = document.querySelector("#agregarBono2")
const lblNombreEquipo1 = document.querySelector("#lblNombreEquipo1");
const lblNombreEquipo2 = document.querySelector('#lblNombreEquipo2');

// boton para llamar al procesamiento de imagenes CV significa 'computer vision'

const imageFile1 = document.querySelector("#imageFile");
const btnAddCV = document.querySelector("#btnAddCV");

const featureContainer = document.querySelector(".feature-container");
var loading = false;

var puntajeEquipo1 = []
var puntajeEquipo2 = []
var totalEquipo1 = 0;
var totalEquipo2 = 0;
var menuAbierto = false;

const btnNum1 = document.querySelector("#btnNum1");
const btnNum2 = document.querySelector("#btnNum2");
const btnNum3 = document.querySelector("#btnNum3");
const btnNum4 = document.querySelector("#btnNum4");
const btnNum5 = document.querySelector("#btnNum5");
const btnNum6 = document.querySelector("#btnNum6");
const btnNum7 = document.querySelector("#btnNum7");
const btnNum8 = document.querySelector("#btnNum8");
const btnNum9 = document.querySelector("#btnNum9");
const btnNum0 = document.querySelector("#btnNum0");
const btnBonus = document.querySelector("#btnBonus");
const btnClear = document.querySelector("#btnClear");
const btnAddEquipo1 = document.querySelector("#btnAddEquipo1");
const btnAddEquipo2 = document.querySelector("#btnAddEquipo2");

const txtPuntos = document.querySelector("#txtPuntos");

const miStorage = window.localStorage;

btnSetting.addEventListener("click", () => {
  if (menuAbierto == false) {
    settingsMenu.classList.remove("settings-menu-hide")
    menuAbierto = true
  } else {
    settingsMenu.classList.add("settings-menu-hide")
    menuAbierto = false
  }
})

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
    "bono": txtBono.value

  }
  miStorage.setItem("datosUsuario", JSON.stringify(datosUsuario)) //json a texto para guardar en el local storage//
  console.log(JSON.parse(miStorage.getItem("datosUsuario")))
  let datosUsuariodelLocalStorage = JSON.parse(miStorage.getItem("datosUsuario"))
  console.log(datosUsuariodelLocalStorage.equipo1)
  console.log(datosUsuariodelLocalStorage.equipo2)
  console.log(datosUsuariodelLocalStorage.bono)
  cargarDatosUsuario();
  menuAbierto = false
  settingsMenu.classList.add("settings-menu-hide")
})

function cargarDatosUsuario() {
  let datosUsuariodelLocalStorage = JSON.parse(miStorage.getItem("datosUsuario"))
  lblNombreEquipo1.innerHTML = datosUsuariodelLocalStorage.equipo1;
  lblNombreEquipo2.innerHTML = datosUsuariodelLocalStorage.equipo2;
}

function getPuntos() {

  let puntosEquipo1 = miStorage.getItem("equipo1")
  if (puntosEquipo1 != null) {
    puntosEquipo1 = puntosEquipo1.split(",")
    // delete elements with ''
    puntosEquipo1 = puntosEquipo1.filter((element) => {
      return element != '';
    });

    puntajeEquipo1 = puntosEquipo1
    console.log(puntosEquipo1)
  }

  let puntosEquipo2 = miStorage.getItem("equipo2")
  if (puntosEquipo2 != null) {
    puntosEquipo2 = puntosEquipo2.split(",")
    puntosEquipo2 = puntosEquipo2.filter((element) => {
      return element != '';
    });
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
    li.appendChild(addbtnDelete1());
    li.className = 'd-flex mt-3'
    ulequipo1.appendChild(li)
  })

  ulequipo2.innerHTML = "";
  puntajeEquipo2.forEach(punto => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = punto;
    li.appendChild(p);
    li.appendChild(addbtnDelete2());
    li.className = 'd-flex mt-3'
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

btnReset.addEventListener("click", () => {
  localStorage.removeItem("equipo1");
  localStorage.removeItem("equipo2");
  location.reload()
}
)

function addbtnDelete1() {
  const deleteBtn = document.createElement('button')

  deleteBtn.textContent = "x";
  deleteBtn.className = "btn btn-outline-danger btn-sm text-danger"
  deleteBtn.style = "border-radius: 100%;width: 30px;height: 30px;"

  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    const index = Array.from(ulequipo1.children).indexOf(item); // Obtener el índice del elemento

    // Eliminar el elemento del arreglo puntajeEquipo1
    puntajeEquipo1.splice(index, 1);

    // Actualizar el localStorage con el nuevo arreglo de puntos para equipo1
    miStorage.setItem("equipo1", puntajeEquipo1);

    // Eliminar el elemento del DOM
    ulequipo1.removeChild(item);

    // Recalcular el total del equipo 1 y actualizar la UI
    calcularTotalEquipo1();
  })

  return deleteBtn;
}

function addbtnDelete2() {
  const deleteBtn = document.createElement('button')

  deleteBtn.textContent = "x";
  deleteBtn.className = "btn btn-outline-danger btn-sm text-danger"
  deleteBtn.style = "border-radius: 100%;width: 30px;height: 30px;"

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


function showCVfeature() {
  user_platform = window.navigator.userAgent;
  if (user_platform.includes("Android") || user_platform.includes("iPhone")) {
    countCV1.classList.remove("hide-feature");
    countCV2.classList.remove("hide-feature");
    featureContainer.classList.remove("hide-feature");
  } else {
    countCV1.classList.add("hide-feature");
    countCV2.classList.add("hide-feature");
    featureContainer.classList.add("hide-feature");
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

btnNum1.addEventListener("click", (e) => {
  e.preventDefault();
  txtPuntos.value = txtPuntos.value + "1";
})

btnNum2.addEventListener("click", (e) => {
  e.preventDefault();
  txtPuntos.value = txtPuntos.value + "2";
})

btnNum3.addEventListener("click", (e) => {

  e.preventDefault();

  txtPuntos.value = txtPuntos.value + "3";

})

btnNum4.addEventListener("click", (e) => {
  e.preventDefault();
  txtPuntos.value = txtPuntos.value + "4";
})

btnNum5.addEventListener("click", (e) => {
  e.preventDefault();
  txtPuntos.value = txtPuntos.value + "5";
})

btnNum6.addEventListener("click", (e) => {
  e.preventDefault();
  txtPuntos.value = txtPuntos.value + "6";
})

btnNum7.addEventListener("click", (e) => {
  e.preventDefault();
  txtPuntos.value = txtPuntos.value + "7";
})

btnNum8.addEventListener("click", (e) => {
  e.preventDefault();
  txtPuntos.value = txtPuntos.value + "8";
})

btnNum9.addEventListener("click", (e) => {
  e.preventDefault();
  txtPuntos.value = txtPuntos.value + "9";
})

btnNum0.addEventListener("click", (e) => {
  e.preventDefault();
  txtPuntos.value = txtPuntos.value + "0";
})

btnBonus.addEventListener("click", (e) => {
  e.preventDefault();
  let obtenerBono1LocalStorage = JSON.parse(miStorage.getItem("datosUsuario"))
  if (txtPuntos.value == "") {
    txtPuntos.value = parseInt(obtenerBono1LocalStorage.bono ? obtenerBono1LocalStorage.bono : 30);
  } else if (txtPuntos.value != "") {
    txtPuntos.value = parseInt(txtPuntos.value) + parseInt(obtenerBono1LocalStorage.bono ? obtenerBono1LocalStorage.bono : 30);
  }
})

btnClear.addEventListener("click", (e) => {
  e.preventDefault();
  txtPuntos.value = "";
})

btnAddEquipo1.addEventListener("click", (e) => {
  e.preventDefault();
  if (txtPuntos.value != "") {
    puntajeEquipo1.push(txtPuntos.value);
    miStorage.setItem("equipo1", puntajeEquipo1)
    getPuntos();
    mostrarPuntos();
    txtPuntos.value = "";
  }

})

btnAddEquipo2.addEventListener("click", (e) => {
  e.preventDefault();
  if (txtPuntos.value != "") {
    puntajeEquipo2.push(txtPuntos.value);
    miStorage.setItem("equipo2", puntajeEquipo2)
    getPuntos();
    mostrarPuntos();
    txtPuntos.value = "";
  }
})

btnAddCV.addEventListener("click", (e) => {
  e.preventDefault();
  imageFile1.click();
})

imageFile1.addEventListener("change", async (e) => {
  const result = await countCV(imageFile1);
  if (result) {
    txtPuntos.value = result.points;
  }
})







cargarDatosUsuario ()
getPuntos();
mostrarPuntos();
loadingState();
// showCVfeature();

