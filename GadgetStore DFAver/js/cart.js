
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartSummary = document.getElementById("cart-summary");
const emptyCart = document.getElementById("empty-cart");

const isDark = window.isDarkPatternMode;
const SHIPPING_FEE = 800;

// 送料表示欄を作成
let shippingInfo = document.getElementById("shipping-info");

if (!shippingInfo) {
    shippingInfo = document.createElement("p");
    shippingInfo.id = "shipping-info";
    cartSummary.appendChild(shippingInfo);
}

// カート情報を取得
function getCart() {
    return JSON.parse(localStorage.getItem("gadgetCart") || "[]");
}

// カート情報を保存
function saveCart(cart) {
    localStorage.setItem("gadgetCart", JSON.stringify(cart));
}

// カートを表示
function displayCart() {

    const cart = getCart();

    let subtotal = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        emptyCart.hidden = false;
        cartSummary.hidden = true;
        return;
    }

    emptyCart.hidden = true;
    cartSummary.hidden = false;

    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return;

        const itemSubtotal = product.price * item.quantity;
        subtotal += itemSubtotal;

        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";

        itemElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="cart-item-info">
                <h3>${product.name}</h3>
                <p>¥${product.price.toLocaleString()}</p>

                <div class="cart-quantity">
                    <label>数量：</label>
                    <input
                        type="number"
                        class="quantity-input"
                        data-id="${product.id}"
                        value="${item.quantity}"
                        min="1"
                        max="99"
                    >
                </div>

                <p>小計：¥${itemSubtotal.toLocaleString()}</p>

                <button
                    class="remove-button"
                    data-id="${product.id}"
                >
                    削除
                </button>
            </div>
        `;

        cartItems.appendChild(itemElement);
    });

    const shippingFee = SHIPPING_FEE;
    const total = isDark
        ? subtotal
        : subtotal + shippingFee;

    cartTotal.textContent = `¥${total.toLocaleString()}`;

    // 通常版では送料を表示
    if (isDark) {
        shippingInfo.textContent = "";
        shippingInfo.hidden = true;
    } else {
        shippingInfo.hidden = false;
        shippingInfo.textContent =
            `送料：¥${shippingFee.toLocaleString()}（商品合計とは別に表示）`;
    }
}

// 数量変更・削除
cartItems.addEventListener("change", event => {

    if (!event.target.classList.contains("quantity-input")) {
        return;
    }

    const id = Number(event.target.dataset.id);
    const quantity = Number(event.target.value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        alert("数量は1〜99の整数で入力してください。");
        displayCart();
        return;
    }

    const cart = getCart();

    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity = quantity;
    }

    saveCart(cart);
    displayCart();
});

// 商品削除
cartItems.addEventListener("click", event => {

    if (!event.target.classList.contains("remove-button")) {
        return;
    }

    const id = Number(event.target.dataset.id);

    const cart = getCart();

    const updatedCart = cart.filter(
        item => item.id !== id
    );

    saveCart(updatedCart);
    displayCart();
});

// 初期表示
displayCart();
