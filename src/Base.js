export default class Base {
    constructor(props) {
        // // this.ctx = props.ctx
        this.props = props

        this.angle = props.angle

        this.w = props.w
        this.h = props.h
        this.cx = props.cx
        this.cy = props.cy

        this.strokeWidth = props.strokeWidth
    }

    r = (ratio) => {
        // distance
        // 100 gives total width
        return this.ctx.w * ratio / 100
    }

    updateAngle(angle) {
        this.element.attrs.angle = angle
        this.angle = angle
    }
};
