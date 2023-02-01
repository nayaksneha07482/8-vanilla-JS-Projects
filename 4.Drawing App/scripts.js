"use strict";

let canvas = document.querySelector("#drawing-canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let contx = canvas.getContext("2d");
contx.lineWidth = 5;
contx.strokeStyle = "black";
let prevX = null;
let prevY = null;
let drawing = false;

window.addEventListener("mousedown", (e) => (drawing = true));
window.addEventListener("mouseup", (e) => (drawing = false));
window.addEventListener("mousemove", (e) => {
	if (prevX == null || prevY == null || !drawing) {
		prevX = e.clientX;
		prevY = e.clientY;
		return;
	}
	let mousX = e.clientX;
	let mousY = e.clientY;
	contx.beginPath();
	contx.moveTo(prevX, prevY);
	contx.lineTo(mousX, mousY);
	contx.stroke();

	prevX = e.clientX;
	prevY = e.clientY;
});

let colorBoxes = document.querySelectorAll(".colors");
colorBoxes.forEach((box) => {
	box.addEventListener("click", () => {
		contx.strokeStyle = box.style.backgroundColor;
	});
});

let clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () => {
	contx.clearRect(0, 0, canvas.width, canvas.height);
});

let saveBtn = document.querySelector(".save-btn");
saveBtn.addEventListener("click", () => {
	console.log("yooo");
	let data = canvas.toDataURL("image/png");
	let a = document.createElement("a");
	a.href = data;
	a.download = "sketch.png";
	a.click();
});

let colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("change", (e) => {
	contx.strokeStyle = e.target.value;
});
let penWidth = document.querySelector("#pen-width");
penWidth.addEventListener("change", (e) => {
	contx.lineWidth = e.target.value;
});
