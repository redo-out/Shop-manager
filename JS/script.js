const searchByTitle = document.getElementById("product-search-by-title");
const searchPrice = document.getElementById("product-search-by-price");
const productPlaceholder = document.getElementById("product-placeholder");
const buttons = document.getElementById("buttons");
const inputs = document.getElementById("inputs");


async function getProducts() {
  const response = await fetch('http://localhost:3000/api/products');
  const json = await response.json();
  return json;
}

async function displayProducts() {
  const products = await getProducts();
  console.log(products);
  productPlaceholder.innerHTML = "";
  products.forEach(product => {
    let list = document.createElement("li");
    list.innerHTML = ` <img 
            src="http://127.0.0.1:3000${product.image}"
            alt=""
          />
          <div>
            <div class="text-xs font-bold text-sky-500">${product.name}</div>
            <div class="font-bold text-gray-700">
            <p>${product.description}</p>
            </div>
            <div class="text-sm text-gray-600">${product.price} MAD</div>
            <div class="grid grid-flow-col pt-1 gap-2">
            <p class="border-2 rounded-xl border-indigo-900 justify-between bg-indigo-200">${product.stock}</p>
            <p class="border-2 rounded-xl border-red-900 bg-red-200">${product.categoryName}</p>
            </div>
            </div> `
    productPlaceholder.appendChild(list);
  });
}
displayProducts();

async function availableProducts() {
  productPlaceholder.innerHTML = "";
  const products = await getProducts();
  let inStock = products.filter(produit => produit.stock >= 1)
  if (!inStock) {
    productPlaceholder.textContent = "no product available";
    return;
  }
  inStock.forEach(product => {
    let list = document.createElement("li");
    list.innerHTML = ` <img 
            src="http://127.0.0.1:3000${product.image}"
            alt=""
          />
          <div>
            <div class="text-xs font-bold text-sky-500">${product.name}</div>
            <div class="font-bold text-gray-700">
              <p>${product.description}</p>
            </div>
            <div class="text-sm text-gray-600">${product.price} MAD</div>
            <div class="grid grid-flow-col pt-1 gap-2">
            <p class="border-2 rounded-xl border-indigo-900 justify-between bg-indigo-200">${product.stock}</p>
            <p class="border-2 rounded-xl border-red-900 bg-red-200">${product.categoryName}</p>
            </div>
          </div> `
    productPlaceholder.appendChild(list);
  })
}

buttons.addEventListener('click', (event) => {
  if (event.target.classList.contains("button-disponible")) {
    availableProducts();
    return;
  }
  if (event.target.classList.contains("button-reinitialiser")) {
    displayProducts();
    return
  }
});

async function searchByNameOrDescription() {
  productPlaceholder.innerHTML = "";
  const title = document.getElementById("product-search-by-title").value.toLowerCase();
  let products = await getProducts();
  let newProducts = products.filter(produit => produit.name == title || produit.description == title);
  if (!newProducts) {
    productPlaceholder.textContent = "couldn't find a product with this name";
    return;
  }
  newProducts.forEach(product => {
    let list = document.createElement("li");
    list.innerHTML = ` <img 
    src="http://127.0.0.1:3000${product.image}"
    alt=""
    />
          <div>
          <div class="text-xs font-bold text-sky-500">${product.name}</div>
          <div class="font-bold text-gray-700">
          <p>${product.description}</p>
          </div>
          <div class="text-sm text-gray-600">${product.price} MAD</div>
          <div class="grid grid-flow-col pt-1 gap-2">
          <p class="border-2 rounded-xl border-indigo-900 justify-between bg-indigo-200">${product.stock}</p>
          <p class="border-2 rounded-xl border-red-900 bg-red-200">${product.categoryName}</p>
          </div>
          </div> `
    productPlaceholder.appendChild(list);
  })
}

async function searchByPrice() {
  productPlaceholder.innerHTML = "";
  const price = document.getElementById("product-search-by-price").value;
  let products = await getProducts();
  let newProducts = products.filter(produit => produit.price <= price)
  if (!newProducts) {
    productPlaceholder.textContent = "no product found";
    return;
  }
  newProducts.forEach(product => {
    let list = document.createElement("li");
    list.innerHTML = ` <img 
    src="http://127.0.0.1:3000${product.image}"
    alt=""
    />
          <div>
          <div class="text-xs font-bold text-sky-500">${product.name}</div>
          <div class="font-bold text-gray-700">
          <p>${product.description}</p>
          </div>
          <div class="text-sm text-gray-600">${product.price} MAD</div>
          <div class="grid grid-flow-col pt-1 gap-2">
          <p class="border-2 rounded-xl border-indigo-900 justify-between bg-indigo-200">${product.stock}</p>
          <p class="border-2 rounded-xl border-red-900 bg-red-200">${product.categoryName}</p>
          </div>
          </div> `
    productPlaceholder.appendChild(list);
  })
}

inputs.addEventListener('input', (event) => {
  if (event.target.classList.contains("input-title")) {
    searchByNameOrDescription();
    return;
  }
  if (event.target.classList.contains("input-price")) {
    searchByPrice();
    return;
  }
})