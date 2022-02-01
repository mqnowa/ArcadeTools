const createFlashFromTapNotes = function(tapnotesRaw, id, scArc2, scArc3) {
    // tapnotesRaw = '(12345,1);\n(67890,2);\n';
    // id = 'flash';
    // scArc2 = [375, 750, 1000, 10000];

    const tapnotes = tapnotesRaw.split('\n')

    let outText = '';
    tapnotes.forEach(t => {
        let match = t.match(/\(([0-9]+),([0-9])\);/);
        if(match){
            let duration;
            match = match.slice(1, match.length);
            switch(match[1]){
            case '1': duration = scArc2[0]; break;
            case '2': duration = scArc2[1]; break;
            case '3': duration = scArc2[2]; break;
            case '4': duration = scArc2[3]; break;
            }
            outText += `scenecontrol(${match[0]},${id},${duration},${scArc3});\n`;
        }
    });

    return(outText);
}

export {createFlashFromTapNotes};