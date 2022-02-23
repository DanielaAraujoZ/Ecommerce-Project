const server = "https://ecommerce-project-geek.herokuapp.com/dataUsers" //Servidor Heroku
const baseUrlApi = "https://fakestoreapi.com/products" //URL con todos los datos
const div = document.getElementById('banners')

//Función que hará los llamados a la API
async function getData (url){
    try {
        const resp = await fetch(url);
        const data = await resp.json()
        return data
    }catch (error){
        return console.log(error);
    }
}

//Envía al local storage los datos del item seleccionado para mostrar en la siguiente pantalla.
async function showProducts(categorieFilter){
    let data = await getData(baseUrlApi)
    let infoFilter = data.filter((item) =>  item.category == categorieFilter )
    localStorage.setItem('CATEGORYSHOW', JSON.stringify(infoFilter))
    window.location.href = "../pages/allProducts.html"
}

