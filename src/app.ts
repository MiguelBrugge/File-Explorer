import Explorer from "./Explorer.js";
import Folder from "./Folder.js";

window.addEventListener('load', initiate);



/**
 * Initiate the application
 */
function initiate(): void {
    const newFolderButton = document.querySelector('#new-folder-button') as HTMLButtonElement;
    newFolderButton?.addEventListener('click', () =>{
        Explorer.addItem('Folder');
        Explorer.render();
    });

    const deleteButton = document.querySelector('#delete') as HTMLButtonElement;
    deleteButton?.addEventListener('click', () => {
        window.confirm('You sure you want to delete this item?') ? Explorer.removeItem() : '';
    });

    const renameButton = document.querySelector('#rename') as HTMLButtonElement;
    renameButton?.addEventListener('click', () => {
        const newName = window.prompt('Give a name', 'New Folder') as string;
        Explorer.renameItem(newName);
    });

    const searchbarInput = document.querySelector('#searchbar-input') as HTMLInputElement;
    searchbarInput?.addEventListener('input', () => {
        Explorer.search(searchbarInput.value.toLowerCase());
    })

    Explorer.render();
}




