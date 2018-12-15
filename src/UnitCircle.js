import Konva from 'konva'
import Circumference from './Circumference'
import Stick from './Stick'
import helpers from './helpers'
import eases from 'eases'

export default class UnitCircle {
    constructor(props) {
        const w = props.width
        const h = props.height || w / 2
        const stage = this.stage = new Konva.Stage({
            container: props.id,
            width: w,
            height: h
        });

        this.props = props

        var layer = this.layer = new Konva.Layer();
        stage.add(layer);
    

        const details = this.details = {
            layer,
            circleR: w * 0.4,
            // w,
            // h,
            cx: w / 2,
            cy: w / 2,
            strokeWidth: 2,
            angle: props.angle || Math.PI * 2,
            stroke: 'black'
        }

        if (props.onlyFirstQuadrant) {
            details.cx = 40
            details.cy = h - 40
            details.circleR = w - 40 - 12
        }


        details.importantPoints = calculateImportantPoints(details)


        const xAxis = new Konva.Line({
            points: [details.cx - details.circleR, details.cy, details.cx + details.circleR, details.cy],
            stroke: 'gray',
            strokeWidth: 1,
            dash: [4, 4],
        })
        layer.add(xAxis)

        const yAxis = xAxis.clone({
            points: [details.cx, details.cy - details.circleR, details.cx, details.cy + details.circleR]
        })
        layer.add(yAxis)

        const circ = new Circumference({
            ...details,
            angle: props.showCircle ? Math.PI * 2 -0.001 : details.angle,
        })

        const circ2 = new Circumference({
            ...details,
            strokeWidth: 1,
            stroke: 'gray',
            circleR: 30
        })

        const cos = new Stick({
            ...details,
            from: 'c',
            to: 'cosPoint',
            color: '#598786',
            text: a => Math.round(Math.cos(a) * 100) / 100
        })

        const sin = new Stick({
            ...details,
            from: 'cosPoint',
            to: 'angleCircPoint',
            color: '#ec3c1f',
            text: a => Math.round(Math.sin(a) * 100) / 100
        })

        const rs = new Stick({
            ...details,
            from: 'c',
            to: 'angleCircPoint',
            drawStart: true,
            drawEnd: true,
        })

        this.elements = []
        this.elements.push(rs)
        this.elements.push(circ2)
        this.elements.push(cos)
        this.elements.push(sin)
    
        if (props.interactive) {
            // stage.on('mousemove', this.move);
            window.addEventListener('mousemove', this.move)
        }

        layer.draw();
    }

    move = (e) => {
        // var mousePos = this.stage.getPointerPosition();
        
        const mousePos = {
            x: e.clientX - this.stage.content.getBoundingClientRect().x,
            y: e.clientY - this.stage.content.getBoundingClientRect().y,
        }
        
        // .getBoundingClientRect()
        const hypotenuse = helpers.distance(mousePos, { x: this.details.cx, y: this.details.cy })
        const adjacent = mousePos.y - this.details.cy
        let angle = Math.asin(-adjacent / hypotenuse)
        if (mousePos.x < this.details.cx) {
            angle = Math.PI - angle
        }




        // if (angle % (Math.PI / 12) < 0.035 || angle % (Math.PI / 12) > Math.PI / 12 - 0.035) {
        //     angle = Math.round(angle / (Math.PI / 12)) * (Math.PI / 12)
        // }
        this.props.onAngleChange(angle)
        this.details.angle = angle
        this.elements.forEach(el => {
            el.updateAngle(angle, calculateImportantPoints(this.details))
        })

        this.layer.draw();
    }

    animate = () => {
        const duration = 800
        var anim = new Konva.Animation( (frame) => {
            var time = frame.time,
                timeDiff = frame.timeDiff,
                frameRate = frame.frameRate;
            // update stuff
            const progress = eases.quadIn(Math.min(time / duration, 1))

            elements.forEach(e => {
                e.updateAngle(Math.PI * 2 * progress)
            })

            if (time / duration >= 1) {
                anim.stop()
            }

        }, layer);
        // anim.start();
    }
};

function calculateImportantPoints(props) {
    return {
        c: [props.cx, props.cy],
        angleCircPoint: [props.cx + Math.cos(props.angle) * props.circleR, props.cy - Math.sin(props.angle) * props.circleR],
        cosPoint: [props.cx + Math.cos(props.angle) * props.circleR, props.cy],
        sinPoint: [props.cx, props.cy - Math.sin(props.angle) * props.circleR],
    }
}
