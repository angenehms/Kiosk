class FoodGenerator {

    constructor () {

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

        renderItem();
        addBtnsEventWhenRerender();

        function addBtnsEventWhenRerender () {

            // 돔 리랜더링 시 kiosk 스크린 아이템 버튼 이벤트 부여

            const itemList = document.querySelector(".item-list");
            const btnsItem = itemList.querySelectorAll("button");
            btnsItem.forEach((item) => {      

            item.addEventListener("click", (e) => {

                const targetEl = e.currentTarget;
                
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

            document.querySelector(".item-list").innerHTML = "";

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