class Kiosk {
    
    constructor () {
        
        const appCalculate = document.querySelector(".app-section-calculate");
        // this.btnItem = appCalculate.querySelector(".btn-item"); // 메뉴버튼
        this.btnInput = appCalculate.querySelector(".btn-input-money"); // 입금버튼
        this.btnReturn = appCalculate.querySelector(".btn-balance-return"); // 반환버튼
        this.itemList = appCalculate.querySelector(".item-list");
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

        const appResetModal = document.querySelector("#modal-reset");
        this.btnResetConfirm = appResetModal.querySelector(".btn-reset-confirm");
        this.btnResetCancel = appResetModal.querySelector(".btn-reset-cancel");

    }

    setup () {

        this.bindEvents();

    }

    bindEvents () {

        // console.log(this.btnItem); 
        // console.log(document.querySelector(".btn-item"));
        // 왜 위 두개의 콘솔은 다른 값을 출력시키는 거지? 같은 것을 타게팅 하고있다고 생각하는데 ..

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

            // 결제버튼 클릭시 : staged 리스트 없으면 결제할 상품을 선택해주세요! 창 띄우기            
            if ( StagedItem.length ) {

                // 결제버튼 클릭시 : 영수증 모달에 staged 리스트 뿌리기
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
                });


                // 결제버튼 클릭시 : 모달창에 발행일시 현재시간 뿌려주기
                const orderDate = document.querySelector("#modal-receipt .order-date"); // 발행일시 div

                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const day = now.getDate();
                const hour = now.getHours();
                const minute = now.getMinutes();
                const second = now.getSeconds();

                const ampm = hour >= 12 ? '오후' : '오전';
                const formattedHour = hour % 12 === 0 ? 12 : `0${hour % 12}`;
                const formattedMonth = month < 10 ? `0${month}` : month;
                const formattedDay = day < 10 ? `0${day}` : day;
                const formattedMinute = minute < 10 ? `0${minute}` : minute;
                const formattedSecond = second < 10 ? `0${second}` : second;

                const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
                const formattedTime = `${ampm} ${formattedHour}:${formattedMinute}:${formattedSecond}`;

                const formattedDateTime = `${formattedDate} ${formattedTime}`;

                orderDate.textContent = `발 행 일 시 : ${formattedDateTime}`;


                // 결제버튼 클릭시 : 모달창에 주문번호 난수 뿌려주기
                const orderNumber = document.querySelector("#modal-receipt .order-number"); // 주문번호 div
                const orderNumberVal = Math.floor(Math.random() * 99) + 1;
                orderNumber.textContent = `주 문 번 호 : ${orderNumberVal}`;


                // 결제버튼 클릭시 : 모달창에 결제금액 데이터 받아서 뿌려주기
                const amountPayed = document.querySelector("#modal-receipt .amount-payed"); // 결제금액 div
                const amountPayedVal = document.querySelector(".app-section-payment .amount-total").textContent;
                amountPayed.textContent = `결 제 금 액 : ${amountPayedVal}`;

                document.querySelector("#modal-payed").style.display = "block";

            } else {

                alert("결제할 상품을 선택해주세요!");

            }
              
        })

        // 영수증 발행여부 모달창에서 발행 클릭시 해당 모달창 종료와 영수증 모달창 열기
        this.btnIssueReceipt.addEventListener("click", () => {
            document.querySelector("#modal-payed").style.display = "none";
            document.querySelector("#modal-receipt").style.display = "block";
        })

        // 처음으로 버튼 // 처음으로 돌아가시겠습니까?
        this.btnReset.addEventListener("click", () => {
            document.querySelector("#modal-reset").style.display = "block";
        });

        // 리셋 모달창 닫기 버튼
        this.btnResetCancel.addEventListener("click", () => {
            document.querySelector("#modal-reset").style.display = "none";
        });

    }
}

export default Kiosk;