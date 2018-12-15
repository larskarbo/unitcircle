import Base from './Base'

export default class SineStick extends Base {
    constructor(props) {
        super(props)
        const { ctx, r, w, h, c } = this

        this.radius = props.circleR

        const linePoints = this.getLinePoints()
        this.line = new Konva.Line({
            points: linePoints,
            stroke: 'black',
            strokeWidth: this.strokeWidth
        })

        this.startCircle = new Konva.Circle({
            x: c,
            y: c,
            radius: 4,
            fill: 'black',
            // stroke: 'black',
            // strokeWidth: this.strokeWidth
        });

        this.endCircle = this.startCircle.clone({
            x: linePoints[2],
            y: linePoints[3]
        })


        props.layer.add(this.line)
        props.layer.add(this.startCircle)
        props.layer.add(this.endCircle)
        

        // this.ctx.bind('update', function (frameCount) {
        //     // This code is called everytime two.update() is called.
        //     // Effectively 60 times per second.
        //     if (group.scale > 0.9999) {
        //         group.scale = group.rotation = 0;
        //     }
        //     var t = (1 - group.scale) * 0.125;
        //     group.scale += t;
        //     group.rotation += t * 4 * Math.PI;
        // }).play();
    }

    getLinePoints = () => {
        const { c, radius, angle } = this
        const angleReversed = -angle
        return [c, c, c + Math.cos(angleReversed) * radius, c + Math.sin(angleReversed) * radius]
    }

    updateAngle = (newAngle) => {
        this.angle = newAngle
        const linePoints = this.getLinePoints()
        this.line.attrs.points = linePoints
        this.endCircle.setX(linePoints[2])
        this.endCircle.setY(linePoints[3])
    }
};
