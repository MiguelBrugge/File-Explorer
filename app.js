import Explorer from "./Explorer.js";
window.addEventListener('load', initiate);
/**
 * Initiate the application
 */
function initiate() {
    const newFolderButton = document.querySelector('#new-folder-button');
    newFolderButton?.addEventListener('click', () => {
        Explorer.addItem('Folder');
        Explorer.render();
    });
    const deleteButton = document.querySelector('#delete');
    deleteButton?.addEventListener('click', () => {
        window.confirm('You sure you want to delete this item?') ? Explorer.removeItem() : '';
    });
    const renameButton = document.querySelector('#rename');
    renameButton?.addEventListener('click', () => {
        const newName = window.prompt('Give a name', 'New Folder');
        Explorer.renameItem(newName);
    });
    const searchbarInput = document.querySelector('#searchbar-input');
    searchbarInput?.addEventListener('input', () => {
        Explorer.search(searchbarInput.value.toLowerCase());
    });
    Explorer.render();
}
