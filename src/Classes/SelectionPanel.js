/**
 * Key: From Direction
 * Key2: To Direction
 */

// TODO : Fix as they are incorrect
const TRAPEZOID_DIRECTIONS = {
    '-y': {
        '-z': {
            top: '+y',
            right: '+x',
            bottom: '-y',
            left: '-x'
        },
        '+z': {
            top: '+y',
            right: '-x',
            bottom: '-y',
            left: '+x'
        },
        '-x': {
            top: '+y',
            right: '-z',
            bottom: '-y',
            left: '+z'
        },
        '+x': {
            top: '+y',
            right: '+z',
            bottom: '-y',
            left: '-z'
        }
    },
    '+y': {
        '+z': {
            top: '-y',
            right: '+x',
            bottom: '+y',
            left: '-x'
        },
        '-z': {
            top: '-y',
            right: '-x',
            bottom: '+y',
            left: '+x'
        },
        '+x': {
            top: '-y',
            right: '-z',
            bottom: '+y',
            left: '+z'
        },
        '-x': {
            top: '-y',
            right: '+z',
            bottom: '+y',
            left: '-z'
        }
    },
    '-z': {
        '+y': {
            top: '+z',
            right: '+x',
            bottom: '-z',
            left: '-x'
        },
        '-y': {
            top: '+z',
            right: '-x',
            bottom: '-z',
            left: '+x'
        },
        '+x': {
            top: '+z',
            right: '-y',
            bottom: '-z',
            left: '+y'
        },
        '-x': {
            top: '+z',
            right: '+y',
            bottom: '-z',
            left: '-y'
        }
    },
    '+z': {
        '-y': {
            top: '-z',
            right: '+x',
            bottom: '+z',
            left: '-x'
        },
        '+y': {
            top: '-z',
            right: '-x',
            bottom: '+z',
            left: '+x'
        },
        '-x': {
            top: '-z',
            right: '-y',
            bottom: '+z',
            left: '+y'
        },
        '+x': {
            top: '-z',
            right: '+y',
            bottom: '+z',
            left: '-y'
        }
    },
    '-x': {
        '-y': {
            top: '+x',
            right: '+z',
            bottom: '-x',
            left: '-z'
        },
        '+y': {
            top: '+x',
            right: '-z',
            bottom: '-x',
            left: '+z'
        },
        '-z': {
            top: '+x',
            right: '-y',
            bottom: '-x',
            left: '+y'
        },
        '+z': {
            top: '+x',
            right: '+y',
            bottom: '-x',
            left: '-y'
        }
    },
    '+x': {
        '+y': {
            top: '-x',
            right: '+z',
            bottom: '+x',
            left: '-z'
        },
        '-y': {
            top: '-x',
            right: '-z',
            bottom: '+x',
            left: '+z'
        },
        '+z': {
            top: '-x',
            right: '-y',
            bottom: '+x',
            left: '+y'
        },
        '-z': {
            top: '-x',
            right: '+y',
            bottom: '+x',
            left: '-y'
        }
    }
}

class SelectionPanelController {
    constructor () {
        this.selectedSoldierIndex = -1
        this.previousFace = '-y'
        this.currentFace = '-z'
        this.isHovered = false
        this.mouseXOffset = 0
        this.mouseYOffset = 0
        this.updateCurrentDirection()
    }

    // Updated when clicking on a trapezoid
    updateCurrentFace (direction) {
        this.previousFace = this.currentFace
        this.currentFace = this.currentDirections[direction]
        this.updateCurrentDirection()
    }

    updateCurrentDirection () {
        this.currentDirections = {...TRAPEZOID_DIRECTIONS[this.previousFace][this.currentFace], 'center': this.currentFace}
    }

    getText () {
        return this.currentDirections
    }

    setMouseOffsets (xOffset, yOffset) {
        this.mouseXOffset = xOffset
        this.mouseYOffset = yOffset
    }
}

const selectionPanelController = new SelectionPanelController()

export default selectionPanelController