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
        this.btnCloseReceipt = appReceiptModal.querySelector(".btn-close-receipt");
    }

    setup () {
        this.bindEvents();
    }

    bindEvents () {

        // 결제버튼 클릭시 영수증 발행여부 모달창 열기 기능
        this.btnPay.addEventListener("click", () => {
            document.querySelector("#modal-payed").style.display = "block";
        })

        // 영수증 발행여부 모달창에서 발행 클릭시 해당 모달창 종료와 영수증 모달창 열기
        this.btnIssueReceipt.addEventListener("click", () => {
            document.querySelector("#modal-payed").style.display = "none";
            document.querySelector("#modal-receipt").style.display = "block";
        })

        // 영수증 발행여부 모달창에서 미발행 클릭시 해당 모달창 종료
        this.btnUnissueReceipt.addEventListener("click", () => {
            document.querySelector("#modal-payed").style.display = "none";
        })

        // 영수증 모달창 close 버튼
        this.btnCloseReceipt.addEventListener("click", () => {
            document.querySelector("#modal-receipt").style.display = "none";
        })

    }
}

export default Kiosk;