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

//set local storage for storing data so it will not deleted if we refresh the page
//structures

let todos = [];
let notes = [];

window.addEventListener("load", localstorageToDom);
function localstorageToDom() {
	if (!localStorage.getItem("todos")) localStorage.setItem("todos", JSON.stringify(todos));
	if (!localStorage.getItem("notes")) localStorage.setItem("notes", JSON.stringify(notes));

	todos = JSON.parse(localStorage.getItem("todos"));
	notes = JSON.parse(localStorage.getItem("notes"));

	todos.forEach((todo) => {
		todoToDom(todo.title);
	});
	notes.forEach((note) => {
		noteToDom(note.title, note.description);
	});
	console.log("loaded");
}
function addTodoTolocalStorage(todoTitle) {
	todos.push({ title: todoTitle, done: false });
	localStorage.setItem("todos", JSON.stringify(todos));
	console.log("addTodoTolocalStorage");
}
function addNotesTolocalStorage(noteTitle, noteDescription) {
	notes.push({ title: noteTitle, description: noteDescription });
	localStorage.setItem("notes", JSON.stringify(notes));
	console.log("addNotesTolocalStorage");
}

//todo and note buttons functionality
function addEvenForDeleteBtn() {
	let deleteBtn = document.querySelectorAll(".delete-btn");
	deleteBtn.forEach((btn) => {
		btn.addEventListener("click", deleteCard);
	});
}
addEvenForDeleteBtn();

function deleteCard() {
	this.parentElement.parentElement.remove();
	if (this.parentElement.parentElement.querySelector(".todo-text")) {
		let tempTodos = JSON.parse(localStorage.getItem("todos"));
		let todoTitle = this.parentElement.parentElement.querySelector(".todo-text").innerHTML;
		todos = tempTodos.filter((todo) => {
			return todo.title != todoTitle;
		});
		localStorage.setItem("todos", JSON.stringify(todos));
	} else {
		let tempNote = JSON.parse(localStorage.getItem("notes"));
		let noteTitle = this.parentElement.parentElement.querySelector(".note-title").innerHTML;
		notes = tempNote.filter((note) => {
			return note.title != noteTitle;
		});
		localStorage.setItem("notes", JSON.stringify(notes));
	}
}

function addEvenForSubmitBtn() {
	let submitBtn = document.querySelectorAll(".done-btn");
	submitBtn.forEach((btn) => {
		btn.addEventListener("click", completedCard);
	});
}
addEvenForSubmitBtn();

function completedCard() {
	let completedTodo = this.parentElement.parentElement;
	let completedTodoTitle = this.parentElement.parentElement.querySelector(".todo-text").innerHTML;
	todos = JSON.parse(localStorage.getItem("todos"));

	todos.forEach((todo) => {
		if (todo.title == completedTodoTitle) {
			if (todo.done == false) {
				todo.done = true;
				completedTodo.style.backgroundColor = "#4ea347";
				completedTodo.style.color = "white";
				localStorage.setItem("todos", JSON.stringify(todos));
			} else {
				todo.done = false;
				completedTodo.style.backgroundColor = "white";
				completedTodo.style.color = "rgb(65, 65, 65)";
				localStorage.setItem("todos", JSON.stringify(todos));
			}
		}
	});
}
