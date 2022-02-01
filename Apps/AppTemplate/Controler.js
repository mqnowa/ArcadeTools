import {main} from './Application.js'

const inputField = document.getElementById('inputField');
const button = document.getElementById('exec');
let outputField = document.getElementById('outputField');

button.addEventListener('click', () => {
    outputField.value = main(inputField.value);
});