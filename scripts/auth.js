const serverUser = "https://ecommerce-project-geek.herokuapp.com/dataUsers"; //Servidor Heroku
const serverInfoShop = "https://ecommerce-project-geek.herokuapp.com/infoBuy"; //Servidor con info del Usuario para almacenar datos de sus compras
const baseUrlApi = "https://fakestoreapi.com/products"; //URL con todos los datos

window.addEventListener("DOMContentLoaded", () => {
  Swal.fire({
    icon: "info",
    title: "Welcome to our authentication page!",
    text: "If you have already registered, please go to the login section. Otherwise, we invite you to register and log in later.",
  });
});

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

//Para la seccion de SignUp
const formSignUp = document.getElementById("formSignUp");
formSignUp.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const lastName = document.getElementById("lastName").value;
  const emailS = document.getElementById("emailS").value;
  const passwordS = document.getElementById("passwordS").value;

  let data = await getData(serverUser);
  let duplicateEmail = data.find((item) => item.emailS == emailS);

  if (duplicateEmail == undefined) {
    //Se envían datos a Heroku.
    fetch(serverUser, {
      method: "POST",
      body: JSON.stringify({
        name,
        lastName,
        emailS,
        passwordS,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((respond) => respond);
    //Notifica el éxito de la operacion al usuario
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your data has been correctly saved",
      text: "Please log in now with the email and password provided.",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  //Verifica si el email ya habia estado previamente regsitrado y notifica al usuario. La información no se envía al servidor.
  else if (Object.keys(duplicateEmail).length !== 0) {
    Swal.fire({
      icon: "error",
      title: "This e-mail has been previously registered",
      text: "Please register with a different email address or go to the login window to login with the data you registered before.",
    });
  }

  formSignUp.reset();
});

//Para la seccion de Login
const formLogin = document.getElementById("formLogin");
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailL = document.getElementById("emailL").value;
  const passwordL = document.getElementById("passwordL").value;

  let data = await getData(serverUser);
  let infoCompare = data.filter(
    (item) => item.emailS === emailL && item.passwordS === passwordL
  );

  if (infoCompare[0] !== undefined) {
    const dataUser = {
      name: infoCompare[0].name,
      email: emailL,
    };
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thank you for logging in!",
      text: "You will be redirected to the page with all our products in a few seconds.",
      showConfirmButton: false,
    });
    // fetch(serverInfoShop, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     emailL,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // }).then((respond) => respond);
    setTimeout(() => {
      window.location.href = "../pages/allProducts.html";
      localStorage.setItem("INFOUSERLOGIN", JSON.stringify(dataUser));
    }, 5000);
  } else {
    Swal.fire({
      icon: "error",
      title: "Sorry. We have not found your data in our database.",
      text: "Try to register if you have not already done so.",
    });
  }
  formLogin.reset();
});
