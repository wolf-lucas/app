
// Mostrar u Ocultar Carrito Side Bar
let btnShopCart = document.querySelector('#btn-shop-cart')
let shopSideBar = document.querySelector('#nav-shop-cart')

btnShopCart.onclick = function () {
    btnShopCart.classList.toggle('active');
    shopSideBar.classList.toggle('active');
}

// Mostrar u Ocultar Menu
let btnMenu = document.querySelector("#btn-nav-menu")
let menuBar = document.querySelector('.nav-bar')

btnMenu.onclick = function() {
    btnMenu.classList.toggle('active');
    menuBar.classList.toggle('active');
}

// Valiaciones Email Formulario
function validateEmail(email) { 
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
      return (true)
    }
    alert("Debe ingresas un email válido!")
    return (false)
 }

// Obtener Productos de la API y crear una lista con los productos para 
// procesar

// lista de productos
let productsList = []

// lista de operaciones en el Carrito
let shoppingCart = []

// objeto Operacion de compra
const BuyOp = function (
    id,
    product,
    qty) {
        return {
            opId: id,
            product: product,
            productId: product.id,
            unitPrice: product.price,
            quantity: qty,
            total: unitPrice * quantity,
    }
}

//objeto Producto
const Product = function(
    createdAt,
    description,
    id,
    imgPath,
    name,
    price, 
    product,
    totalSoldQty,
    buyUrl) {
            return {
                createdAt: createdAt,
                description: description,
                id: id,
                image: imgPath,
                title: name,
                price: parseFloat(price),
                type: product,
                buyUrl: buyUrl,
                totalSoldQty: parseInt(totalSoldQty),
    }
}

// Promise funcion para obtener los productos de la BBDD
function getProducts() 
    {
        return new Promise(function(resolve, reject) 
            {
                fetch('https://646d29479c677e232189ca03.mockapi.io/productos')
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data){
                        resolve(data);
                    })
            }
        )
    }

// funcion para obtener el top 20 de productos
function getBestProducts(productsList, topNumber = 20)
    {
        return productsList.sort((a, b) =>  b.totalSoldQty - a.totalSoldQty).slice(0, topNumber);
    }

// Parsing Products object to html
function parseProduct(product) {
        return `
        <div class="card">
            <article class="card__article">
              <div class="card__image-container">
                <img
                  class="card__image"
                  src="${product.image}"
                  alt="${product.title}"
                />
              </div>
              <div class="card__content">
                <h3 class="card__heading">${product.title}</h3>
                <h5 class="card__brand">${product.type}</h5>
                <p class="card__description">${product.description}</p>
                <div class="card__price-container">
                  <h5 class="card__price">$ ${product.price}</h5>
                  <form action="" class="card-quantity__form">
                    <input type="add_qty" class="card-quantity__form-add-qty" id="product_qty" value="1" />
                    <button class="btn">
                      <i class="fa-solid fa-cart-plus"></i>
                    </button>
                  </form>
                </div>
                <a href="#" class="btn btn-compra">
                  Más Detalle
                </a>
              </div>
            </article>
        </div>        
        `
}

// Parsing selected BuyOp Object to Shopping Cart
function parseProductToShopCard(buyop) {
    return `
    <div class="shop-cart__card">
        <article class="shop-cart__article">
          <div class="shop-cart__image-container">
            <img
              class="card__image"
              src="${buyop.product.image}"
              alt="${buyop.product.title}"
            />
          </div>
          <div class="shop-cart__article-content">
            <h3 class="shop-cart__heading">${buyop.product.title}</h3>
            <p class="shop-cart__description">${buyop.product.description}</p>
            <h5 class="shop-cart__item-price">Precio: $ ${buyop.unitPrice}</h5>
            <h5 class="shop-cart__item-qty">Cantidad: ${buyop.quantity}</h5>
            <h5 class="shop-cart__item-total">Total: ${buyop.total}</h5>
          </div>
          <div class="shop-cart__article-buttons">
            <div class="btn shop-cart__article-cancel">
              <i class="fa-solid fa-xmark"></i>
            </div>
            <div class="btn shop-cart__article-minus">
              <i class="fa-solid fa-minus"></i>
            </div>
            <div class="btn shop-cart__articule-plus">
              <i class="fa-solid fa-plus"></i>
            </div>
          </div>
        </article>
    </div>
    `
}

// Parsing to Html Templates
function parseToHtml(list, func) {
    return list.map(func).join("");
}

// Agregar producto al carrito
let qtyToBuy = document.querySelector('#btn-shop-cart')

// ***************** ------------------ ************************** ////////////
// Init Interface
function initInterface() {
    // obtener productos y cargarlos en una lista
    getProducts()
        .then(function(products) {
            for (const i in products) {
                var product = products[i]
                productsList.push(
                        Product(
                            product.createdAt,
                            product.description,
                            product.id,
                            product.image,
                            product.name,
                            product.price, 
                            product.product,
                            product.sold_qty,
                            product.buyUrl)
                    )
            }
        })
};

initInterface();

console.log(productsList)

