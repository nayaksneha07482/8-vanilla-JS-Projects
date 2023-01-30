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