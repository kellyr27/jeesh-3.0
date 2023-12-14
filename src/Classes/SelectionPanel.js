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
        this.updateCallback = null
    }

    // Used to update the text on the Selection Panel
    setUpdateCallback(callback) {
        this.updateCallback = callback;
    }

    // Updated when clicking on a trapezoid
    updateCurrentFace (direction) {
        this.updateFaceAndDirections(this.currentFace, this.currentDirections[direction])
    }

    // TODO: Update SelectionPanel display when this is called
    updateCurrentDirection () {
        this.currentDirections = {...TRAPEZOID_DIRECTIONS[this.previousFace][this.currentFace], 'center': this.currentFace}
        if (this.updateCallback) {
            this.updateCallback(this.currentDirections);
        }
    }

    updateFaceAndDirections (previousFace, currentFace) {
        this.previousFace = previousFace
        this.currentFace = currentFace
        this.updateCurrentDirection()
    }

    getText () {
        return this.currentDirections
    }

    setMouseOffsets (xOffset, yOffset) {
        this.mouseXOffset = xOffset
        this.mouseYOffset = yOffset
    }

    resetSelectionPanel () {
        this.updateFaceAndDirections('-y', '-z')
    }

    setSelectedSoldierIndex (index) {
        this.selectedSoldierIndex = index
        this.resetSelectionPanel()
    }
}

const selectionPanelController = new SelectionPanelController()

export default selectionPanelController