"use strict";

let generateBox = document.querySelector("#generated-pass");
let copyPass = document.querySelector("#copy");
let passLengthBox = document.querySelector("#pass-length-box");
let passLengthRange = document.querySelector("#pass-length-range");
let uppercaseCheck = document.querySelector("#uppercase");
let lowercaseCheck = document.querySelector("#lowercase");
let numbersCheck = document.querySelector("#numbers");
let symbolsCheck = document.querySelector("#symbols");
let btnGenerate = document.querySelector("#generat-btn");
let passLength = passLengthBox.value;
let upperCaseChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let lowerCaseChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let numbersChar = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let symbolsChar = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", "|", "/", ":", ";", ",", ">", ".", "?"];

passLengthRange.addEventListener("input", syncPassLength);
passLengthBox.addEventListener("input", syncPassLength);
function syncPassLength(e) {
	passLengthBox.value = e.target.value;
	passLengthRange.value = e.target.value;
	passLength = passLengthBox.value;
}


let addToDom = (newPass) => {
	generateBox.innerHTML = newPass.join("");
};

let newPassGenerator = (isUpper, isLower, isNumber, isSymbol) => {
	let allValidChars = [];
	if (isUpper == true) allValidChars = allValidChars.concat(upperCaseChars);
	if (isLower == true) allValidChars = allValidChars.concat(lowerCaseChars);
	if (isNumber == true) allValidChars = allValidChars.concat(numbersChar);
	if (isSymbol == true) allValidChars = allValidChars.concat(symbolsChar);

	let generatedPass = [];
	let randIndex;
	let i = passLength;
	console.log("allValidChars:", allValidChars);

	while (i != 0) {
		randIndex = Math.floor(Math.random() * allValidChars.length);
		generatedPass = generatedPass.concat(allValidChars[randIndex]);
		console.log("randIndex:", randIndex);
		console.log("allValidChars[randIndex]:", allValidChars[randIndex]);
		console.log("generatedpass:", generatedPass);
		i--;
	}
	addToDom(generatedPass);
};

btnGenerate.addEventListener("click", () => {
	if (!uppercaseCheck.checked && !lowercaseCheck.checked && !numbersCheck.checked && !symbolsCheck.checked) {
		document.getElementById("warning").style.display = "block";
	} else {
		document.getElementById("warning").style.display = "none";
		newPassGenerator(uppercaseCheck.checked, lowercaseCheck.checked, numbersCheck.checked, symbolsCheck.checked);
	}
});

copyPass.addEventListener("click", (e) => {
	window.navigator.clipboard.writeText(generateBox.innerHTML);
	document.querySelector("#copied").style.display = "inline-block";

	setTimeout(() => {
		document.querySelector("#copied").style.display = "none";
	}, 3000);
});
