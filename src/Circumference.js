import Base from './Base'
import Konva from 'konva'

export default class Circumference extends Base {
    constructor(props) {
        super(props)

        const { ctx, r, w, h, cx, cy } = this


        const radius = props.circleR
        
        const s = this

        this.element = new Konva.Shape({
            sceneFunc: function (ctx, shape) {
                const { attrs } = shape
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, -attrs.angle, true);
                
                

                ctx.fillStrokeShape(shape);
            },
            // fill: '#',
            stroke: props.stroke,
            strokeWidth: this.strokeWidth,
            angle: this.angle % Math.PI *2
        });
        
        props.layer.add(this.element)

        this.init()
    }

    init = () => {
        // this.element.to({
        //     length: Math.PI * 2,
        //     duration: 1
        // })
    }
};
