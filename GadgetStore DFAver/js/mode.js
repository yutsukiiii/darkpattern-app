(function () {

    // 現在の表示モードを取得
    let mode = localStorage.getItem("gadgetMode") || "normal";

    // ダークパターン版かどうか
    window.isDarkPatternMode = mode === "dark";

    // 表示モードに応じてクラスを設定
    document.body.classList.toggle(
        "dark-mode",
        window.isDarkPatternMode
    );

    // 切り替えボタンを作成
    const header = document.querySelector(".header-inner");

    if (!header) return;

    const button = document.createElement("button");

    button.id = "mode-toggle";
    button.textContent = window.isDarkPatternMode
        ? "通常版に切り替える"
        : "ダークパターン版に切り替える";

    button.addEventListener("click", () => {

        const nextMode = window.isDarkPatternMode
            ? "normal"
            : "dark";

        localStorage.setItem("gadgetMode", nextMode);

        location.reload();

    });

    header.appendChild(button);

})();