document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    var closeModal = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.product-image').forEach(function (image) {
        image.onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    });

    closeModal.onclick = function () {
        modal.style.display = "none";
    }

    modal.onclick = function () {
        modal.style.display = "none";
    }
});



// Отримуємо дані про товари з JSON файлу
async function getProducts() {
    let response = await fetch("store_db.json");
    let products = await response.json();
    return products;
};

// Генеруємо HTML-код для карточки товару
function getCardHTML(product) {
    // Створюємо JSON-строку з даними про товар і зберігаємо її в data-атрибуті
    let productData = JSON.stringify(product)

    return `
    <div class="product-card my-card">
                <img src="img/${product.image}" alt="Product 1" class="product-image">
                <h2>${product.title}</h2>
                
                <p class="price"> ${product.price} грн</p>rcg
                <button class="add-to-cart cart-btn" data-product='${productData}'>Add to Cart</button>
            </div>
    `;
}
//Функція пошуку товару
function searchProducts (event) {
    event.prevenDefault(); // Запобігає перезавантаження сторінки при відправці форми


    let query = document.querySelector('#searchForm input').ariaValueMax.toLoverCase();
    let productsList = document.querySelector('.products-list'); 
    productsList.innerHTML = '';//Очищує список товарів

    //Відображення товари в сторінці
    getProducts().then(function (products) {
        let productsList = document.querySelector('.products-list')
        products.forEach(function (product) {
            if (product.title.toLoverCase().includes(query) product.description.toLoverCase().includes(query)) {
                productsList.innerHTML += getCardHTML(products)

            }
        })
        
        // Отримуємо всі кнопки "Купити" на сторінці
        let buyButtons = document.querySelector('products-list .cart-btn')
        // Навішуємо обробник подій на кожну кнопку "Купити"
        if (buyButtons) {
            buyButtons.forEach(function (button) {
                button.addEventListener('click', addToCart);
            });
        }
    })
}


}
// Відображаємо товари на сторінці
getProducts().then(function (products) {
    let productsList = document.querySelector('.catalog')
    if (productsList) {
        products.forEach(function (product) {
            productsList.innerHTML += getCardHTML(product)
        })
    }

    // Отримуємо всі кнопки "Купити" на сторінці
    let buyButtons = document.querySelectorAll('.catalog .cart-btn');
    // Навішуємо обробник подій на кожну кнопку "Купити"
    if (buyButtons) {
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart);
        });
    }
})

