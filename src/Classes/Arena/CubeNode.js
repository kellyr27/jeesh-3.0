import { checkIfInArena, ARENA_SPECS, equalCoords } from "../../globals"

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


const getCuboidCenterCoords = () => {
    const majorCubeCentres = []

    for (let i = -1; i <= ARENA_SPECS.ARENA_LENGTH + 1; i += 3) {
        for (let j = -1; j <= ARENA_SPECS.ARENA_LENGTH + 1; j += 3) {
            for (let k = -1; k <= ARENA_SPECS.ARENA_LENGTH + 1; k += 3) {
                majorCubeCentres.push([i,j,k])
            }
        }
    }

    return majorCubeCentres
}
const MAJOR_CUBE_CENTER_COORDS = getCuboidCenterCoords()

export default class CubeNode {
    /**
     * DISPLAY TYPES (order of Display priority)
     * 0: Default
     * 1: Army 1 Attack Zone
     * 2: Army 2 Attack Zone
     * 3: Army 1 and 2 Attack Zone (Shared)
     * 4: Door
     * 5: Hovered
     * 
     * FIXED TYPES - Used to get Line Types
     * 1: Edge Border Cubes
     * 2: Border Cube
     * 3: Major Grid Edge Cubes - TODO: REDUNDANT
     * 4: Inner Border Cubes
     */

    constructor(coord) {
        this.coord = coord
        this.displayTypes = new Set([0])
        this.fixedTypes = new Set()
        this.setFixedTypes()
    }

    setFixedTypes() {
        if (!checkIfInArena(this.coord)) {
            this.setTypeBorder()

            // Check if Edge Border
            if (checkIfCoordIsOuterBorderEdge(this.coord)) {
                this.setType_OuterBorderEdge()
            }
        }

        if (checkIfCoordIsDoor(this.coord)) {
            this.setType_Door()
        }

        if (checkIfCoordIsInnerBorder(this.coord)) {
            this.setTypeInnerBorder()
        }
    }

    getCoord() {
        return this.coord
    }

    setFixedType(num) {
        this.fixedTypes.add(num)
    }

    setDisplayType(num) {
        this.displayTypes.add(num)
    }

    removeFixedType(num) {
        this.fixedTypes.delete(num)
    }

    removeDisplayType(num) {
        this.displayTypes.delete(num)
    }

    setType_OuterBorderEdge() {
        this.setFixedType(1)
    }

    removeTypeEdgeBorder() {
        this.removeFixedType(1)
    }

    setTypeBorder() {
        this.setFixedType(2)
    }

    removeTypeBorder() {
        this.removeFixedType(2)
    }

    setTypeMajor() {
        this.setFixedType(3)
    }

    removeTypeMajor() {
        this.removeFixedType(3)
    }

    setTypeInnerBorder() {
        this.setFixedType(4)
    }

    isInnerBorder() {
        return this.fixedTypes.has(4)
    }

    removeTypeInnerBorder() {
        this.removeFixedType(4)
    }

    setTypeAttackZoneArmy1() {
        this.setDisplayType(1)
    }

    removeTypeAttackZoneArmy1() {
        this.removeDisplayType(1)
    }

    setTypeAttackZoneArmy2() {
        this.setDisplayType(2)
    }

    removeTypeAttackZoneArmy2() {
        this.removeDisplayType(2)
    }

    setTypeAttackZoneShared() {
        this.setDisplayType(3)
    }

    removeTypeAttackZoneShared() {
        this.removeDisplayType(3)
    }

    setType_Door() {
        this.setDisplayType(4)
    }

    removeTypeDoor() {
        this.removeDisplayType(4)
    }

    setTypeHovered() {
        this.setDisplayType(5)
    }

    removeTypeHovered() {
        this.removeDisplayType(5)
    }

    resetDisplayTypes() {
        this.displayTypes.clear()
        this.displayTypes.add(0)      
    }

    getDisplayType() {
        return Math.max(...this.displayTypes)
    }

    // A Border Line is between a Edge Border Cube and a Non Border Cube
    static isBorderLineBetweenNodes(node1, node2) {
        if (node1.fixedTypes.has(1) && !node2.fixedTypes.has(2)) {
            return true
        } else if (!node1.fixedTypes.has(2) && node2.fixedTypes.has(1)) {
            return true
        } else {
            return false
        }
    }

    // TODO: Implement Major Lines
    static isMajorLineBetweenNodes(node1, node2) {

        const cubeCenter1 = MAJOR_CUBE_CENTER_COORDS.filter((center) => {
            if (isCoordinateOnCuboidEdge(node1.getCoord(), center)) {
                return true
            } else {
                return false
            }
        })
        const cubeCenter2 = MAJOR_CUBE_CENTER_COORDS.filter((center) => {
            if (isCoordinateOnCuboidEdge(node2.getCoord(), center)) {
                return true
            } else {
                return false
            }
        })

        // Lines on Inner border or further out
        if (cubeCenter1.length === 0 || cubeCenter2.length === 0) {
            return false
        } else if (cubeCenter1.length > 2 || cubeCenter2.length > 2) {
            console.error("ERROR: More than 2 Cube Centres")
        } else if (!checkIfEdgeBetweenCuboids(cubeCenter1[0], cubeCenter2[0])) {
            return false
        } else if (node1.isInnerBorder() && node2.isInnerBorder()) {
            return false  
        } else {
            return true
        }
    }

    // Check whether the Line Surrounds a Door
    static isDoorLineBetweenNodes(node1, node2) {
        if (node1.displayTypes.has(4) || node2.displayTypes.has(4)) {
            return true
        } else {
            return false
        }
    }
}