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