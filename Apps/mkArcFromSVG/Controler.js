import {main} from './Application.js'

const fileInput = document.getElementById("fileInput");
const textInputTiming = document.getElementById('textInput-timing');
const textInputAccuracy = document.getElementById('textInput-accuracy');
const textInputAngle = document.getElementById('textInput-angle');
const textInputLength = document.getElementById('textInput-length');
const startX = document.getElementById('textInput-startX');
const startY = document.getElementById('textInput-startY');
const endX = document.getElementById('textInput-endX');
const endY = document.getElementById('textInput-endY');
let button = document.getElementById("exec");

let outputField = document.getElementById('outputField');

button.addEventListener('click', async () => {
    const timing = textInputTiming.value;
    const accuracy = Number(textInputAccuracy.value);
    const angleTerms = (Number(textInputAngle.value) / 360) * 2 * Math.PI;
    const lengthTerms = Number(textInputLength.value);
    const range = {
        start: {
            x: Number(startX.value),
            y: Number(startY.value),
        },
        end: {
            x: Number(endX.value),
            y: Number(endY.value),
        }
    }
    outputField.value = await main(fileInput, timing, accuracy, angleTerms, lengthTerms, range);
});