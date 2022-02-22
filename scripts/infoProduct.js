const dataLocalStorage = JSON.parse(localStorage.getItem("DETAILPRODUCT"));
const sectionImage = document.getElementById("sectionImage");
const sectionDetail = document.getElementById("sectionDetail");

function showDetail() {
  const { title, price, description, image } = dataLocalStorage[0];
  sectionImage.innerHTML = ` <img src="${image}" style=" width: 20rem; height: 30rem; padding: 12px" alt="${title}"> `;
  sectionDetail.innerHTML = ` <h3 class="fst-normal"> ${title} </h3>
     <h2 class="fw-bold"> $ ${price} USD </h2>
     <p class="mt-1 lh-sm text-justify"> ${description}  </p>
     <div class="priceCar d-flex justify-content-center mt-3 mb-3">
         <input type="number" id="inputAddCountProduct" placeholder="1" required>
         <button type="button" id="buttonAddCountProduct" onclick="addCartProduct()"> Add to cart </button>
     </div> `;
}

window.addEventListener("DOMContentLoaded", showDetail());

function addCartProduct(){
  
}