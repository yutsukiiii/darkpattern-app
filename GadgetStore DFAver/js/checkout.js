
const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const orderButton = document.getElementById("order-button");
const checkoutMessage = document.getElementById("checkout-message");

const isDark = window.isDarkPatternMode;
const SHIPPING_FEE = 800;

// カート情報を取得
const cart = JSON.parse(
    localStorage.getItem("gadgetCart") || "[]"
);

let subtotal = 0;
let total = 0;

// 注文商品を表示
function displayCheckout() {

    checkoutItems.innerHTML = "";
    subtotal = 0;

    if (cart.length === 0) {
        checkoutItems.innerHTML =
            "<p>カートに商品がありません。</p>";

        checkoutTotal.textContent = "¥0";
        orderButton.disabled = true;
        return;
    }

    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return;

        const itemSubtotal = product.price * item.quantity;
        subtotal += itemSubtotal;

        const itemElement = document.createElement("div");

        itemElement.className = "checkout-item";

        itemElement.innerHTML = `
            <span>${product.name} × ${item.quantity}</span>
            <strong>¥${itemSubtotal.toLocaleString()}</strong>
        `;

        checkoutItems.appendChild(itemElement);
    });

    // 送料を表示
    const shippingElement = document.createElement("div");

    shippingElement.className = "checkout-item shipping-info";

    shippingElement.innerHTML = `
        <span>送料</span>
        <strong>¥${SHIPPING_FEE.toLocaleString()}</strong>
    `;

    checkoutItems.appendChild(shippingElement);

    // 最終合計
    total = subtotal + SHIPPING_FEE;

    checkoutTotal.textContent = `¥${total.toLocaleString()}`;
}

// 注文確定
orderButton.addEventListener("click", () => {

    if (cart.length === 0) {
        checkoutMessage.textContent =
            "カートに商品がありません。";
        return;
    }

    // 注文情報を保存
    const order = {
        items: cart,
        subtotal: subtotal,
        shippingFee: SHIPPING_FEE,
        total: total,
        date: new Date().toLocaleString("ja-JP")
    };

    localStorage.setItem(
        "gadgetOrder",
        JSON.stringify(order)
    );

    // カートを空にする
    localStorage.removeItem("gadgetCart");

    // 購入完了ページへ移動
    location.href = "complete.html";
});

// 初期表示
displayCheckout();
