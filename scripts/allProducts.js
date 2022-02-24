const baseUrlApi = "https://fakestoreapi.com/products";
const dataLocalStorage = JSON.parse(localStorage.getItem("CATEGORYSHOW"));
const sectionProducts = document.getElementById("products");
const userLogIn = JSON.parse(localStorage.getItem('INFOUSERLOGIN'))

async function getData(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    return console.log(error);
  }
}

//Cambia la informacoón de los productos mostrados de acuerdo a la categoria seleccionada.
async function changeInfo(categorieFilter, arrayData) {
  let data = await getData(baseUrlApi);
  let infoFilter = data.filter((item) => item.category == categorieFilter);
  localStorage.setItem("CATEGORYSHOW", JSON.stringify(infoFilter));
  if (categorieFilter == undefined) {
    infoFilter = arrayData;
  }
  sectionProducts.innerHTML = "";
  infoFilter.forEach((item) => {
    const { id, title, image, price, rating } = item;
    sectionProducts.innerHTML += `
    <div class="card" style="width: 19em;">
        <img src="${image}" class="card-img-top" alt="${title}">
        <div class="card-body text-center d-flex flex-column ">
            <p class="card-text fs-4">${title}</p>
            <div class="infoPrice d-flex justify-content-around align-items-center">
                <p class="fs-5 mb-0"> $${price}USD </p>
                <div class="d-flex align-items-center justify-content-evenly">
                  <i class="fa-solid fa-star-half-stroke"></i>
                  <p class="mb-0" style="font-size: 16px;">  ${rating.rate}/5</p>
                </div>
            </div>
            <button class="btn btnSend mt-2" onclick="showDetail(${id})"> More info </button> 
        </div>
    </div>`;
  });
}

//Muestra alerta para notificar al usuario que debe seleccionar una categoria en caso que se recargue la página
if (JSON.parse(localStorage.getItem("CATEGORYSHOW")).length < 1) {
  window.addEventListener("DOMContentLoaded", () => {
    Swal.fire("Please select a category below to view their products.");
  });
}

//Carga los datos almacenados en el localStorage enviados de la página principal (index.js)
window.addEventListener("DOMContentLoaded", () => {
  changeInfo(undefined, dataLocalStorage);
});

//Envía los datos por medio del localStorage a la página de los detalles del producto.
async function showDetail(id) {
  let data = await getData(baseUrlApi);
  let infoSend = data.filter((item) => item.id === id);
  localStorage.setItem("DETAILPRODUCT", JSON.stringify(infoSend));
  window.location.href = "../pages/infoProduct.html";
}

//Se validará si existe el usuario logeado en el localStorage.
//Cambiará secciones del footer y se habilitará el boton del carrito de compras.
const changeTagA = document.getElementById('changeTagA')
const sectionNameUser = document.getElementById('sectionNameUser')
const cartShop = document.getElementById('cartShop')

if(Object.keys(userLogIn).length > 0){
  sectionNameUser.innerHTML = `
  <p class="nameUser text-center m-0 fw-bold fs-3"> ¡Bievenid@ ${userLogIn.name}! </p>`
  changeTagA.innerHTML = `<button id="buttonLogOut" onclick="logOut()"> Log out </button>`
  cartShop.removeAttribute('disabled')
}

//AL dar click en el botón logout, eliminará el estado anterior volviendo al inicial.
function logOut(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your session has been closed',
    showConfirmButton: false,
    timer: 1500
  })
  localStorage.removeItem('INFOUSERLOGIN')
  changeTagA.innerHTML = `
  <a href="./auth.html"> Login / SignUp </a>`
  sectionNameUser.innerHTML = ""
  cartShop.disabled = true
}