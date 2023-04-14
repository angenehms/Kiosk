class Kiosk {
    constructor () {
        const appCalculate = document.querySelector(".app-section-calculate");
        this.btnItem = appCalculate.querySelector(".btn-item");
        this.btnInput = appCalculate.querySelector(".btn-input-money");
        this.btnReturn = appCalculate.querySelector(".btn-balance-return");

        const appPayment = document.querySelector(".app-section-payment");
        this.btnCancel = appPayment.querySelector(".btn-cancel");
        this.btnPay = appPayment.querySelector(".btn-payment-decision");
        this.btnReset = appPayment.querySelector(".btn-all-reset");

        const appPayedModal = document.querySelector("#modal-payed");
        this.btnIssueReceipt = appPayedModal.querySelector(".btn-issue-receipt");
        this.btnUnissueReceipt = appPayedModal.querySelector(".btn-unissue-receipt");

        const appReceiptModal = document.querySelector("#modal-receipt");
        this.btnClosereceipt = appReceiptModal.querySelector(".btn-close-receipt");
    }

    setup () {
        this.bindEvents();
    }

    bindEvents () {

        // 영수증 모달창 close 버튼
        this.btnClosereceipt.addEventListener("click", () => {
            document.querySelector("#modal-receipt").style.display = "none";
        })

    }
}

export default Kiosk;