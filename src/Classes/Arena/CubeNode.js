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

export default class CubeNode {
    /**
     * DISPLAY TYPES (order of Display priority)
     * 0: Default - Not used
     * 1: Army 1 Attack Zone
     * 2: Army 2 Attack Zone
     * 3: Army 1 and 2 Attack Zone (Shared)
     * 4: Door
     * 5: Hovered
     * 
     * FIXED TYPES - Used to get Line Types
     * 1: Outer Border Edge Cubes
     * 2: Outer Border Cubes
     * 3: Inner Border Cubes
     */

    constructor(coord) {
        this.coord = coord
        this.displayTypes = new Set([0])
        this.fixedTypes = new Set()
        this.setFixedTypes()
    }

    // Checks if the Coord is a Door and sets the Display Type
    setDoorType() {
        if (checkIfCoordIsDoor(this.coord)) {
            this.setType_Door()
        }
    }

    setFixedTypes() {
        if (!checkIfInArena(this.coord)) {
            this.setType_OuterBorder()

            // Check if Edge Border
            if (checkIfCoordIsOuterBorderEdge(this.coord)) {
                this.setType_OuterBorderEdge()
            }
        }

        this.setDoorType(this.coord)

        if (checkIfCoordIsInnerBorder(this.coord)) {
            this.setType_InnerBorder()
        }
    }

    hasDisplayType() {
        return this.displayTypes.size > 1
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

    /**
     * Set and remove Fixed Types
     */
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
     * Set and remove Display Types
     */
    setType_AttackZoneArmy1() {
        this.setDisplayType(1)
    }

    removeType_AttackZoneArmy1() {
        this.removeDisplayType(1)
    }

    hasType_AttackZoneArmy1() {
        return this.displayTypes.has(1)
    }

    setType_AttackZoneArmy2() {
        this.setDisplayType(2)
    }

    removeType_AttackZoneArmy2() {
        this.removeDisplayType(2)
    }

    hasType_AttackZoneArmy2() {
        return this.displayTypes.has(2)
    }

    setType_AttackZoneShared() {
        this.setDisplayType(3)
    }

    removeType_AttackZoneShared() {
        this.removeDisplayType(3)
    }

    hasType_AttackZoneShared() {
        return this.displayTypes.has(3)
    }

    setType_Door() {
        this.setDisplayType(4)
    }

    removeType_Door() {
        this.removeDisplayType(4)
    }

    hasType_Door() {
        return this.displayTypes.has(4)
    }

    setType_Hovered() {
        this.setDisplayType(5)
    }

    removeType_Hovered() {
        this.removeDisplayType(5)
    }

    resetDisplayTypes() {
        this.displayTypes.clear()
        this.displayTypes.add(0)
        this.setDoorType()      
    }

    getDisplayType() {
        return Math.max(...this.displayTypes)
    }

    hasType_AnyAttackZone() {
        return this.hasType_AttackZoneArmy1() || this.hasType_AttackZoneArmy2() || this.hasType_AttackZoneShared()
    }

    // A Border Line is between a Edge Border Cube and a Non Border Cube
    static isBorderEdgeBetweenNodes(node1, node2) {
        if (node1.hasType_OuterBorderEdge() && !node2.hasType_OuterBorder()) {
            return true
        } else if (!node1.hasType_OuterBorder() && node2.hasType_OuterBorderEdge()) {
            return true
        } else {
            return false
        }
    }

    // A Cuboid Line is between two Cuboid Edge Cubes
    static isCuboidEdgeBetweenNodes(node1, node2) {

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

        if (cubeCenter1.length === 0 || cubeCenter2.length === 0) {
            return false
        } else if (cubeCenter1.length > 2 || cubeCenter2.length > 2) {
            console.error("ERROR: More than 2 Cube Centres")
        } else if (!checkIfEdgeBetweenCuboids(cubeCenter1[0], cubeCenter2[0])) {
            return false
        } else if (node1.hasType_InnerBorder() && node2.hasType_InnerBorder()) {
            return false
        } else {
            return true
        }
    }

    // A Door Line is connected to a Door coordinate
    static isDoorEdgeBetweenNodes(node1, node2) {
        if (node1.hasType_Door() || node2.hasType_Door()) {
            return true
        } else {
            return false
        }
    }

    static isArmy1AttackZoneEdgeBetweenNodes(node1, node2) {
        if (node1.hasType_AttackZoneArmy1() && !node2.hasDisplayType()) {
            return true
        } else if (!node1.hasDisplayType() && node2.hasType_AttackZoneArmy1()) {
            return true
        } else {
            return false
        }
    }

    static isArmy2AttackZoneEdgeBetweenNodes(node1, node2) {
        if (node1.hasType_AttackZoneArmy2() && !node2.hasDisplayType()) {
            return true
        } else if (!node1.hasDisplayType() && node2.hasType_AttackZoneArmy2()) {
            return true
        } else {
            return false
        }
    }

    static isArmySharedAttackZoneEdgeBetweenNodes(node1, node2) {
        if (node1.hasType_AttackZoneShared() && !node2.hasDisplayType()) {
            return true
        } else if (!node1.hasDisplayType() && node2.hasType_AttackZoneShared()) {
            return true
        } else {
            return false
        }
    }

    static isHoveredEdgeBetweenNodes(node1, node2) {
        if (node1.hasType_Hovered() || node2.hasType_Hovered()) {
            return true
        } else {
            return false
        }
    }

}