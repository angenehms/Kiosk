class FoodGenerator {

    constructor () {

        const appCalculate = document.querySelector(".app-section-calculate");
        this.itemList = appCalculate.querySelector(".item-list"); // 키오스크 스크린 내 ul 태그
        this.balance = appCalculate.querySelector(".amount-balance"); // 잔액 span 태그
        this.myMoney = appCalculate.querySelector(".amount-mymoney"); // 소지금텍스트

        const appPayment = document.querySelector(".app-section-payment");
        this.stagedList = appPayment.querySelector(".item-list-staged");
        this.amountTotal = appPayment.querySelector(".amount-total"); // 총 가격 span 태그

        const appPayedModal = document.querySelector("#modal-payed");
        this.btnUnissueReceipt = appPayedModal.querySelector(".btn-unissue-receipt"); // 미발행버튼

        const appReceiptModal = document.querySelector("#modal-receipt");
        this.btnCloseReceipt = appReceiptModal.querySelector(".btn-close-receipt"); // 닫기버튼

        const appResetModal = document.querySelector("#modal-reset");
        this.btnResetConfirm = appResetModal.querySelector(".btn-reset-confirm");

    }

    async setup() {

        await this.loadData((json) => {
            this.foodFactory(json);
        });

    }

    async loadData(callback) {

        const response = await fetch("src/js/item.json");

        if (response.ok) {
            callback(await response.json());
        } else {
            alert("통신 에러" + response.status);
        }

    }

    foodFactory(data) {

        const docFrag = document.createDocumentFragment();

        const btnPagePlus = document.querySelector(".btn-page-plus");
        const btnPageMinus = document.querySelector(".btn-page-minus");
        let currentPageNumber = 1;

        const itemList = this.itemList; // 키오스크 스크린 내 ul 태그
        const balance = this.balance; // 잔액 span 태그

        const stagedList = this.stagedList // item-list-staged ul 태그
        const amountTotal = this.amountTotal // 총 가격 span 태그

        const initialMyMoney = this.myMoney.textContent;

        const initialDataStock = [];
        data.forEach((item) => { // 처음에 map 을 이용해서 만들어보려고 했는데 콘솔에 undefined 가 찍히는데 또 forEach 는 돼서 forEach 로 함 ..! 왜 map 은 안될까?
            initialDataStock.push({name: item.name, count:item.count});
        })

        renderItem();
        addBtnsEventWhenRerender();


        function renderItem() {

            itemList.innerHTML = "";

            data.forEach((el) => {

                const pageNumerOfItem = Math.ceil((data.indexOf(el)+1)/6);
                const lastIndexOfItem = Math.ceil((data.length)/6);
    
                const item = document.createElement("li");
                item.className = `pagination${pageNumerOfItem}`;

                if ( item.className === `pagination${currentPageNumber}` ) {
    
                    const itemTemplate = `
                        <button class="btn-item" type="button" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
                            <div class="div-menu-img">
                                <img class="item-img" src="./src/image/${el.img}.png" alt="${el.name}">
                            </div>
                            <div class="div-menu-name">${el.name}</div>
                            <div class="div-menu-price">${el.cost} 원</div>
                        </button>
                    `;
    
                    item.innerHTML = itemTemplate;
                    docFrag.appendChild(item);

                }

                // ** 페이지에 따라 화살표 보이기도 말기도 하게하는 코드 **

                if ( currentPageNumber <= 1 ) {
                    // btnPageMinus.setAttribute("disabled", "");
                    btnPageMinus.className = "ir";
                } else {
                    // btnPageMinus.removeAttribute("disabled");
                    btnPageMinus.className = "btn-page-minus";
                }

                if ( currentPageNumber >= lastIndexOfItem ) {
                    // btnPagePlus.setAttribute("disabled", "");
                    btnPagePlus.className = "ir";

                } else {
                    // btnPagePlus.removeAttribute("disabled");
                    btnPagePlus.className = "btn-page-plus";
                }

                // ** 페이지에 따라 화살표 보이기도 말기도 하게하는 코드 **

                }
            );

            document.querySelector(".item-list").appendChild(docFrag);
            
        }


        function addBtnsEventWhenRerender () {

            // 돔 리랜더링 시 kiosk 스크린 아이템 버튼 이벤트 부여
            const btnsItem = itemList.querySelectorAll("button");

            btnsItem.forEach((item) => {      

                if ( parseInt(item.dataset.count) <= 0 ) { // 랜더링시 재고가 0 이하일 경우 품절 표시
                    item.parentElement.className += " sold-out";
                }

                item.addEventListener("click", (e) => {

                    const targetEl = e.currentTarget;
                    const balanceVal = parseInt(balance.textContent.replaceAll(",", ""));
                    const totalVal = parseInt(amountTotal.textContent.replaceAll(",", ""));
                   
                    const nodeStagedMenuName = stagedList.querySelectorAll(".item-name"); // 노드리스트에 바로 직접 배열메서드를 쓸 수 없다! [...NodeList] 를 하던가 프로토타입을 이용하여 변환시킨 후 메서드를 사용할 수 있다.
                    const nodeStagedElement = stagedList.querySelectorAll("li");

                    const nameOfTargetedMenu = targetEl.dataset.item; // 선택한 아이템의 메뉴 이름
                    const arrayStagedMenuName = [...nodeStagedMenuName].map((item) => item.textContent); // item-list-staged 에 있는 메뉴이름을 담은 배열
                    // let stockOfMenu = targetEl.dataset.count; // 이렇게 돔 데이터를 변수에 담아서 조작하면 돔이 조작되지 않아! 카운트 같은 경우는 직접 돔을 잡아서 카운트를 변화시켜야 해! 아니면 변수에 담아서 조작한 결과를 다시 돔으로 옮기던가 해야해! 그럼 currentPageNumber 와 비교해서 생각해봐!

                    if ( balanceVal >= targetEl.dataset.price ) { // 살돈 있다

                        balance.textContent = new Intl.NumberFormat().format(balanceVal - parseInt(targetEl.dataset.price)) + " 원"; // 선택상품 가격에 대한 잔액계산
                        amountTotal.textContent = new Intl.NumberFormat().format(totalVal + parseInt(targetEl.dataset.price)) + " 원"; // + 연산은 - 연산보다 더 엄격히 타입을 분명히 해야한다. + 연산은 텍스트 끼리 합쳐주는 연산도 가능하기 떄문에 숫자인지 스트링인지 명시해주어야한다.

                        if ( arrayStagedMenuName.includes(nameOfTargetedMenu) ) { // staged 에 이미 있는 아이템일 경우

                            if ( targetEl.dataset.count >= 2 ) {

                                // targetEl.dataset.count --;

                                data.forEach((element) => {
                                    if ( element.name === targetEl.dataset.item ) {

                                        targetEl.dataset.count --;
                                        element.count --;

                                    }
                                });

                                [...nodeStagedElement].forEach((item) => { // num-counter 박스 숫자 변화

                                    if ( item.querySelector(".item-name").textContent === nameOfTargetedMenu) {
                                        item.querySelector(".num-counter").textContent ++;
                                    }
                                 
                                    }
                                )

                            } else if ( parseInt(targetEl.dataset.count) === 1 ) { // === 이므로 타입 엄격

                                // targetEl.dataset.count --;

                                data.forEach((element) => {
                                    if ( element.name === targetEl.dataset.item ) {

                                        targetEl.dataset.count --;
                                        element.count --;
                                        
                                    }
                                });

                                targetEl.parentNode.className += " sold-out"; // 재고 소진시 품절 디자인 입히는 코드

                                [...nodeStagedElement].forEach((item) => { // num-counter 박스 숫자 변화

                                    if ( item.querySelector(".item-name").textContent === nameOfTargetedMenu) {

                                        item.querySelector(".num-counter").textContent ++;

                                    }
                                 
                                    }
                                )

                            } else {

                                targetEl.parentNode.className += " sold-out"

                            } // 그외의 경우에 버그 발생경우 그 때 함수 작동토록 해보자 일단.

                        } else { // staged 에 없는 아이템일 경우

                            // targetEl.dataset.count --;

                            data.forEach((element) => {

                                if ( element.name === targetEl.dataset.item ) {

                                    targetEl.dataset.count --;
                                    element.count --;

                                }

                            });

                            // staged 리스트에 아이템 정보리스트 추가
                            const stagedItem = document.createElement("li");
                            const stagedItemTemplate = `
                                <div class="div-for-btn-css-design">
                                    <img class="item-img" src="./src/image/${item.dataset.img}.png" alt="${item.dataset.img}">
                                    <strong class="item-name">${item.dataset.item}</strong>
                                    <div class="div-for-btn-stock-position">
                                        <span class="num-counter">1</span>
                                        <button class="btn-stock-plus" type="button">+</button>
                                        <button class="btn-stock-minus" type="button">-</button>
                                    <div>
                                </div>
                                `;

                            stagedItem.innerHTML = stagedItemTemplate;
                            // docFrag.appendChild(stagedItem);

                            document.querySelector(".item-list-staged").appendChild(stagedItem);

                            const btnStockPlus = document.querySelectorAll(".btn-stock-plus");
                            const btnStockMinus = document.querySelectorAll(".btn-stock-minus");

                            [...btnStockPlus].forEach((item) => {
                                item.addEventListener("click", btnStockPlusFunction);
                            });
                            
                            [...btnStockMinus].forEach((item) => {
                                item.addEventListener("click", btnStockMinusFunction);
                            });
                    
                        }

                    } else { // 살돈 없다

                        alert("잔액이 부족합니다! 소지금을 입금하세요!");

                    }                
                    
                }

                )

            })
        }    


        function pagePlusFunction () {
            currentPageNumber++;
            renderItem();
            addBtnsEventWhenRerender();
        }


        function pageMinusFunction () {
            currentPageNumber--;
            renderItem();
            addBtnsEventWhenRerender();
        }

        btnPagePlus.addEventListener("click", pagePlusFunction);
        btnPageMinus.addEventListener("click", pageMinusFunction);


        function btnStockPlusFunction (e) { // staged 아이템 + 버튼

            const targetElParentElement = e.currentTarget.parentElement.parentElement;
            const nameOfTargetEl = targetElParentElement.querySelector(".item-name").textContent;
            const balanceTag = document.querySelector(".amount-balance");
            const balanceVal = parseInt(document.querySelector(".amount-balance").textContent.replaceAll(",", ""));
            const amountTotalTag =  document.querySelector(".amount-total");
            const amountTotalVal = parseInt(document.querySelector(".amount-total").textContent.replaceAll(",", ""));
    
            data.forEach((item) => { // count 는 정수만 와야함 : 상식상 상품 수가 소수인 경우는 이해되지 않음.

                if ( nameOfTargetEl === item.name ) {
                                       
                    if ( item.count >= 2 ) {

                        balanceTag.textContent = new Intl.NumberFormat().format(balanceVal - parseInt(item.cost)) + " 원";
                        amountTotalTag.textContent = new Intl.NumberFormat().format(amountTotalVal + parseInt(item.cost)) + " 원";    

                        item.count --;
                        targetElParentElement.querySelector(".num-counter").textContent ++;

                        renderItem();
                        addBtnsEventWhenRerender();
                        
                    } else if ( item.count === 1 ) {

                        balanceTag.textContent = new Intl.NumberFormat().format(balanceVal - parseInt(item.cost)) + " 원";
                        amountTotalTag.textContent = new Intl.NumberFormat().format(amountTotalVal + parseInt(item.cost)) + " 원";    

                        item.count --;
                        targetElParentElement.querySelector(".num-counter").textContent ++;

                        renderItem();
                        addBtnsEventWhenRerender();
                            
                    } else {

                        alert("품절되었습니다!");

                    }

                } 

            })

        }


        function btnStockMinusFunction (e) { // staged 아이템 - 버튼

            const targetElParentElement = e.currentTarget.parentElement.parentElement;
            const nameOfTargetEl = targetElParentElement.querySelector(".item-name").textContent;
            const balanceTag = document.querySelector(".amount-balance");
            const balanceVal = parseInt(document.querySelector(".amount-balance").textContent.replaceAll(",", ""));
            const amountTotalTag =  document.querySelector(".amount-total");
            const amountTotalVal = parseInt(document.querySelector(".amount-total").textContent.replaceAll(",", ""));

            // 카운트 고려해서 품절표시 지워야함

            data.forEach((item) => { // count 는 정수만 와야함 : 상식상 상품 수가 소수인 경우는 이해되지 않음.

                initialDataStock.forEach((element) => {

                    if ( element.name === item.name ) {

                        if ( nameOfTargetEl === item.name ) {

                            // 클릭시 잔액, 총결제금액 변동처리
                            balanceTag.textContent = new Intl.NumberFormat().format(balanceVal + parseInt(item.cost)) + " 원";
                            amountTotalTag.textContent = new Intl.NumberFormat().format(amountTotalVal - parseInt(item.cost)) + " 원";

                            if ( item.count < element.count - 1 ) {

                                if ( item.count === 0 ) { // staged 에서 수량이 max 재고의 최대치인데 - 버튼 눌렸을 때 발생해야하는 것
                                    
                                    item.count ++;
                                    targetElParentElement.querySelector(".num-counter").textContent --;
                                    renderItem();
                                    addBtnsEventWhenRerender();

                                } else {

                                    item.count ++;
                                    targetElParentElement.querySelector(".num-counter").textContent --;

                                }
        
                            } else if ( item.count === element.count - 1 ) { // staged 에서 수량이 1 남았는데 - 버튼을 누를 경우 발생해야하는 것
        
                                item.count ++;

                                document.querySelectorAll(".item-list-staged li").forEach((small) => { // staged 리스트에서 해당 아이템 목록 제거

                                    if ( item.name === small.querySelector(".item-name").textContent ) {

                                        document.querySelector(".item-list-staged").removeChild(small);

                                    }
                                    
                                })

                                renderItem();
                                addBtnsEventWhenRerender();

                            }
                            
        
                        } 

                    }

                    

                })

            })
        }

 


        // 초기화 함수
        function resetFunction () {

            document.querySelector(".amount-mymoney").textContent = initialMyMoney; // 소지금 리셋
            document.querySelector(".inp-put").value = ""; // 입금 인풋창 리셋
            document.querySelector(".amount-balance").textContent = "0 원"; // 잔액 리셋
            document.querySelector(".amount-total").textContent = "0 원"; // 총 가격 리셋
            document.querySelector(".item-list-staged").innerHTML = ""; // staged 목록 리셋

            data.forEach((item) => {

                initialDataStock.forEach((element) => {

                    if ( element.name === item.name ) {

                        item.count = element.count;

                    }
                })

            })

            document.querySelector("#modal-receipt .item-list-staged").innerHTML = "";

            renderItem();
            addBtnsEventWhenRerender();

        }

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

          // 리셋 모달창 처음으로 버튼
          this.btnResetConfirm.addEventListener("click", () => {
            document.querySelector("#modal-reset").style.display = "none";
            resetFunction();
        });
        
    }
    
}

export default FoodGenerator;