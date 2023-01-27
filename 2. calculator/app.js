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

let calcBox = document.querySelector(".calc-box");
let clickedKey;
let numbers = [];
let operators = [];
let tempNum = "";
let answer;
function calcBoxGenerator(clickedKey) {
	if (clickedKey == "back" || clickedKey == "C" || clickedKey == "Delete" || clickedKey == "Backspace") {
		if (clickedKey == "C" || clickedKey == "Delete") {
			calcBox.innerHTML = "";
			numbers = [];
			operators = [];
			tempNum = "";
			answer = null;
		} else if (clickedKey == "back" || clickedKey == "Backspace") {
			if (!answer) {
				tempNum = tempNum.slice(0, tempNum.length - 1);
				calcBox.innerHTML = calcBox.innerHTML.slice(0, calcBox.innerHTML.length - 1);
			}
		}
	} else {
		if (clickedKey == "x" || clickedKey == "*" || clickedKey == "%" || clickedKey == "+" || clickedKey == "-" || clickedKey == "÷" || clickedKey == "/") {
			numbers.push(Number(tempNum));
			tempNum = "";
			operators.push(clickedKey);
			calcBox.insertAdjacentHTML("beforeend", clickedKey);
			if (answer) {
				calcBox.innerHTML = answer;
				calcBox.insertAdjacentHTML("beforeend", clickedKey);
				numbers = [answer];
				operators = [clickedKey];
				answer = null;
			}
		} else if (clickedKey == "=" || clickedKey == "Enter") {
			numbers.push(Number(tempNum));
			tempNum = "";
			answer = calculator(numbers, operators);
			calcBox.insertAdjacentHTML("beforeend", ` = ${answer}`);
		} else if (clickedKey >= "0" && clickedKey <= 9) {
			tempNum = tempNum.concat(clickedKey);
			if (answer) {
				calcBox.innerHTML = "";
				numbers = [];
				operators = [];
				answer = null;
			}
			calcBox.insertAdjacentHTML("beforeend", clickedKey);
		}
	}
}

function calculator(nums, oprs) {
	let i = 0;
	let op;
	let answer = nums.reduce(function (prevValue, currentValue) {
		op = oprs[i++];
		console.log("op:", op);
		if (op == "x" || op == "*") return prevValue * currentValue;
		else if (op == "%") return prevValue % currentValue;
		else if (op == "+") return prevValue + currentValue;
		else if (op == "-") return prevValue - currentValue;
		else if (op == "÷" || op == "/") return prevValue / currentValue;
		else return "none";
	});
	return answer;
}
