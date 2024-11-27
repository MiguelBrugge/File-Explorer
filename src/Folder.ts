import Explorer from "./Explorer.js";
import Item from "./Item.js";

export default class Folder extends Item {
    private items: Item[];
    private selected: { item: Item | null; element: HTMLDivElement | null } = {
        item: null,
        element: null
    };

    public constructor(name: string = 'New Folder') {
        super(name);
        this.items = [];
    }

    public render(items: Item[] = this.items): void {
        const contentElement = document.querySelector('#content') as HTMLDivElement;
        contentElement.innerHTML = '';
        for (const item of items) {
            const div = document.createElement('div');
            if (item instanceof Folder) {
                div.addEventListener('click', event => {
                    if (event.detail == 1) {
                        this.select(item, div);
                    } else {
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

    private select(item: Item, element: HTMLDivElement): void {
        this.selected.element?.classList.remove('selected');
        this.selected = { item: item, element };
        element.classList.add('selected');
    }

    public addItem(item: Item): void {
        this.items.push(item);
    }

    public removeItem(item: Item | null): void {
        if (item) {
            this.items.splice(this.items.indexOf(item), 1);
            this.render();
        }
    }

    public getItems(): Item[] {
        return this.items;
    }

    public getSelected(): { item: Item | null; element: HTMLDivElement | null } {
        return this.selected;
    }
}