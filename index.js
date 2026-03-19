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
//set unique id
tempClone.querySelector('.col-lg-3').id = `product-${product.id}`;
tempClone.querySelector('.card-header').innerText = product.category;
tempClone.querySelector('.card-title').innerText = product.title;
tempClone.querySelector('.card-subtitle').innerText = '$' + product.price;
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
    if (selectedCategory !== "all") {
        filtered = allProducts.filter(product => product.category === selectedCategory);
    }
    
    displayProducts(filtered)
}

const showFullText = (event) => {
    event.preventDefault();

    const cardContainer = event.target.closest('.col-lg-3');
    const productId = parseInt(cardContainer.id.replace('product-', ''));

    const product = allProducts.find(prod => prod.id === productId);

    cardContainer.querySelector('.card-text').innerText = product.description;

    event.target.innerText = "Close"
    event.target.onclick = (e) => closeFullText(e);

}

const closeFullText = (event) => {
    event.preventDefault();
    
    const cardContainer = event.target.closest('.col-lg-3');
    const productId = parseInt(cardContainer.id.replace('product-', ''));
    const product = allProducts.find(p => p.id === productId);
    
    cardContainer.querySelector('.card-text').innerText = product.description.slice(0, 100);
    
    event.target.innerText = 'Read More';
    event.target.onclick = (e) => showFullText(e);
}



const loadProducts = async () => {
    allProducts = await getData('https://fakestoreapi.com/products');
    displayProducts(allProducts);
    }

 loadProducts();







