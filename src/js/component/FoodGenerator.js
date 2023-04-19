class FoodGenerator {

    constructor () {
        const appCalculate = document.querySelector(".app-section-calculate");
        this.itemList = appCalculate.querySelector(".item-list"); // 키오스크 스크린 내 ul 태그
        this.balance = appCalculate.querySelector(".amount-balance"); // 잔액 span 태그

        const appPayment = document.querySelector(".app-section-payment");
        this.stagedList = appPayment.querySelector(".item-list-staged");
        this.amountTotal = appPayment.querySelector(".amount-total") // 총 가격 span 태그
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
                    btnPageMinus.className = "ir"
                } else {
                    // btnPageMinus.removeAttribute("disabled");
                    btnPageMinus.className = "btn-page-minus"
                }

                if ( currentPageNumber >= lastIndexOfItem ) {
                    // btnPagePlus.setAttribute("disabled", "");
                    btnPagePlus.className = "ir"

                } else {
                    // btnPagePlus.removeAttribute("disabled");
                    btnPagePlus.className = "btn-page-plus"
                }

                // ** 페이지에 따라 화살표 보이기도 말기도 하게하는 코드 **

                }
            );

            document.querySelector(".item-list").appendChild(docFrag);
            
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


        function addBtnsEventWhenRerender () {

            // 돔 리랜더링 시 kiosk 스크린 아이템 버튼 이벤트 부여
            const btnsItem = itemList.querySelectorAll("button");

            btnsItem.forEach((item) => {      

                if ( parseInt(item.dataset.count) <= 0 ) { // 초기 랜더링시 재고가 0 이하일 경우 품절 표시
                    item.parentElement.className += " sold-out"
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
                        amountTotal.textContent = new Intl.NumberFormat().format(totalVal + parseInt(targetEl.dataset.price)) + " 원" // + 연산은 - 연산보다 더 엄격히 타입을 분명히 해야한다. + 연산은 텍스트 끼리 합쳐주는 연산도 가능하기 떄문에 숫자인지 스트링인지 명시해주어야한다.

                        if ( arrayStagedMenuName.includes(nameOfTargetedMenu) ) { // staged 에 이미 있는 아이템일 경우

                            if ( targetEl.dataset.count >= 2 ) {

                                targetEl.dataset.count --;

                                [...nodeStagedElement].forEach((item) => {

                                    if ( item.querySelector(".item-name").textContent === nameOfTargetedMenu) {
                                        item.querySelector(".num-counter").textContent ++;
                                    }
                                 
                                    }
                                )

                            } else if ( parseInt(targetEl.dataset.count) === 1 ) { // === 이므로 타입 엄격

                                targetEl.dataset.count --;
                                targetEl.parentNode.className += " sold-out"; // 재고 소진시 품절 디자인 입히는 코드

                                [...nodeStagedElement].forEach((item) => {

                                    if ( item.querySelector(".item-name").textContent === nameOfTargetedMenu) {
                                        item.querySelector(".num-counter").textContent ++;
                                    }
                                 
                                    }
                                )

                            } else {

                                targetEl.parentNode.className += " sold-out"

                            } // 그외의 경우에 버그 발생경우 그 때 함수 작동토록 해보자 일단.

                        } else { // staged 에 없는 아이템일 경우

                            targetEl.dataset.count --;

                            // staged 리스트에 아이템 정보리스트 추가
                            const stagedItem = document.createElement("li");
                            const stagedItemTemplate = `
                                <button class="btn-cancel" type="button">
                                    <img class="item-img" src="./src/image/${item.dataset.img}.png" alt="${item.dataset.img}">
                                    <strong class="item-name">${item.dataset.item}</strong>
                                    <span class="num-counter">1</span>
                                </button>
                                `;

                            stagedItem.innerHTML = stagedItemTemplate;
                            // docFrag.appendChild(stagedItem);
                            document.querySelector(".item-list-staged").appendChild(stagedItem);

                        }

                    } else { // 살돈 없다

                        alert("잔액이 부족합니다! 소지금을 입금하세요!");

                    }                
                    
                }

                )

            })
        }    
        
    }
    
}

export default FoodGenerator;