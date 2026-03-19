const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

let allProducts = []
const container = document.getElementById('product-list');



//build single product card
const addProduct = (product) => {
const template = document.getElementById('card-template');
//clone it

const tempClone = template.content.cloneNode(true);
tempClone.id = product.id;
tempClone.querySelector('.card-header').innerText = product.category;
tempClone.querySelector('.card-title').innerText = product.title;
tempClone.querySelector('.card-subtitle').innerText = product.price;
tempClone.querySelector('.card-text').innerText = product.description.slice(0,100);
tempClone.querySelector('.card-img-top').src = product.image;
tempClone.querySelector('.card-img-top').alt = product.title;
container.appendChild(tempClone);
}

const displayProducts = (products) => {
    container.innerHTML = "";

    products.forEach(prod => {
        addProduct(prod);
    })
}



const filterProducts = (event) => {
    const selectedCategory = event.target.value;

    let filtered = allProducts;
    if (selectedCategory !== "All") {
        filtered = allProducts.filter(product => product.category === selectedCategory);
    }
    
    displayProducts(filtered)
}

const loadProducts = async () => {
    allProducts = await getData('https://fakestoreapi.com/products')
    for (const prod of allProducts) {
        addProduct(prod);
    }

}

 loadProducts();







