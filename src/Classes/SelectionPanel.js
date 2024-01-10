/**
 * Key: From Direction
 * Key2: To Direction
 */

import { addCoords, poseInArray } from "../globals"

// TODO : Fix as they are incorrect
// const TRAPEZOID_DIRECTIONS = {
//     '-y': {
//         '-z': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '+z': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '-x': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '+x': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         }
//     },
//     '+y': {
//         '+z': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '-z': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '+x': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '-x': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         }
//     },
//     '-z': {
//         '+y': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '-y': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '+x': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '-x': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         }
//     },
//     '+z': {
//         '-y': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '+y': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '-x': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '+x': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         }
//     },
//     '-x': {
//         '-y': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '+y': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '-z': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '+z': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         }
//     },
//     '+x': {
//         '+y': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '-y': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '+z': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         },
//         '-z': {
//             top: '',
//             right: '',
//             bottom: '',
//             left: ''
//         }
//     }
// }

const getOppositeDirection = (direction) => {
    const [polarity, axis] = direction
    if (polarity === '-') {
        return `+${axis}`
    } else {
        return `-${axis}`
    }
}

const DIRECTIONS_OFFSETS = {
    '-x': [-1,0,0],
    '+x': [1,0,0],
    '-y': [0,-1,0],
    '+y': [0,1,0],
    '-z': [0,0,-1],
    '+z': [0,0,1]
}

const offsetAddition = (xOffset, yOffset, displayDirections) => {

    if (xOffset === -1 && yOffset === -1) {
        return addCoords(DIRECTIONS_OFFSETS[displayDirections.left], DIRECTIONS_OFFSETS[displayDirections.top], DIRECTIONS_OFFSETS[displayDirections.center])
    } else if (xOffset === 0 && yOffset === -1) {
        return addCoords(DIRECTIONS_OFFSETS[displayDirections.top], DIRECTIONS_OFFSETS[displayDirections.center])
    } else if (xOffset === 1 && yOffset === -1) {
        return addCoords(DIRECTIONS_OFFSETS[displayDirections.right], DIRECTIONS_OFFSETS[displayDirections.top], DIRECTIONS_OFFSETS[displayDirections.center])
    } else if (xOffset === -1 && yOffset === 0) {
        return addCoords(DIRECTIONS_OFFSETS[displayDirections.left], DIRECTIONS_OFFSETS[displayDirections.center])
    } else if (xOffset === 0 && yOffset === 0) {
        return addCoords(DIRECTIONS_OFFSETS[displayDirections.center])
    } else if (xOffset === 1 && yOffset === 0) {
        return addCoords(DIRECTIONS_OFFSETS[displayDirections.right], DIRECTIONS_OFFSETS[displayDirections.center])
    } else if (xOffset === -1 && yOffset === 1) {
        return addCoords(DIRECTIONS_OFFSETS[displayDirections.left], DIRECTIONS_OFFSETS[displayDirections.bottom], DIRECTIONS_OFFSETS[displayDirections.center])
    } else if (xOffset === 0 && yOffset === 1) {
        return addCoords(DIRECTIONS_OFFSETS[displayDirections.bottom], DIRECTIONS_OFFSETS[displayDirections.center])
    } else if (xOffset === 1 && yOffset === 1) {
        return addCoords(DIRECTIONS_OFFSETS[displayDirections.right], DIRECTIONS_OFFSETS[displayDirections.bottom], DIRECTIONS_OFFSETS[displayDirections.center])
    }

}

class SelectionPanelController {
    constructor () {
        this.selectedSoldierIndex = -1
        this.isHovered = false
        this.mouseXOffset = 0
        this.mouseYOffset = 0
        this.resetSelectionPanel()
        this.possibleMoves = []
        this.currentPose = null
    }

    updateDisplayDirections (top, right, bottom, left, center) {
        this.displayDirections = {
            top: top,
            right: right,
            bottom: bottom,
            left: left,
            center: center
        }
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

    checkIfSquareAvailable(xOffset, yOffset) {
        if (this.currentPose) {
            const possibleMovePose = {
                position: addCoords(offsetAddition(xOffset, yOffset, this.displayDirections), this.currentPose.position), 
                direction: this.displayDirections.center
            }
            console.log(this.possibleMoves)
            if (poseInArray(possibleMovePose, this.possibleMoves)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }


    setPossibleMoves (possibleMoves) {
        this.possibleMoves = possibleMoves
    }

    setCurrentPose (currentPose) {
        this.currentPose = currentPose
    }

    setSelectedSoldierIndex (index) {
        this.selectedSoldierIndex = index

        if (index === -1) {
            this.possibleMoves = []
            this.currentPose = null
        }
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