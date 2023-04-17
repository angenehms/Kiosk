class Kiosk {
    constructor () {
        const appCalculate = document.querySelector(".app-section-calculate");
        // this.btnItem = appCalculate.querySelector(".btn-item"); // 메뉴버튼
        this.btnInput = appCalculate.querySelector(".btn-input-money"); // 입금버튼
        this.btnReturn = appCalculate.querySelector(".btn-balance-return"); // 반환버튼
        // this.itemList = appCalculate.querySelector("item-list");
        this.myMoney = appCalculate.querySelector(".amount-mymoney"); // 소지금텍스트
        this.inputMoney = appCalculate.querySelector(".inp-put"); // 입금액인풋태그
        this.balance = appCalculate.querySelector(".amount-balance"); // 잔액텍스트

        const appPayment = document.querySelector(".app-section-payment");
        this.btnCancel = appPayment.querySelector(".btn-cancel"); // 메뉴취소버튼
        this.btnPay = appPayment.querySelector(".btn-payment-decision"); // 결제버튼
        this.btnReset = appPayment.querySelector(".btn-all-reset"); // 처음으로버튼
        this.totalPayed = appPayment.querySelector(".amount-total") // 가격텍스트

        const appPayedModal = document.querySelector("#modal-payed");
        this.btnIssueReceipt = appPayedModal.querySelector(".btn-issue-receipt"); // 발행버튼 
        this.btnUnissueReceipt = appPayedModal.querySelector(".btn-unissue-receipt"); // 미발행버튼

        const appReceiptModal = document.querySelector("#modal-receipt");
        this.btnCloseReceipt = appReceiptModal.querySelector(".btn-close-receipt"); // 닫기버튼
    }

    setup () {
        this.bindEvents();
    }

    bindEvents () {

        // console.log(this.btnItem); 
        // console.log(document.querySelector(".btn-item"));
        // 왜 위 두개의 콘솔은 다른 값을 출력시키는 거죠? 같은 것을 타게팅 하고있다고 생각하는데 ..

        const initialMyMoney = this.myMoney.textContent;

        // 초기화 함수
        function resetFunction () {
            document.querySelector(".amount-mymoney").textContent = initialMyMoney;
            document.querySelector(".inp-put").value = "";
            document.querySelector(".amount-balance").textContent = "0 원";
        }

        // 입금버튼
        this.btnInput.addEventListener("click", () => {
            const inputMoney = parseInt(this.inputMoney.value);
            const myMoney = parseInt(this.myMoney.textContent.replaceAll(",", ""));
            const balance = parseInt(this.balance.textContent.replaceAll(",", ""));

            if ( inputMoney ) {

                if ( inputMoney <= myMoney && inputMoney >= 0 ) {
                    this.inputMoney.value = "";
                    this.myMoney.textContent = new Intl.NumberFormat().format(myMoney - inputMoney) + " 원";
                    this.balance.textContent = new Intl.NumberFormat().format(balance + inputMoney) + " 원";
                } else if ( inputMoney > myMoney ) {
                    this.inputMoney.value = "";
                    alert("소지금이 부족합니다!");
                } else {
                    this.inputMoney.value = "";
                    alert("올바르지 않은 입금입니다!")
                } 

            } else {
                this.inputMoney.value = "";
                alert("입금액을 입력해주세요!")
            }
        })

        // 반환버튼
        this.btnReturn.addEventListener("click", () => {
            const myMoney = parseInt(this.myMoney.textContent.replaceAll(",", ""));
            const balance = parseInt(this.balance.textContent.replaceAll(",", ""));

            if ( balance > 0 ) {
                this.myMoney.textContent = new Intl.NumberFormat().format(myMoney + balance) + " 원";
                this.balance.textContent = new Intl.NumberFormat().format(balance - balance) + " 원";
            } else {
                alert("반환할 잔액이 없습니다!");
            }
        })

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
            resetFunction();
        })

        // 영수증 모달창 close 버튼
        this.btnCloseReceipt.addEventListener("click", () => {
            document.querySelector("#modal-receipt").style.display = "none";
            resetFunction();
        })

        // 처음으로 버튼
        this.btnReset.addEventListener("click", resetFunction);

        // 결제버튼 클릭시 선택한 상품이 없으면 상품을 선택해주세요! 라는 메세지 출력
        // 

    }
}

export default Kiosk;