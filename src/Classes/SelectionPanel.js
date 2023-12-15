/**
 * Key: From Direction
 * Key2: To Direction
 */

// TODO : Fix as they are incorrect
const TRAPEZOID_DIRECTIONS = {
    '-y': {
        '-z': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '+z': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '-x': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '+x': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        }
    },
    '+y': {
        '+z': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '-z': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '+x': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '-x': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        }
    },
    '-z': {
        '+y': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '-y': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '+x': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '-x': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        }
    },
    '+z': {
        '-y': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '+y': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '-x': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '+x': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        }
    },
    '-x': {
        '-y': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '+y': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '-z': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '+z': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        }
    },
    '+x': {
        '+y': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '-y': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '+z': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        '-z': {
            top: '',
            right: '',
            bottom: '',
            left: ''
        }
    }
}

const getOppositeDirection = (direction) => {
    const [polarity, axis] = direction
    if (polarity === '-') {
        return `+${axis}`
    } else {
        return `-${axis}`
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
        this.resetSelectionPanel()
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

    updateDisplayDirections (top, right, bottom, left, center) {
        this.displayDirections = {
            top: top,
            right: right,
            bottom: bottom,
            left: left,
            center: center
        }
        if (this.updateCallback) {
            this.updateCallback(this.displayDirections);
        }
    }


    updateFaceAndDirections (previousFace, currentFace) {
        this.previousFace = previousFace
        this.currentFace = currentFace
        this.updateCurrentDirection()
    }

    getText () {
        return this.displayDirections
    }

    setMouseOffsets (xOffset, yOffset) {
        this.mouseXOffset = xOffset
        this.mouseYOffset = yOffset
    }

    resetSelectionPanel () {
        this.updateDisplayDirections('+y','+x','-y','-x','-z')
    }

    setSelectedSoldierIndex (index) {
        this.selectedSoldierIndex = index
        this.resetSelectionPanel()
    }

    // New set up
    updateTrapezoidDirections (direction) {
        if (direction === 'top') {
            this.updateDisplayDirections(
                getOppositeDirection(this.displayDirections.center),
                this.displayDirections.right,
                this.displayDirections.center,
                this.displayDirections.left,
                this.displayDirections.top
            )
        } else if (direction === 'right') {
            this.updateDisplayDirections(
                this.displayDirections.top,
                getOppositeDirection(this.displayDirections.center),
                this.displayDirections.bottom,
                this.displayDirections.center,
                this.displayDirections.right
            )
        } else if (direction === 'bottom') {
            this.updateDisplayDirections(
                this.displayDirections.center,
                this.displayDirections.right,
                getOppositeDirection(this.displayDirections.center),
                this.displayDirections.left,
                this.displayDirections.bottom
            )
        } else if (direction === 'left') {
            this.updateDisplayDirections(
                this.displayDirections.top,
                this.displayDirections.center,
                this.displayDirections.bottom,
                getOppositeDirection(this.displayDirections.center),
                this.displayDirections.left
            )
        }
    }
}

const selectionPanelController = new SelectionPanelController()

export default selectionPanelController