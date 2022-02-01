class Ease {
    static s(_from, _to, percent){
        percent = Math.max(0, Math.min(1, percent));
        return (_to - _from) * percent + _from;
    }
    
    static b(_from, _to, percent){
        percent = Math.max(0, Math.min(1, percent));
        let b = (1 - Math.sin((math.PI) * percent)) / 2;
        return (_to - _from) * b + _from;
    }
    
    static si(_from, _to, percent){
        percent = Math.max(0, Math.min(1, percent));
        const si = Math.sin((Math.PI / 2) * percent);
        return (_to - _from) * si + _from;
    }

    static so(_from, _to, percent){
        percent = Math.max(0, Math.min(1, percent));
        let so = 1 - Math.cos((Math.PI / 2) * percent);
        return (_to - _from) * so + _from;
    }
}

function mkBullet(arcString, bpm, stayBeat, popPos){
    
    const parsedArcString = arcString.match(/arc\((.+)\)\[(.+)\];/);
    if(parsedArcString.length === 0){
        return 'it is not a Arc\n';
    }
    let arcRaw = parsedArcString[1];
    let tapsRaw = parsedArcString[2];

    arcRaw = arcRaw.split(',')
    const arc = {
        startTime: Number(arcRaw[0]),
        endTime:   Number(arcRaw[1]),
        startPosX: Number(arcRaw[2]),
        endPosX:   Number(arcRaw[3]),
        type:      arcRaw[4],
        startPosY: Number(arcRaw[5]),
        endPosY:   Number(arcRaw[6]),
        color:     Number(arcRaw[7]),
        dummy:     arcRaw[8],
        isTrace:   (arcRaw[9].toLowerCase() == 'true')? true: false,
    }

    if(!(arc.isTrace)){
        return 'it is not a Trace\n'
    }

    tapsRaw = tapsRaw.split(',')
    const taps = tapsRaw.map((t, i, arr) => {
        return Number(t.match(/arctap\(([0-9]+)\)/)[1])
    })
    
    let x = 0, y = 0, z = 0;
    
    let outText = ''

    taps.forEach(tap => {
        const percent = (tap - arc.startTime) / (arc.endTime - arc.startTime);
        switch(arc.type) {
        case 's':
            x = Ease.s(arc.startPosX, arc.endPosX, percent);
            y = Ease.s(arc.startPosY, arc.endPosY, percent);
            break;
        case 'b':
            x = Ease.b(arc.startPosX, arc.endPosX, percent);
            y = Ease.b(arc.startPosY, arc.endPosY, percent);
            break;
        case 'si':
            x = Ease.si(arc.startPosX, arc.endPosX, percent);
            y = Ease.s(arc.startPosY, arc.endPosY, percent);
            break;
        case 'so':
            x = Ease.so(arc.startPosX, arc.endPosX, percent);
            y = Ease.s(arc.startPosY, arc.endPosY, percent);
            break;
        case 'sisi':
            x = Ease.si(arc.startPosX, arc.endPosX, percent);
            y = Ease.si(arc.startPosY, arc.endPosY, percent);
            break;
        case 'siso':
            x = Ease.si(arc.startPosX, arc.endPosX, percent);
            y = Ease.so(arc.startPosY, arc.endPosY, percent);
            break;
        case 'soso':
            x = Ease.so(arc.startPosX, arc.endPosX, percent);
            y = Ease.so(arc.startPosY, arc.endPosY, percent);
            break;
        case 'sosi':
            x = Ease.so(arc.startPosX, arc.endPosX, percent);
            y = Ease.si(arc.startPosY, arc.endPosY, percent);
            break;
        }

        const offset = {
            x: popPos.x - x,
            y: popPos.y - y,
            z: popPos.z
        }

        const popTime = 60000 * stayBeat / bpm

        outText += ('timinggroup(){\n');
        outText += (`  timing(0,${bpm.toFixed(2)},4.00);\n`);
        outText += (`  scenecontrol(0,movenotes,1,${offset["x"].toFixed(2)},${offset["y"].toFixed(2)},${offset["z"].toFixed(2)},0,0,0,0);\n`);
        outText += (`  timing(${tap - popTime-5},99999.00,4.00);\n`);
        outText += (`  timing(${tap - popTime},0.01,4.00);\n`);
        outText += (`  scenecontrol(${tap - popTime},movenotes,${popTime},0,0,0,1,1,2,0);\n`);
        outText += (`  arc(${tap},${tap+1},${x.toFixed(2)},${x.toFixed(2)},s,${y.toFixed(2)},${y.toFixed(2)},0,none,true)[arctap(${tap})];\n`);
        outText += (`  timing(${tap},${bpm.toFixed(2)},4.00);\n`);
        outText += ('};\n');
    });

    return(outText);
    console.log(outText)
}

// debug = 'arc(34500,36000,1.00,0.00,siso,1.00,0.00,0,none,true)[arctap(34500),arctap(34687),arctap(34875),arctap(35062),arctap(35250),arctap(35437),arctap(35625),arctap(35812),arctap(36000)];'
// bpm = 160
// mkBullet(debug)

export function main(input, bpm, stayBeat, popPos) {
    let outText = '';
    const arcs = input.split('\n');
    arcs.forEach(arc => {
        outText += mkBullet(arc, bpm, stayBeat, popPos);
    })

    return outText;
}