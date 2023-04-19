class Kiosk {
    
    constructor () {
        
        const appCalculate = document.querySelector(".app-section-calculate");
        // this.btnItem = appCalculate.querySelector(".btn-item"); // 메뉴버튼
        this.btnInput = appCalculate.querySelector(".btn-input-money"); // 입금버튼
        this.btnReturn = appCalculate.querySelector(".btn-balance-return"); // 반환버튼
        // this.itemList = appCalculate.querySelector(".item-list");
        this.myMoney = appCalculate.querySelector(".amount-mymoney"); // 소지금텍스트
        this.inputMoney = appCalculate.querySelector(".inp-put"); // 입금액인풋태그
        this.balance = appCalculate.querySelector(".amount-balance"); // 잔액 span 태그

        const appPayment = document.querySelector(".app-section-payment");
        // this.stagedList = appPayment.querySelector(".item-list-staged"); // staged 목록 ul 태그
        this.btnCancel = appPayment.querySelector(".btn-cancel"); // 메뉴취소버튼
        this.btnPay = appPayment.querySelector(".btn-payment-decision"); // 결제버튼
        this.btnReset = appPayment.querySelector(".btn-all-reset"); // 처음으로버튼
        this.amountTotal = appPayment.querySelector(".amount-total") // 총 가격 스팬태그

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

            document.querySelector(".amount-mymoney").textContent = initialMyMoney; // 소지금 리셋
            document.querySelector(".inp-put").value = ""; // 입금 인풋창 리셋
            document.querySelector(".amount-balance").textContent = "0 원"; // 잔액 리셋
            document.querySelector(".amount-total").textContent = "0 원"; // 총 가격 리셋
            document.querySelector(".item-list-staged").innerHTML = ""; // staged 목록 리셋
            
            // data-count 재고 리셋함수 작성해야함
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

        // 결제버튼 클릭시 영수증 발행여부 모달창 열기 기능 && 영수증 모달에 리스트 뿌리기
        this.btnPay.addEventListener("click", () => {

            const StagedItem = document.querySelectorAll(".app-section-payment .item-list-staged li");

            // staged 리스트 없으면 결제할 상품을 선택해주세요! 창 띄우기 

            // 영수증 모달에 staged 리스트 뿌리기
            StagedItem.forEach((item) => {

                const modalStagedList = document.querySelector("#modal-receipt .item-list-staged");
                const modalStagedItem = document.createElement("li");
                const imgOfModalStagedItem = item.querySelector(".item-img").getAttribute("src");
                const imgAltOfModalStagedItem = item.querySelector(".item-img").getAttribute("alt");
                const nameOfModalStagedItem = item.querySelector(".item-name").textContent;
                const countOfModalStagedItem = item.querySelector(".num-counter").textContent;

                const modalStagedItemTemplate = `
                    <img class="item-img" src="${imgOfModalStagedItem}" alt="${imgAltOfModalStagedItem}">
                    <strong class="item-name">${nameOfModalStagedItem}</strong>
                    <span class="num-counter">${countOfModalStagedItem}</span>
                `

                modalStagedItem.innerHTML = modalStagedItemTemplate;
                modalStagedList.appendChild(modalStagedItem);
            })

            // 발행일시 현재시간 출력해야함
            // 주문번호 난수 출력해야함
            // 결제금액 데이터 받아와야함

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

        // 처음으로 버튼 // 처음으로 돌아가시겠습니까 모달창 만들까?
        this.btnReset.addEventListener("click", resetFunction);

    }
}

export default Kiosk;