class FoodGenerator {

    constructor () {
        this.itemList = document.querySelector(".app-section-calculate .list-item");
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

        const docFrag = document.createDocumentFragment("li");

        data.forEach((el) => {
            const item = document.createElement("li");
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

        });

        this.itemList.appendChild(docFrag);

    }
}

export default FoodGenerator;