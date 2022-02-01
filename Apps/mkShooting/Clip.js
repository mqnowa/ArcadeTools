const copyButton = document.getElementById("copyButton");
const outputField = document.getElementById('outputField');
const copiedAlartCheck = document.getElementById("copiedAlertCheck");

copyButton.addEventListener('click', () => {
    if(navigator.clipboard){
        navigator.clipboard.writeText(outputField.value);
        copiedAlartCheck.checked = true
        setTimeout(() => {
            copiedAlartCheck.checked = false
        }, 3000)
    }
})