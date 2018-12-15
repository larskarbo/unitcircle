import Konva from 'konva'
import Circumference from './src/Circumference'
import UnitCircle from './src/UnitCircle'
import helpers from './src/helpers'
import eases from 'eases'

import katex from 'katex'


new UnitCircle({
    id: 'one',
    interactive: true,
    width: 500,
    height: 500,
    showCircle: true,
    onAngleChange: (newAngle) => {
        // console.log('newAngle: ', newAngle);
        // console.log($('eq1'))
//         const round = n => Math.round(n * 10) / 10
//         var html = katex.render(
//             String.raw`


//     sin(${round(newAngle)}) = ${round(Math.sin(newAngle))}

// `, $('#eq1'), {
//                 throwOnError: false,
//                 displayMode: true
//             });
    }
});

// katex.render(String.raw`c = \pm\sqrt{a^2 + b^2}`, $('#eq1'), {
//     throwOnError: true
// });

// katex.render("c = \\pm\\sqrt{a^2 + b^2}", $('#eq1'), {
//     throwOnError: false
// });


// new UnitCircle({
//     id: 'two',
//     onlyFirstQuadrant: true,
//     width: 200,
//     height: 200,
//     angle: Math.PI / 6,
//     showCircle: true
// });

// new UnitCircle({
//     id: 'three',
//     onlyFirstQuadrant: true,
//     width: 200,
//     height: 200,
//     angle: Math.PI / 4,
//     showCircle: true
// });

// new UnitCircle({
//     id: 'four',
//     onlyFirstQuadrant: true,
//     width: 200,
//     height: 200,
//     angle: Math.PI  / 3,
//     showCircle: true
// });
