import Folder from "./Folder.js";
import Item from "./Item.js";

export default class Explorer {
    private static currentFolder: Folder = new Folder('Documents');
    private static path = new Set<Folder>;

    public static render(item: Item | undefined = undefined): void {
        if (item) {
            this.currentFolder = item as Folder;
        }
        this.currentFolder.render();
        this.path.add(this.currentFolder);
        this.updatePath();
    }

    public static addItem(type: string, name: string | undefined = undefined): void {
        if (type == 'Folder') {
            this.currentFolder.addItem(new Folder(name));
        } else {
            // TODO file
        }
    }

    public static removeItem(): void {
        Explorer.currentFolder.removeItem(Explorer.currentFolder.getSelected().item);
    }

    public static renameItem(name: string): void {
        this.currentFolder.getSelected().item?.setName(name);
        this.currentFolder.render();
    }

    public static search(input: string): void{
        const filteredItems: Item[] = this.currentFolder.getItems().filter(item => item.getName().toLowerCase().includes(input));
        this.currentFolder.render(filteredItems);
    }

    private static updatePath(): void {
        const breadcrumbs = document.querySelector('#breadcrumbs') as HTMLDivElement;
        breadcrumbs.innerHTML = '';

        this.path.forEach(folder => {
            const isCurrentFolder = folder === this.currentFolder;
            const button = document.createElement('button') as HTMLButtonElement;
            button.className = `fa-solid fa-folder-closed ${isCurrentFolder ? 'active' : ''}`;
            button.innerHTML = folder.getName();
            button.addEventListener('click', () => {
                this.currentFolder = folder;
                const index: number = Array.from(this.path).indexOf(folder);
                const pathArray = Array.from(this.path);
                for (let i = index + 1; i < pathArray.length; i++) {
                    this.path.delete(pathArray[i]);
                }
                this.render();
                this.updatePath();
            });
            breadcrumbs.appendChild(button);

            if (!isCurrentFolder) {
                const separator = document.createTextNode('/');
                breadcrumbs.appendChild(separator);
            }
        });
    }
}