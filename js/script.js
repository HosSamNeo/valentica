// global variables
const productsList = [
  {
    name: "cat",
    price: "111.5",
    image: "./images/cat.jpg",
    addedToCart: false,
  },
  {
    name: "dog",
    price: "121.5",
    image: "./images/dog.jpg",
    addedToCart: false,
  },
  {
    name: "elephant",
    price: "33.5",
    image: "./images/elephant.jpg",
    addedToCart: false,
  },
  {
    name: "gorilla",
    price: "444.5",
    image: "./images/gorilla.jpg",
    addedToCart: false,
  },
  {
    name: "lion",
    price: "722.5",
    image: "./images/lion.jpg",
    addedToCart: false,
  },
  {
    name: "turtle",
    price: "453.5",
    image: "./images/turtle.jpg",
    addedToCart: false,
  },
];
const myModal = document.getElementById("myModal");
const modalContent = document.getElementById("modal-content");
const badge = document.getElementById("badge");
const cartMenu = document.getElementById("cart-menu");
const productsContainer = document.getElementById("products-container");

// handling local storage
const productsInLocal = JSON.parse(localStorage.getItem("productsList"));
let products = [];
if (productsInLocal != null) {
  products = [...productsInLocal];
} else {
  products = productsList;
}

// open modal
const openModal = (i) => {
  myModal.style.display = "block";
  let elements = "";
  elements += `
  <img src="${products[i].image}" alt="${products[i].name}" />
  <div class="info">
    <p>${products[i].name}</p>
    <p>$ ${products[i].price}</p>
    <button id="modalAdd" onclick="addToCart(${i})">add to cart</button>
    <button id="modalRemove" onclick="removeFromCart(${i})" style="display: none">Remove from cart</button>
          </div>
  `;
  modalContent.innerHTML += elements;
};

// close modal
const closeModal = () => {
  myModal.style.display = "none";
  modalContent.innerHTML =
    '<span class="close" onclick="closeModal()">&times;</span>';
};

// add to cart
function addToCart(i) {
  products[i].addedToCart = true;
  document.getElementById("add").style.display = "none";
  if (document.getElementById("modalAdd")) {
    document.getElementById("modalAdd").style.display = "none";
  }
  document.getElementById("remove").style.display = "block";
  if (document.getElementById("modalAdd")) {
    document.getElementById("modalRemove").style.display = "block";
  }
  displayProducts();
  localStorage.setItem("productsList", JSON.stringify(products));
}

// remove from cart
function removeFromCart(i) {
  products[i].addedToCart = false;
  document.getElementById("add").style.display = "block";
  if (document.getElementById("modalAdd")) {
    document.getElementById("modalAdd").style.display = "block";
  }
  document.getElementById("remove").style.display = "none";
  if (document.getElementById("modalRemove")) {
    document.getElementById("modalRemove").style.display = "none";
  }
  displayProducts();
  localStorage.setItem("productsList", JSON.stringify(products));
}

// display Cart
const displayCart = () => {
  let numCart = 0;
  let elements = "";
  for (let i = 0; i < products.length; i++) {
    if (products[i].addedToCart) {
      elements += `
          <div class="cart-product">
          <img src="${products[i].image}" alt="${products[i].name}" />
          <div class="info">
            <p>${products[i].name}</p>
            <p>$ ${products[i].price}</p>
            <button onclick="removeFromCart(${i})">Remove from cart</button>
          </div>
        </div>
    `;
      numCart++;
    }
  }
  cartMenu.innerHTML = elements;
  badge.textContent = numCart;
};

// display products
function displayProducts() {
  let elements = "";
  for (let i = 0; i < products.length; i++) {
    if (products[i].addedToCart) {
      elements += `
      <div class="card">
      <img src="${products[i].image}" alt="${products[i].name}" />
      <div class="card-info">
        <p>${products[i].name}</p>
        <p>$ ${products[i].price}</p>
        <button id="add" onclick="addToCart(${i})" style="display: none">add to cart</button>
        <button id="remove" onclick="removeFromCart(${i})">Remove from cart</button>
        <button onclick="openModal(${i})">Quick view</button>
        </div>
    </div>
      `;
    } else {
      elements += `
      <div class="card">
        <img src="${products[i].image}" alt="${products[i].name}" />
        <div class="card-info">
          <p>${products[i].name}</p>
          <p>$ ${products[i].price}</p>
          <button id="add" onclick="addToCart(${i})">add to cart</button>
          <button id="remove" onclick="removeFromCart(${i})" style="display: none">Remove from cart</button>
          <button onclick="openModal(${i})">Quick view</button>
        </div>
      </div>
      `;
    }
  }
  productsContainer.innerHTML = elements;
  displayCart();
}

displayProducts();
