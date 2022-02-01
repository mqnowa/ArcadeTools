import {main} from './Application.js'

const inputField = document.getElementById('inputField');
const popPosX = document.getElementById('popPosX');
const popPosY = document.getElementById('popPosY');
const popPosZ = document.getElementById('popPosZ');
const bpm = document.getElementById('inputBpm');
const stayBeat = document.getElementById('stayBeat');
const button = document.getElementById('exec');
let outputField = document.getElementById('outputField');

button.addEventListener('click', () => {
    const popPos = {
        x: parseFloat(popPosX.value),
        y: parseFloat(popPosY.value),
        z: parseFloat(popPosZ.value),
    }
    outputField.value = main(
        inputField.value, 
        parseFloat(bpm.value), 
        parseFloat(stayBeat.value), 
        popPos
    );
});