class Kiosk {
    constructor () {
        const appCalculate = document.querySelector(".app-section-calculate");
        this.btnItem = appCalculate.querySelector(".btn-item");
        this.btnInput = appCalculate.querySelector(".btn-input-money");
        this.btnReturn = appCalculate.querySelector(".btn-balance-return");

        const appPayment = document.querySelector(".app-section-payment");
        this.btnCancel = appPayment.querySelector(".btn-cancel");
        this.btnOpenRecipt = appPayment.querySelector(".btn-open-modal");
        this.btnPay = appPayment.querySelector(".btn-payment-decision");
        this.btnReset = appPayment.querySelector(".btn-all-reset");

        const appModal = document.querySelector("#modal");
        this.btnCloseRecipt = appModal.querySelector(".btn-close-modal");
    }

    setup () {
        this.bindEvents();
    }

    bindEvents () {

        // 모달창 open 버튼
        this.btnOpenRecipt.addEventListener("click", () => {
            document.querySelector("#modal").style.display = "block";
        })

        // 모달창 close 버튼
        this.btnCloseRecipt.addEventListener("click", () => {
            document.querySelector("#modal").style.display = "none";
        })

    }
}

export default Kiosk;