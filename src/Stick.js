import Base from './Base'
import helpers from './helpers'

export default class Stick extends Base {
    constructor(props) {
        super(props)
        const { ctx, r, w, h, cx, cy } = this

        this.radius = props.circleR
        this.from = props.from
        this.to = props.to

        const linePoints = [
            props.importantPoints[this.from][0],
            props.importantPoints[this.from][1],
            props.importantPoints[this.to][0],
            props.importantPoints[this.to][1],
        ]

        this.line = new Konva.Line({
            points: linePoints,
            stroke: props.color || 'black',
            strokeWidth: this.strokeWidth
        })
        props.layer.add(this.line)

        if (this.props.drawStart) {
            this.startCircle = new Konva.Circle({
                x: props.importantPoints[this.from][0],
                y: props.importantPoints[this.from][1],
                radius: 4,
                fill: 'black'
            });
            props.layer.add(this.startCircle)
        }

        if (this.props.drawEnd) {

            this.endCircle = this.startCircle.clone({
                x: props.importantPoints[this.to][0],
                y: props.importantPoints[this.to][1]
            })
            props.layer.add(this.endCircle)
        }

        if (this.props.text) {
            this.text = new Konva.Text({
                x: props.importantPoints[this.from][0],
                y: props.importantPoints[this.from][1],
                text: this.props.text(this.angle),
                fontSize: 20,
                align: 'right',
                verticalAlign: 'top'
            });
            props.layer.add(this.text)
        }

        this.updateAngle(props.angle, props.importantPoints)


    }


    updateAngle = (newAngle, importantPoints) => {
        this.angle = newAngle
        this.line.attrs.points = [
            importantPoints[this.from][0],
            importantPoints[this.from][1],
            importantPoints[this.to][0],
            importantPoints[this.to][1],
        ]

        if (this.props.drawStart) {
            this.startCircle.setX(importantPoints[this.from][0])
            this.startCircle.setY(importantPoints[this.from][1])
        }
        if (this.props.drawEnd) {
            this.endCircle.setX(importantPoints[this.to][0])
            this.endCircle.setY(importantPoints[this.to][1])
        }

        if (this.props.text) {
            this.text.setX(helpers.middle(importantPoints[this.from][0], importantPoints[this.to][0]) + 10)
            this.text.setY(helpers.middle(importantPoints[this.from][1], importantPoints[this.to][1]) + 10)
            this.text.text(this.props.text(this.angle))
        }
    }
};
