"use strict";

//popup display - open close

let newNoteBtn = document.querySelector("#new-note");
let newTodoBtn = document.querySelector("#new-todo");
let popupsSection = document.querySelector("#popups");
let notePopup = document.querySelector("#newnote-popup");
let todoPopup = document.querySelector("#newtodo-popup");
let closePopupBtn = document.querySelectorAll(".close-popup-btn");

newTodoBtn.addEventListener("click", openTodoPopup);
newNoteBtn.addEventListener("click", openNotePopup);
function openTodoPopup() {
	popupsSection.style.display = "flex";
	todoPopup.style.display = "flex";
}
function openNotePopup() {
	popupsSection.style.display = "flex";
	notePopup.style.display = "flex";
}
closePopupBtn.forEach((closeBtn) => {
	closeBtn.addEventListener("click", closePopup);
});
function closePopup() {
	popupsSection.style.display = "none";
	notePopup.style.display = "none";
	todoPopup.style.display = "none";
}

//popups functions to add or remove notes or todo to DOM

let todoSubmitBtn = document.querySelector("#todo-submit");
let noteSubmitBtn = document.querySelector("#note-submit");
let newTodoTitle = document.querySelector("#newtodo-title");
let newNoteTitle = document.querySelector("#newnote-title");
let newNoteDescription = document.querySelector("#newnote-description");
let todoList = document.querySelector(".todo-list");
let noteList = document.querySelector(".note-list");
todoSubmitBtn.addEventListener("click", (event) => {
	event.preventDefault();
	todoToDom(newTodoTitle.value);
	addTodoTolocalStorage(newTodoTitle.value);
	newTodoTitle.value = "";
	closePopup();
});
noteSubmitBtn.addEventListener("click", (event) => {
	event.preventDefault();
	noteToDom(newNoteTitle.value, newNoteDescription.value);
	addNotesTolocalStorage(newNoteTitle.value, newNoteDescription.value);
	newNoteTitle.value = "";
	newNoteDescription.value = "";
	closePopup();
});
function todoToDom(title) {
	todoList.insertAdjacentHTML(
		"beforeend",
		`
    <div class="todo">
		<div class="todo-text">${title}</div>
		<div class="todo-btns">
			<button class="done-btn"><img src="images/done-icon.png" alt="done" /></button>
			<button class="delete-btn"><img src="images/trash-icon.png" alt="trash" /></button>
		</div>
	</div>
    `
	);
	addEvenForDeleteBtn();
	addEvenForSubmitBtn();
}
function noteToDom(title, description) {
	noteList.insertAdjacentHTML(
		"beforeend",
		`
    <div class="note">
        <h4 class="note-title">${title}</h4>
        <p class="note-text">${description}</p>
        <div class="note-btns">
            <button class="delete-btn"><img src="images/trash-icon.png" alt="trash" /></button>
        </div>
    </div>
    `
	);
	addEvenForDeleteBtn();
	addEvenForSubmitBtn();
}
