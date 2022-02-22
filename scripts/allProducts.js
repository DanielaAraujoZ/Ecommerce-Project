const baseUrlApi = "https://fakestoreapi.com/products";
const dataLocalStorage = JSON.parse(localStorage.getItem("CATEGORYSHOW"));
const sectionProducts = document.getElementById("products");

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
