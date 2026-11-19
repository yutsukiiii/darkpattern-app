const orderInformation = document.getElementById("order-information");

// 注文情報を取得
const order = JSON.parse(
    localStorage.getItem("gadgetOrder") || "null"
);

if (order) {

    // 旧形式の注文データにも対応
    const subtotal = order.subtotal ?? order.total;
    const shippingFee = order.shippingFee ?? 0;
    const total = order.total;

    orderInformation.innerHTML = `
        <div class="order-info">
            <p>注文日時</p>
            <strong>${order.date}</strong>
        </div>

        <div class="order-info">
            <p>注文商品</p>
            ${order.items.map(item => `
                <p>商品ID：${item.id} × ${item.quantity}</p>
            `).join("")}
        </div>

        <div class="order-info">
            <p>商品合計</p>
            <strong>¥${subtotal.toLocaleString()}</strong>
        </div>

        <div class="order-info">
            <p>送料</p>
            <strong>¥${shippingFee.toLocaleString()}</strong>
        </div>

        <div class="order-info">
            <p>最終合計</p>
            <strong>¥${total.toLocaleString()}</strong>
        </div>
    `;

} else {

    orderInformation.innerHTML = `
        <p>注文情報がありません。</p>
        <a href="products.html">商品一覧へ戻る</a>
    `;

}
