
const searchByTitle = document.getElementById("product-search-by-title");
const searchPrice = document.getElementById("product-search-by-price");
const productPlaceholder = document.getElementById("product-placeholder");
const buttons = document.getElementById("buttons");
const inputs = document.getElementById("inputs");
const selects = document.querySelector(".select-category");
const boughtItems = document.getElementById("carts-placeholder");
const carts = JSON.parse(localStorage.getItem("carts")) || [];
const select = document.querySelector(".select-category");

// fetch products
// fetch products
addCategoryiesToSelect();
displayCarts();


async function getProducts(URL) {
  const response = await fetch(URL);
  if (!response.ok) {
    const problem = await response.json();
    console.log(problem.message);
    return;
  }
  const json = await response.json();
  return json;
}

// display products
// display products

async function displayProducts() {
  const products = await getProducts("http://localhost:3000/api/products");
  // console.log(products);
  productPlaceholder.innerHTML = "";
  insertHtmlAndAppend(products);
}
displayProducts();

// search for available products
// search for available products

async function availableProducts() {
  productPlaceholder.innerHTML = "";
  const products = await getProducts(
    "http://localhost:3000/api/products?inStock=true",
  );
  if (products == "") {
    // productPlaceholder.textContent = "no product available";
    Swal.fire("No product available!");
    return;
  }
  insertHtmlAndAppend(products);
}

// display available products and reset display
// display available products and reset display

buttons.addEventListener("click", (event) => {
  if (event.target.classList.contains("button-disponible")) {
    availableProducts();
    searchPrice.value = "";
    searchByTitle.value = "";
    select.selectedIndex = 0;
    return;
  }
  if (event.target.classList.contains("button-reinitialiser")) {
    displayProducts();
    searchPrice.value = "";
    searchByTitle.value = "";
    select.selectedIndex = 0;
    return;
  }
});

// search for product by name or description
// search for product by name or description

async function searchByNameOrDescription() {
  productPlaceholder.innerHTML = "";
  const title = document
    .getElementById("product-search-by-title")
    .value.toLowerCase();
  let newProducts = await getProducts(
    `http://localhost:3000/api/products?search=${title}`,
  );
  if (newProducts == "") {
    // productPlaceholder.textContent = "couldn't find a product with this name";
    Swal.fire("Couldn't find a product with this name!");
    return;
  }
  insertHtmlAndAppend(newProducts);
}

// search for product by max price
// search for product by max price

async function searchByPrice() {
  productPlaceholder.innerHTML = "";
  const price = document.getElementById("product-search-by-price").value;
  let newProducts = await getProducts(
    `http://localhost:3000/api/products?maxPrice=${price}`,
  );
  if (newProducts == "") {
    // productPlaceholder.textContent = "no product found";
    Swal.fire("No product found!");
    return;
  }
  insertHtmlAndAppend(newProducts);
}

// display products by name description or max price
// display products by name description or max price

inputs.addEventListener("input", (event) => {
  if (event.target.classList.contains("input-title")) {
    searchByNameOrDescription();
    return;
  }
  if (event.target.classList.contains("input-price")) {
    searchByPrice();
    return;
  }
});

// search products by category
// search products by category

async function addCategoryiesToSelect() {
  const products = await getProducts(`http://localhost:3000/api/categories`);
  products.forEach((product) => {
    let option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.name}`;
    select.appendChild(option);
  });
}

// filter by category
// filter by category

select.addEventListener("change", (event) => {
  const categoryId = event.target.value;
  async function categoryFilter() {
    productPlaceholder.innerHTML = "";
    const prod = await getProducts(
      `http://localhost:3000/api/products?categoryId=${categoryId}`,
    );
    insertHtmlAndAppend(prod);
  }
  categoryFilter();
});

async function insertHtmlAndAppend(products) {
  products.forEach((product) => {
    let list = document.createElement("li");
    list.innerHTML = ` <img 
      src="http://127.0.0.1:3000${product.image}"
      alt=""
      />
      <div>
      <h2 class="text-xs font-bold text-sky-500">${product.name}</h2>
      <div class="font-bold text-gray-700">
      <p>${product.description}</p>
      </div>
      <h3 class="text-sm text-gray-600">${product.price} MAD</h3>
      <div class="grid grid-flow-col pt-1 gap-2">
      <p class="border-2 rounded-md pl-2 border-indigo-900 justify-between bg-indigo-200">in stock: ${product.stock}</p>
      <p class="border-2 rounded-md pl-2 border-red-900 bg-red-200">${product.categoryName}</p>
      </div>
      <div class="grid grid-flow-col pt-1 gap-2">
      <button id ="${product.id}" class="cart-button w-full rounded-md bg-indigo-600 text-white 
      hover:bg-indigo-700">Add to cart</button>
      </div>
      </div> `;
    productPlaceholder.appendChild(list);
  });
}

// adding carts
// adding carts


productPlaceholder.addEventListener("click", event => {
  async function addCart() {
    if (event.target.classList.contains("cart-button")) {
      let id = event.target.id;
      const cart = await getProducts(`http://localhost:3000/api/products/${id}`)
      cart.quantity = 1;
      // console.log(cart);
      
        carts.push(cart)
        localStorage.setItem("carts", JSON.stringify(carts));
        displayCarts();
      // }
    }
  }
  addCart();
})

function displayCarts() {
  // const newCarts = 
  boughtItems.innerHTML = "";
  carts.forEach(cart => {

    // console.log(cart);
    const list = document.createElement("li");
    list.className = "flex";
    list.innerHTML = `<div class="flex justify-between items-center gap-4">
      <div><img class="w-40" src="http://127.0.0.1:3000${cart.image}" alt="" /></div>
      <div><h2 class="text-2xl font-bold text-sky-500">${cart.name}</h2>
      <h3> ${cart.price} MAD</h3>
      <div class="flex gap-2">
      <button class="text-2xl">+</button>
      <p class="text-2xl">${cart.quantity}</p>
      <button class="text-2xl">-</button>
      </div>
      <div><button class="flex h-10 w-40 bg-indigo-600 rounded-md ">delete</button></div>
      </div>
      </div>`
    boughtItems.appendChild(list);
  })
}