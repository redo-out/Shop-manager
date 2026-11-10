const   searchByTitle = document.getElementById("product-search-by-title");
const   searchByPrice = document.getElementById("product-search-by-price");
const   buttonCategorie = document.getElementById("button-categorie");
const   buttonDisponible = document.getElementById("button-disponible");
const   buttonReinitialiser = document.getElementById("button-reinitialiser");


// fetch("http://localhost:3000/api/products")
// .then(response => response.json())
// .then(data => console.log(data))
async function getProducts(){
    const response = await fetch('http://localhost:3000/api/products');
    const json = await response.json();
    return json;
}

async function displayProducts(){
    let   productPlaceholder = document.getElementById("product-placeholder");
    const products = await getProducts();
    console.log(products);
    products.forEach(product => {
        let list = document.createElement("li");
        list.innerHTML = ` <img
            class="rounded-lg items-center"
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