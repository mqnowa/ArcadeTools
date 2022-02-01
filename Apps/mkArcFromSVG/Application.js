function createElementFromHTML(html) {
    const tempEl = document.createElement('div');
    tempEl.innerHTML = html;
    return tempEl.firstElementChild;
}

function mapping(befor0, befor1, after0, after1, value) {
    return ((value - befor0)/(befor1 - befor0)) * (after1 - after0) + after0
}

async function getSvgInfo(fileInputElement) {
    const reader = new FileReader();
    const file = fileInputElement.files[0];
    reader.readAsText(file);
    return new Promise(resolve => {
        reader.onload = (e) => {
            const svgElement = createElementFromHTML(reader.result)
            // const svgElement = document.querySelector('svg');
            const viewBoxParams = svgElement.getAttribute('viewBox').split(' ').map((param) => +param);
            resolve({
                element: svgElement,
                viewBox: {
                    x: viewBoxParams[0],
                    y: viewBoxParams[1],
                    width: viewBoxParams[2],
                    height: viewBoxParams[3]
                }
            });
        }    
    })
}

const main = async function(fileInputElement, timing, accuracy, angleTerms, lengthTerms, range) {
    // SVG情報を取得する
    const svgInfo = await getSvgInfo(fileInputElement);
    const pathElements = svgInfo.element.querySelectorAll('path');

    let outText = '';

    let ankerSets = [];

    pathElements.forEach(pathElement => {
        const maxPathLength = pathElement.getTotalLength();
        const svgClientRect = svgInfo.element.getBoundingClientRect();

        // 変数を用意

        const interval = svgInfo.viewBox.width / accuracy;
        const makeAnkerAngle = angleTerms;
        let distance = 2*interval;
        let isDAngPositiv = false;
        let cullentAnkerLength = 0;
        let sumDAng = 0;
        let endFlag = false;
        let ankerSet = [{
            x: pathElement.getPointAtLength(0).x / svgInfo.viewBox.width,
            y: pathElement.getPointAtLength(0).y / svgInfo.viewBox.height
        }];
        while(true){
            distance += interval;
            if (distance > maxPathLength) {
                endFlag = true;
                distance = maxPathLength;
            };
        
            const prevprevPt = pathElement.getPointAtLength(distance - 2 * interval);
            const prevPt = pathElement.getPointAtLength(distance - interval);
            const pt = pathElement.getPointAtLength(distance);
        
            const prevAng = Math.atan2(prevPt.y - prevprevPt.y, prevPt.x - prevprevPt.x);
            const ang = Math.atan2(pt.y - prevPt.y, pt.x - prevPt.x);
        
            let dAng = (ang - prevAng);
            dAng = (dAng > Math.PI)? dAng - 2*Math.PI: (dAng < -Math.PI)? dAng + 2*Math.PI: dAng
        
            cullentAnkerLength += interval;
            sumDAng += dAng;
        
            if(cullentAnkerLength > svgInfo.viewBox.width / lengthTerms || Math.abs(sumDAng) > makeAnkerAngle || endFlag) {
                ankerSet.push({
                    x: pt.x / svgInfo.viewBox.width,
                    y: pt.y / svgInfo.viewBox.height
                })
                cullentAnkerLength = 0;
                sumDAng = 0;
            }
        
            if(endFlag) break;
        }

        ankerSets.push(ankerSet)

        // let maxX = ankers[0].x;
        // let minX = ankers[0].x;
        // let maxY = ankers[0].y;
        // let minY = ankers[0].y;
        // ankers.forEach((anker) => {
        //     if(anker.x > maxX) maxX = anker.x;
        //     if(anker.x < minX) minX = anker.x;
        //     if(anker.y > maxY) maxY = anker.y;
        //     if(anker.y < minY) minY = anker.y;
        // })
        // ankers.forEach(anker => {
        //     anker.x = mapping(minX, maxX, range.start.x, range.end.x, anker.x);
        //     anker.y = mapping(minY, maxY, range.start.y, range.end.y, anker.y);
        // })

        // for(let i = 0; i < ankers.length - 1; i++){
        //     const T = timing;
        //     const sX = Number(ankers[i].x).toFixed(2);
        //     const eX = Number(ankers[i+1].x).toFixed(2);
        //     const type = 's';
        //     const sY = Number(1-ankers[i].y).toFixed(2);
        //     const eY = Number(1-ankers[i+1].y).toFixed(2);
        //     const col = 0
        //     const isTrace = 'true';
        //     outText += (`arc(${T},${T},${sX},${eX},${type},${sY},${eY},${col},none,${isTrace});\n`)
        // }
      
    });

    console.log(ankerSets)

    let maxX = ankerSets[0][0].x;
    let minX = ankerSets[0][0].x;
    let maxY = ankerSets[0][0].y;
    let minY = ankerSets[0][0].y;
    ankerSets.forEach((ankerSet) => {
        ankerSet.forEach(anker => {
            if(anker.x > maxX) maxX = anker.x;
            if(anker.x < minX) minX = anker.x;
            if(anker.y > maxY) maxY = anker.y;
            if(anker.y < minY) minY = anker.y;    
        });
    })


    ankerSets.forEach(ankerSet => {
        ankerSet.forEach(anker => {
            anker.x = mapping(minX, maxX, range.start.x, range.end.x, anker.x);
            anker.y = mapping(minY, maxY, range.start.y, range.end.y, anker.y);    
        });
    })

    console.log(ankerSets.length)
    ankerSets.forEach(ankerSet => {
        for(let i = 0; i < ankerSet.length - 1; i++){
            const T = timing;
            const sX = Number(ankerSet[i].x).toFixed(2);
            const eX = Number(ankerSet[i+1].x).toFixed(2);
            const type = 's';
            const sY = Number(1-ankerSet[i].y).toFixed(2);
            const eY = Number(1-ankerSet[i+1].y).toFixed(2);
            const col = 0
            const isTrace = 'true';
            outText += (`arc(${T},${T},${sX},${eX},${type},${sY},${eY},${col},none,${isTrace});\n`)
        }    
    });



    return (outText);
}

export {main};