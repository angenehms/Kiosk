class FoodGenerator {

    constructor () {
        const appCalculate = document.querySelector(".app-section-calculate");
        this.itemList = appCalculate.querySelector(".item-list"); // 키오스크 스크린 내 ul 태그
        this.balance = appCalculate.querySelector(".amount-balance"); // 잔액 span 태그


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

        renderItem();
        addBtnsEventWhenRerender();

        function addBtnsEventWhenRerender () {

            // 돔 리랜더링 시 kiosk 스크린 아이템 버튼 이벤트 부여
            const btnsItem = itemList.querySelectorAll("button");

            btnsItem.forEach((item) => {      

                item.addEventListener("click", (e) => {

                const targetEl = e.currentTarget;
                const balanceVal = parseInt(balance.textContent.replaceAll(",", ""));
                console.log(e.currentTarget.dataset.price);

                if ( balanceVal >= targetEl.dataset.price ) {
                    balance.textContent = new Intl.NumberFormat().format(balanceVal - targetEl.dataset.price) + " 원";

                    // staged 리스트에 아이템 정보리스트 추가

                } else {
                    alert("잔액이 부족합니다.");
                }
                
                })

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

        function renderItem() {

            itemList.innerHTML = "";

            data.forEach((el) => {

                const pageNumerOfItem = Math.ceil((data.indexOf(el)+1)/6);
                const lastIndexOfItem = Math.ceil((data.length)/6);
    
                const item = document.createElement("li");
                item.className = `pagination${pageNumerOfItem}`;

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

                }
            );

            document.querySelector(".item-list").appendChild(docFrag);
            
        }
        
    }
    
}

export default FoodGenerator;