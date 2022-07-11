//DECLARAMOS LAS VARIABLES GLOBALES DEL CARRITO PARA LOS BUTTON
const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => { //FUNCION FLECHA PARA AGREGAR AL CARRITO
    addToCartButton.addEventListener('click', addToCartClicked);
});


const comprarButton =document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);


const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

//FUNCION FLECHA PARA AGREGAR AL CARRITO
addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});


//FUNCION PARA EL CARRITO
function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.item')
    
    //TRAYENDO CADA ITEM DEL CARRITO
    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}


//AGREGAR HAMBURGUESAS AL CARRITO
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
    for(let i = 0; i < elementsTitle.length; i++){
        if (elementsTitle[i].innerText === itemTitle){
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity'); //SUBIMOS AL PADRE PARA LLEGAR AL INPUT
            elementQuantity.value++; //PARA SUMAR AL INPUT CUANDO EL USUARIO AGREGA MÁS DE UN VALOR EN UN MISMO ELEMENTO
            $('.toast').toast('show');
            updateShoppingCartTotal();
            return; //PARA QUE NO REPITA DOS VECES EL MISMO ELEMENTO EN EL CARRITO Y SOLO SUME AL INPUT SE UTILIZA EL RETURN
        }
    }
    
    const shoppingCartRow = document.createElement('div'); //creamos una fila
    const shoppingCartContent = ` 
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image col-xl-3 col-sm-4 col-md-4">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle ml-3 mb-0 marginTitle">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem) //DECLARANDO PARA BORRAR ITEM
    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);
    updateShoppingCartTotal() //ACTUALIZA DATOS
}


//ACTUALIZACIONES EN EL CARRITO DE COMPRAS
function updateShoppingCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    const shoppingCartItem = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItem.forEach(shoppingCartItem => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$', '')); //para cambiar el formato de los numberos para las operaciones
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value); 
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity; //MUTIPLICACION DEL PRECIO POR CANTIDAD DE PRODUCTO
    })
    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`
}


//BORRAR PRODUCTO
function removeShoppingCartItem(event) { //(EVENT) PORQUE TRAE EL EVENTO DEL EVENTLISTENER declarado anteriormente
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal(); //PARA ACTUALIZAR EL CARRITO UNA VEZ REMOVIDO LOS PRODUCTOS
}

function quantityChanged(event){    
    const inputChange = event.target;
/*     if(inputChange.value <= 0){
        inputChange.value = 1; //PARA QUE EL USUARIO NO PUEDA PONER MENOS DE 1 EN EL INPUT
    } */
    inputChange.value <= 0 ? (inputChange.value = 1 ) : null ; //OPERADOR TERNARIO 
    updateShoppingCartTotal(); //PARA QUE ACTUALICE UNA VEZ MAS EL PRECIO DEPENDIENDO LA ELECCION DEL USUARIO
}


//QUE EL BOTON BORRE LO QUE HAY EN EL CARRITO UNA VEZ COMPRADO
function comprarButtonClicked(){
    shoppingCartItemsContainer.innerHTML = '';

    updateShoppingCartTotal();  
}

//FORMULARIO
//TRAYENDO LOS ELEMENTOS DEL HTML
const nombre = document.getElementById("name")
const email = document.getElementById("email")
const pass = document.getElementById("password")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")



//VALIDACIONES CON FUNCION FLECHA
form.addEventListener("submit", e => {
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/ //POR DEFAULT PARA LA VALIDACION DEL EMAIL
    parrafo.innerHTML = "" //PARA QUE SE REINICIE LA VARIABLE
    if (nombre.value.length < 6) {
        warnings += `El nombre no es valido <br>`
        entrar = true
    }
    if (!regexEmail.test(email.value)) {
        warnings += `El email no es valido <br>`
        entrar = true
    }
    if (pass.value.length < 8) {
        warnings += `La contraseña no es valida <br>`
        entrar = true
    }

    if (entrar) {
        parrafo.innerHTML = warnings
    } else {
        parrafo.innerHTML = "Gracias por registrarte"
        alert("GRACIAS POR REGISTRARTE, PRONTO RECIBIRAS NOVEDADES Y DESCUENTOS")
    }
})



//STORAGE GUARDAR DATOS, con el check

let btnLogin = document.getElementById('btnRegister')
let recordar = document.getElementById("rememberMe")

function guardarUsuarios(storage) {
    let user = document.getElementById('email').value;
    let pass = document.getElementById('password').value;


    const usuario = {
        'user': user,
        'pass': pass
    }

    if (storage === 'sessionStorage') {
        sessionStorage.setItem('user', JSON.stringify(usuario))
    }

    if (storage === 'localStorage') {
        localStorage.setItem('user', JSON.stringify(usuario));
    }
}

btnLogin.addEventListener('click', () => {
    if (recordar.checked) {
        guardarUsuarios('localStorage');
    } else {
        guardarUsuarios('sessionStorage');
    }
})



//botton-up-scroll

document.getElementById('button-up').addEventListener('click', scrollUp);

function scrollUp(){
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    
    if (currentScroll > 0){ //condicional
        window.scrollTo (0,0);
    }
}


buttonUp = document.getElementById("button-up"); //variable

window.onscroll = function(){
    var scroll = document.documentElement.scrollTop;

    if (scroll > 400){ // condicional
        buttonUp.style.transform = 'scale(1)'; //para que aparezca el boton
    }else if (scroll < 400){
        buttonUp.style.transform = "scale(0)"; //para que desaparezca
    }
        
}


//CONSUMIENDO API
const listUsers = async() =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    let tableBody = ``;
    users.forEach((users, index) =>{
        tableBody +=`<tr>
        <td>${users.id}</td>
        <td>${users.name}</td>
        <td>${users.username}</td>
        <td>${users.email}</td>
        </tr>`;
    });
    document.getElementById("tableBody_Users").innerHTML = tableBody;

};

window.addEventListener("load", function(){
    listUsers();
})
