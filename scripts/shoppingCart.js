const serverInfoShop = "https://ecommerce-project-geek.herokuapp.com/infoBuy";
const baseURL = "https://fakestoreapi.com/products";
const userLogIn = JSON.parse(localStorage.getItem("INFOUSERLOGIN"));
const bodyTable = document.getElementById("bodyTable");
const totalPay = document.getElementById("totalPay");
const sendPay = document.getElementById("sendPay");

//Para botón de bienvenida de usuario y boton LogOut
const changeTagA = document.getElementById("changeTagA");
const sectionNameUser = document.getElementById("sectionNameUser");
const cartShop = document.getElementById("cartShop");
if (Object.keys(userLogIn).length > 0) {
  sectionNameUser.innerHTML = `
  <p class="nameUser text-center m-0 fw-bold fs-3"> ¡Bievenid@ ${userLogIn.name}! </p>`;
  changeTagA.innerHTML = `<button id="buttonLogOut" onclick="logOut()"> Log out </button>`;
  cartShop.removeAttribute("disabled");
}
//AL dar click en el botón logout, eliminará el estado anterior volviendo al inicial.
function logOut() {
  Swal.fire({
    position: "top-center",
    icon: "success",
    title: "Your session has been closed",
    showConfirmButton: false,
    timer: 1500,
  });
  localStorage.removeItem("INFOUSERLOGIN");
  changeTagA.innerHTML = `
  <a href="./auth.html"> Login / SignUp </a>`;
  sectionNameUser.innerHTML = "";
  cartShop.disabled = true;
}

//Obtiene datos del API.
async function getData(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    return console.log(error);
  }
}

//Muestra los datos en la tabla
async function showInfoShopping() {
  let dataUser = await getData(serverInfoShop);
  let infoUserFilter = dataUser.filter(
    (item) => item.email === userLogIn.email
  );
  let sumValues = [];
  let countProducts = [];
  infoUserFilter.map((item, index) => {
    const { image, title, price, quantity } = item;
    bodyTable.innerHTML += `
     <tr class="align-middle fs-4">
         <th scope="row">${index + 1}</th>
         <td class="d-flex flex-column justify-content-center align-items-center">
             <img src="${image}" style=" width: 10rem"
                 alt="product">
             <p class="mt-2  text-decoration-underline"> ${title} </p>
         </td>
         <td> ${quantity} </td>
         <td>$${price}USD </td>
         <td class="fw-bold">$ ${quantity * price}USD</td>
     </tr>
 `;
    sumValues.push(quantity * price);
    countProducts.push(quantity);
  });
  let sumTotal = sumValues.reduce((prev, current) => prev + current);
  totalPay.innerHTML = `
  <th colspan="4" class="text-end">
  Total
  </th>
  <td colspan="1" class="text-center fw-bolder">$${sumTotal.toFixed(2)}USD</td>
  </tr>
  <tr class="align-middle fs-2">
  <td colspan="5" class="text-end">
  <button type="button" id="sendPay" onclick="payAll()"> Pay All </button>    
  </td>
  </tr>
  <tr class="align-middle fs-2">
  `;
  let detailBuy = {
    email: userLogIn.email,
    priceBuy: sumTotal,
    totalProducts: countProducts.reduce((prev, current) => prev + current),
  };
  localStorage.setItem("DETAILBUY", JSON.stringify(detailBuy));
}

window.addEventListener("DOMContentLoad", showInfoShopping());

function payAll() {
  window.location.href = "../pages/payPage.html";
}
