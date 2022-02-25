const detailBuy = JSON.parse(localStorage.getItem("DETAILBUY"));
const userLogIn = JSON.parse(localStorage.getItem("INFOUSERLOGIN"));
const serverPay = "https://ecommerce-project-geek.herokuapp.com/infoPay";
const offcanvasBody = document.getElementById("offcanvas-body");
const formBuy = document.getElementById("formBuy");

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

window.addEventListener("DOMContentLoaded", () => {
  console.log(detailBuy);
  offcanvasBody.innerHTML += `
        <div>
            <p class="m-0"> Hello Daniela! </p>
            <p> Here are the details of your purchase </p>
            <p> Quantity of products: ${detailBuy.totalProducts} </p>
            <p> Total payable: ${detailBuy.priceBuy.toFixed(2)} </p>
        </div>
        <div>
            <p class="fw-bold"> STATE: PENDING PAYMENT </p>
        </div>
    `;
});

formBuy.addEventListener("submit", (e) => {
  e.preventDefault()
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const numberCard = document.getElementById("numberCard").value;
  const dataExp = document.getElementById("dataExp").value;
  const cvv = document.getElementById("cvv").value;

  let timerInterval;
  Swal.fire({
    title: "Auto close alert!",
    html: "I will close in <b></b> milliseconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
});
