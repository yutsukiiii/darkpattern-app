const recommendArea = document.getElementById("recommend-products");

if (recommendArea) {
    recommendArea.innerHTML = products.map(product => `
        <div class="product-card">
            <a href="pages/detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
            </a>
            <p>¥${product.price.toLocaleString()}</p>
        </div>
    `).join("");
}