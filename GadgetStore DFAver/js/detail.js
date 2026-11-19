
const productDetail = document.getElementById("product-detail");
const message = document.getElementById("message");
//表示モード
const isDark = window.isDarkPatternMode;

// URLから商品IDを取得
const params = new URLSearchParams(location.search);
const productId = Number(params.get("id"));

// 商品データから該当商品を検索
const product = products.find(item => item.id === productId);

if (product) {

    //ダークパターン用の表示
    const displayStock = isDark
    ? Math.min(product.stock,1)
    : product.stock;

    const displayOriginalPrice = isDark
    ? Math.round(product.originalPrice * 1.5)
    : product.originalPrice;

    const discountRate = Math.round(
        (1 - product.price / displayOriginalPrice)*100 
    );

    productDetail.innerHTML = `
        <div class="detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="detail-info">
            <p class="detail-category">${product.category}</p>
            <h2>${product.name}</h2>

            ${
                isDark
                ?`
                <p class="stock-warnig">
                    残り${displayStock}点！
                    お早めにお買い求めください！
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

            <p class="detail-price">
                ¥${product.price.toLocaleString()}
            </p>

            <div class="quantity-area">
                <label for="quantity">数量：</label>
                <input type="number" id="quantity" value="1" min="1" max="99">
            </div>

            <button id="add-cart-button" class="btn">
                カートに追加
            </button>

            <p class="back-link">
                <a href="products.html">← 商品一覧に戻る</a>
            </p>
        </div>
    `;

    // カート追加処理
    document.getElementById("add-cart-button")
        .addEventListener("click", () => {

            const quantity = Number(
                document.getElementById("quantity").value
            );

            if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
                message.textContent = "数量は1〜99の整数で入力してください。";
                return;
            }

            // LocalStorageからカート情報を取得
            let cart = JSON.parse(
                localStorage.getItem("gadgetCart") || "[]"
            );

            // すでにカートにある商品か確認
            const existingItem = cart.find(
                item => item.id === product.id
            );

            if (existingItem) {
                if (existingItem.quantity + quantity > 99) {
                    message.textContent = "この商品の数量は99個までです。";
                    return;
                }

                existingItem.quantity += quantity;

            } else {
                cart.push({
                    id: product.id,
                    quantity: quantity
                });
            }

            // カート情報を保存
            localStorage.setItem(
                "gadgetCart",
                JSON.stringify(cart)
            );

            message.textContent = "カートに追加しました！";
        });

} else {

    productDetail.innerHTML = `
        <p>商品が見つかりませんでした。</p>
        <a href="products.html">商品一覧に戻る</a>
    `;

}