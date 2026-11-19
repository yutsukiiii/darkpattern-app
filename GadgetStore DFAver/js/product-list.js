const productArea = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultCount = document.getElementById("result-count");
const noResult = document.getElementById("no-result");

let selectedCategory = "all";

// 商品表示
function displayProducts() {

    const keyword = searchInput.value.trim().toLowerCase();
    const isDark = window.isDarkPatternMode === true;

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const matchesKeyword =
            product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword);

        return matchesCategory && matchesKeyword;
    });

    resultCount.textContent =
        `${filteredProducts.length} 件の商品`;

    noResult.hidden = filteredProducts.length !== 0;

    productArea.innerHTML = filteredProducts.map(product => {

        const displayStock = isDark
            ? Math.min(product.stock, 1)
            : product.stock;

        const displayOriginalPrice = isDark
            ? Math.round(product.originalPrice * 1.5)
            : product.originalPrice;

        const discountRate = Math.round(
            (1 - product.price / displayOriginalPrice) * 100
        );

        return `
            <div class="product-card">

                <a href="detail.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                </a>

                ${
                    isDark
                    ? `
                        <p class="stock-warning">
                            残り${displayStock}点！お早めに！
                        </p>

                        <p class="original-price">
                            ¥${displayOriginalPrice.toLocaleString()}
                        </p>

                        <p class="discount">
                            ${discountRate}% OFF
                        </p>
                    `
                    : `
                        <p class="stock-normal">
                            在庫数：${product.stock}点
                        </p>

                        <p class="original-price">
                            参考価格：
                            ¥${product.originalPrice.toLocaleString()}
                        </p>
                    `
                }

                <p class="product-price">
                    ¥${product.price.toLocaleString()}
                </p>

            </div>
        `;
    }).join("");
}


// カテゴリ絞り込み
document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;

        document.querySelectorAll(".filter-btn")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        displayProducts();
    });
});


// 検索ボタン
searchButton.addEventListener("click", displayProducts);


// Enterキー検索
searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        displayProducts();
    }

});


// 初期表示
displayProducts();
