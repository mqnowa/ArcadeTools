import {createFlashFromTapNotes} from '../js/MakeSCfromTap.js'

console.log('MSCTController loaded!')

const inputField = document.getElementById('inputField');
const SceneControlType = document.getElementById('SceneControlType');
const scArg2 = [
    document.getElementById('scArg2_0'),
    document.getElementById('scArg2_1'),
    document.getElementById('scArg2_2'),
    document.getElementById('scArg2_3')
];
const scArg3 = document.getElementById("scArg3")
let outputField = document.getElementById('outputField');
const button = document.getElementById('exec');

button.addEventListener('click', () => {
    const input1 = inputField.value;
    const input2 = SceneControlType.value;
    const input3 = [
        scArg2[0].value,
        scArg2[1].value,
        scArg2[2].value,
        scArg2[3].value,
    ];
    const input4 = scArg3.value;
    
    const output = createFlashFromTapNotes(input1, input2, input3, input4);
    outputField.value = output;
});