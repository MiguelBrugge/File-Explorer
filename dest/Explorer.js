import Folder from "./Folder.js";
export default class Explorer {
    static currentFolder = new Folder('Documents');
    static path = new Set;
    static render(item = undefined) {
        if (item) {
            this.currentFolder = item;
        }
        this.currentFolder.render();
        this.path.add(this.currentFolder);
        this.updatePath();
    }
    static addItem(type, name = undefined) {
        if (type == 'Folder') {
            this.currentFolder.addItem(new Folder(name));
        }
        else {
            // TODO file
        }
    }
    static removeItem() {
        Explorer.currentFolder.removeItem(Explorer.currentFolder.getSelected().item);
    }
    static renameItem(name) {
        this.currentFolder.getSelected().item?.setName(name);
        this.currentFolder.render();
    }
    static search(input) {
        const filteredItems = this.currentFolder.getItems().filter(item => item.getName().toLowerCase().includes(input));
        this.currentFolder.render(filteredItems);
    }
    static updatePath() {
        const breadcrumbs = document.querySelector('#breadcrumbs');
        breadcrumbs.innerHTML = '';
        this.path.forEach(folder => {
            const isCurrentFolder = folder === this.currentFolder;
            const button = document.createElement('button');
            button.className = `fa-solid fa-folder-closed ${isCurrentFolder ? 'active' : ''}`;
            button.innerHTML = folder.getName();
            button.addEventListener('click', () => {
                this.currentFolder = folder;
                const index = Array.from(this.path).indexOf(folder);
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
