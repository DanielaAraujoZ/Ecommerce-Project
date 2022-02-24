const dataLocalStorage = JSON.parse(localStorage.getItem("DETAILPRODUCT"));
const sectionImage = document.getElementById("sectionImage");
const sectionDetail = document.getElementById("sectionDetail");
const userLogIn = JSON.parse(localStorage.getItem("INFOUSERLOGIN"));
const baseURL = "https://fakestoreapi.com/products";
const serverInfoShop = "https://ecommerce-project-geek.herokuapp.com/infoBuy";

function showDetail() {
  const { title, price, description, image, id } = dataLocalStorage[0];
  sectionImage.innerHTML = ` <img src="${image}" style=" width: 20rem; height: 30rem; padding: 12px" alt="${title}"> `;
  sectionDetail.innerHTML = ` <h3 class="fst-normal"> ${title} </h3>
     <h2 class="fw-bold"> $ ${price} USD </h2>
     <p class="mt-1 lh-sm text-justify"> ${description}  </p>
     <div class="priceCar d-flex justify-content-center mt-3 mb-3">
         <input type="number" id="inputAddCountProduct" placeholder="1" value="1" required>
         <button type="button" id="buttonAddCountProduct" onclick="addCartProduct(${id})"> Add to cart </button>
     </div> `;
}

window.addEventListener("DOMContentLoaded", showDetail());

//Misma función de allProducts.
//Valida dato de usuario guardado en el localStorage para cambiar el footer.
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

//Buscar id en el api
//Función que hará los llamados a la API
async function getData(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    return console.log(error);
  }
}
  
//Función a ejecutar con evento click del boton add to cart
async function addCartProduct(id) {

  let dataID = await getData(baseURL)
  let dataSend = dataID.filter((item) => item.id == id)
  
  console.log(id);
  if (userLogIn == null) {
    Swal.fire({
      icon: "info",
      title:
        "You must be logged in before adding products to your shopping cart.",
    });
  } else {
    const { image,title,price } = dataSend[0]
    const quantityProduct = document.getElementById('inputAddCountProduct').value;    
    fetch(serverInfoShop, {
      method: "POST",
      body: JSON.stringify({
        email: userLogIn.email,
        idProduct: id,
        quantity: parseInt(quantityProduct),
        image: image, 
        title: title, 
        price: price
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((respond) => respond);
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Product was added to your shopping cart!",
    });
  }
}
