import {cubeNodeColorScheme} from './Utils/cubeNodeColorScheme.js'
import { checkIfInArena, equalCoords, ARENA_SPECS } from '../../../../../globals.js'

// Checks if a Coord is an Outer Layer Edge
const checkIfCoordIsOuterBorderEdge = (coord) => {
    const isOutsideArenaCoord = coord.map((el) => {
        if (el < 0 || el >= ARENA_SPECS.ARENA_LENGTH) {
            return true
        } else {
            return false
        }
    })

    let trueCount = isOutsideArenaCoord.filter((el) => {
        return el === true
    })

    if (trueCount.length > 1) {
        return true
    }
    else {
        return false
    }
}

// Checks if a Coord is a Door
const checkIfCoordIsDoor = (coord) => {
    if (equalCoords(coord, [5,5,0]) || equalCoords(coord, [5,5,10])) {
        return true
    } else {
        return false
    }
}

// Check if a Coord in on the Inner Border Edge
const checkIfCoordIsInnerBorder = (coord) => {
    if (coord.includes(0) || coord.includes(ARENA_SPECS.ARENA_LENGTH - 1)) {
        return true
    } else {
        return false
    }
}

// Check if a Coord is on the Edge of a Cuboid
const isCoordinateOnCuboidEdge = (coord, cuboidCenterCoord) => {
    const iDiff = Math.abs(coord[0] - cuboidCenterCoord[0])
    const jDiff = Math.abs(coord[1] - cuboidCenterCoord[1])
    const kDiff = Math.abs(coord[2] - cuboidCenterCoord[2])

    if ((iDiff === 1) && (jDiff === 1) && ((kDiff === 0) || (kDiff === 1))) {
        return true
    } else if ((iDiff === 1) && ((jDiff === 0) || (jDiff === 1)) && (kDiff === 1)) {
        return true
    } else if (((iDiff === 0) || (iDiff === 1)) && (jDiff === 1) && (kDiff === 1)) {
        return true
    } else {
        return false
    }
}

// Check if an Cuboid Edge exists between two Coords
const checkIfEdgeBetweenCuboids = (cuboidCenterCoord1, cuboidCenterCoord2) => {
    const iDiff = Math.abs(cuboidCenterCoord1[0] - cuboidCenterCoord2[0])
    const jDiff = Math.abs(cuboidCenterCoord1[1] - cuboidCenterCoord2[1])
    const kDiff = Math.abs(cuboidCenterCoord1[2] - cuboidCenterCoord2[2])

    if ((iDiff === 3) && (jDiff === 3) && (kDiff === 0)) {
        return true
    } else if ((iDiff === 3) && (jDiff === 0) && (kDiff === 3)) {
        return true
    } else if ((iDiff === 0) && (jDiff === 3) && (kDiff === 3)) {
        return true
    } else {
        return false
    }
}

// Get all the Cuboid Center Coords (including outside the Arena)
const getCuboidCenterCoords = () => {
    const cuboidCenters = []

    for (let i = -1; i <= ARENA_SPECS.ARENA_LENGTH + 1; i += 3) {
        for (let j = -1; j <= ARENA_SPECS.ARENA_LENGTH + 1; j += 3) {
            for (let k = -1; k <= ARENA_SPECS.ARENA_LENGTH + 1; k += 3) {
                cuboidCenters.push([i,j,k])
            }
        }
    }

    return cuboidCenters
}
const MAJOR_CUBE_CENTER_COORDS = getCuboidCenterCoords()

class CubeNode {
    constructor (position) {
        this.position = position

        /**
         * FIXED TYPES - Used to get Line Types
         * 1: Outer Border Edge Cubes
         * 2: Outer Border Cubes
         * 3: Inner Border Cubes
         */
        this.fixedTypes = new Set()
        this.setFixedTypes()

        /**
         * CONSTANT DISPLAY TYPES (order of Display priority)
         * 0: Default - Not used
         * 1: Army 1 Attack Zone
         * 2: Army 2 Attack Zone
         * 3: Army 1 and 2 Attack Zone (Shared)
         * 4: Door
         * 
         * VARIABLE DISPLAY TYPE
         * 5: Hovered
         */
        this.constantDisplayType = 0
        this.isHoveredDisplay = false
        this.updateComponentProperties()
    }

    /**
     * FIXED TYPES FUNCTIONS
     */

    setFixedTypes() {
        if (!checkIfInArena(this.position)) {
            this.setType_OuterBorder()

            // Check if Edge Border
            if (checkIfCoordIsOuterBorderEdge(this.position)) {
                this.setType_OuterBorderEdge()
            }
        }

        if (checkIfCoordIsInnerBorder(this.position)) {
            this.setType_InnerBorder()
        }
    }

    /**
     * Set and remove Fixed Types
     */
    setFixedType(num) {
        this.fixedTypes.add(num)
    }

    removeFixedType(num) {
        this.fixedTypes.delete(num)
    }

    setType_OuterBorderEdge() {
        this.setFixedType(1)
    }

    removeType_OuterBorderEdge() {
        this.removeFixedType(1)
    }

    hasType_OuterBorderEdge() {
        return this.fixedTypes.has(1)
    }

    setType_OuterBorder() {
        this.setFixedType(2)
    }

    removeType_OuterBorder() {
        this.removeFixedType(2)
    }

    hasType_OuterBorder() {
        return this.fixedTypes.has(2)
    }

    setType_InnerBorder() {
        this.setFixedType(3)
    }

    removeType_InnerBorder() {
        this.removeFixedType(3)
    }

    hasType_InnerBorder() {
        return this.fixedTypes.has(3)
    }

    /**
     * TODO: Categorize rest of functions
     */
    setColorScheme (colorSchemeIndex) {
        this.color = cubeNodeColorScheme[colorSchemeIndex].color
        this.opacity = cubeNodeColorScheme[colorSchemeIndex].opacity
        this.isVisible = cubeNodeColorScheme[colorSchemeIndex].isVisible
    }

    getProperties () {
        return {
            color: this.color,
            opacity: this.opacity,
            isVisible: this.isVisible,
            position: this.position
        }
    }

    getIsHoveredDisplay () {
        return this.isHoveredDisplay
    }

    setIsHoveredDisplay (isHoveredDisplay) {
        if (this.isHoveredDisplay !== isHoveredDisplay) {
            this.isHoveredDisplay = isHoveredDisplay
            this.updateComponentProperties()
        }
    }

    updateComponentProperties () {
        this.setColorScheme(this.getCurrentDisplayType())
    }

    getCurrentDisplayType() {
        if (this.getIsHoveredDisplay()) {
            return 5
        } else {
            return this.constantDisplayType
        }
    }

    getPosition () {
        return this.position
    }

    setConstantDisplayType(constantDisplayType) {
        if (constantDisplayType > 3) {
            console.error('Error: Invalid Constant Display Type')
        }

        if (this.constantDisplayType !== constantDisplayType) {
            this.constantDisplayType = constantDisplayType
            this.updateComponentProperties()
        }
    }

    setDisplayDefault () {
        this.setConstantDisplayType(0)
    }

    setDisplayArmy1AttackZone () {
        this.setConstantDisplayType(1)
    }

    setDisplayArmy2AttackZone () {
        this.setConstantDisplayType(2)
    }

    setDisplaySharedAttackZone () {
        this.setConstantDisplayType(3)
    }

    setDisplayDoor () {
        this.setConstantDisplayType(4)
    }
}

export default CubeNode