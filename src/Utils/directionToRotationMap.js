// Maps direction to rotation
const directionToRotationMap = new Map([
    ['+z', [-Math.PI / 2, 0, 0]],
    ['-z', [Math.PI / 2, 0, 0]],
    ['+y', [Math.PI, 0, 0]],
    ['-y', [0, 0, 0]],
    ['+x', [0, 0, Math.PI / 2]],
    ['-x', [0, 0, -Math.PI / 2]]
])

export default directionToRotationMap