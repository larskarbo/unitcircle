
const helpers = {}

helpers.distance = function (b, a) {
    var y = a.y - b.y
    var x = a.x - b.x
    return Math.sqrt(y * y + x * x)
}

helpers.middle = function (a, b) {
    return a + (b - a) / 2
}

helpers.radToDegrees = function (a) {
    return Math.round(a / Math.PI * 180 * 10)/10
}

export default helpers