"use strict";

let keys = document.querySelectorAll(".key");
keys.forEach((keys) => {
	keys.addEventListener("click", (e) => {
		calcBoxGenerator(e.target.innerHTML);
	});
});

window.addEventListener("keydown", (e) => {
	calcBoxGenerator(e.key);
});