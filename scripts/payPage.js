const detailBuy = JSON.parse(localStorage.getItem("DETAILBUY"));
const userLogIn = JSON.parse(localStorage.getItem("INFOUSERLOGIN"));
let numberCount = JSON.parse(localStorage.getItem("COUNTPRODUCTS"));
const serverPay = "https://ecommerce-project-geek.herokuapp.com/infoPay";
const offcanvasBody = document.getElementById("offcanvas-body");
const formBuy = document.getElementById("formBuy");
const cartShop = document.getElementById("cartShop");

//Misma función de allProducts.
//Valida dato de usuario guardado en el localStorage para cambiar el footer.
const changeTagA = document.getElementById("changeTagA");
const sectionNameUser = document.getElementById("sectionNameUser");

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
  cartShop.innerHTML = `
      <i class="fa-solid fa-cart-shopping"> </i>
      <p class="countCar fw-bold"> 0 </p>
`;
Storage.clear()
}

window.addEventListener("DOMContentLoaded", () => {
  offcanvasBody.innerHTML += `
        <div>
            <p class="m-0"> Hello Daniela! </p>
            <p> Here are the details of your purchase </p>
            <p> Quantity of products: ${detailBuy.totalProducts} </p>
            <p> Total payable: ${detailBuy.priceBuy.toFixed(2)} </p>
        </div>
        <div id="sectionStatePay">
            <p class="fw-bold"> STATE: PENDING PAYMENT </p>
        </div>
    `;
    cartShop.innerHTML = `
      <i class="fa-solid fa-cart-shopping"> </i>
      <p class="countCar fw-bold"> ${numberCount} </p>
`;
});

formBuy.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const numberCard = document.getElementById("numberCard").value;
  const dataExp = document.getElementById("dataExp").value;
  const cvv = document.getElementById("cvv").value;

  if (email.toLowerCase() !== userLogIn.email.toLowerCase()) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "The payment email and the user's email are different.",
      footer: "Please verify the information",
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "We are processing your payment...",
      showConfirmButton: false,
      timer: 2000,
    });

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "The payment was correctly processed!",
        footer: "Thank you for your purchase!",
      });
    }, 3500);

    fetch(serverPay, {
        method: "POST",
        body: JSON.stringify({
          emailPay: email,
          numberCard,
          dataExp,
          cvv,
          detailBuy
          
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((respond) => respond);
      document.getElementById('sectionStatePay').innerHTML = ''
      document.getElementById('sectionStatePay').innerHTML += 
      ` <p class="fw-bold"> STATE: SUCCESSFUL PAYMENT </p> `
  }
  formBuy.reset()
});
