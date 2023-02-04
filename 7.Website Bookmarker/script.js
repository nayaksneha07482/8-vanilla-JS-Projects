// GLOBAL VARIABLES
const urlInput = document.querySelector('.url');
const titleInput = document.querySelector('.title');
const btn = document.querySelector('.bookmark-btn');
const list = document.querySelector('.output-list');

// EVENT LISTENERS
btn.addEventListener('click', addToList);
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
list.addEventListener('click', deleteItem);
list.addEventListener('click', editItem);

// FUNCTIONS
// to add a new bookmark or edit an existing bookmark
function addToList(e) {
	e.preventDefault();
	let url = urlInput.value;
	let title = titleInput.value;
	let editedItem = document.querySelector('.marker');
	
	// for a new item
	if(!editedItem) {
		if(url != '' && title != '') {
			showListItem(url, title);
			
			saveToLocalStorage(url, title);
			urlInput.value = '';
			titleInput.value = '';
		}	
	}
	// for an edited item
	else {
		// make changes to the local storage
		let tempTitle = editedItem.firstChild.textContent;
		let storageUrls = getFromLocalStorage('url');
		let storageTitles = getFromLocalStorage('title');
		let index = storageTitles.indexOf(tempTitle);
		storageTitles[index] = title;
		storageUrls[index] = url;
		localStorage.setItem('url', JSON.stringify(storageUrls));
		localStorage.setItem('title', JSON.stringify(storageTitles));
		
		// make changes to the DOM
		editedItem.firstChild.textContent = title;
		editedItem.firstChild.setAttribute("href", url);
		
		// removing the marker class after editing
		editedItem.classList.remove('marker');
		urlInput.value = '';
		titleInput.value = '';
	}
}