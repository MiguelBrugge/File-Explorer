import Explorer from "./Explorer.js";
import Item from "./Item.js";
export default class Folder extends Item {
    items;
    selected = {
        item: null,
        element: null
    };
    constructor(name = 'New Folder') {
        super(name);
        this.items = [];
    }
    render(items = this.items) {
        const contentElement = document.querySelector('#content');
        contentElement.innerHTML = '';
        for (const item of items) {
            const div = document.createElement('div');
            if (item instanceof Folder) {
                div.addEventListener('click', event => {
                    if (event.detail == 1) {
                        this.select(item, div);
                    }
                    else {
                        Explorer.render(item);
                    }
                });
            }
            div.classList.add('clickable');
            div.innerHTML += `
                <i class="fa-solid fa-folder-closed"></i>
                <p>${item.getName()}</p>`;
            contentElement.append(div);
        }
    }
    select(item, element) {
        this.selected.element?.classList.remove('selected');
        this.selected = { item: item, element };
        element.classList.add('selected');
    }
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        if (item) {
            this.items.splice(this.items.indexOf(item), 1);
            this.render();
        }
    }
    getItems() {
        return this.items;
    }
    getSelected() {
        return this.selected;
    }
}
