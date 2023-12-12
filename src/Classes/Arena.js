import { checkIfInArena, ARENA_SPECS } from "../globals"

/**
 * Checks if an Edge exists between two coordinates
 */
const checkIfEdge = (a, b) => {
    const iDiff = Math.abs(a[0] - b[0])
    const jDiff = Math.abs(a[1] - b[1])
    const kDiff = Math.abs(a[2] - b[2])

    if (!checkIfInArena(a) && !checkIfInArena(b)) {
        return false
    }

    if ((iDiff === 1) && (jDiff === 1) && (kDiff === 0)) {
        return true
    } else if ((iDiff === 1) && (jDiff === 0) && (kDiff === 1)) {
        return true
    } else if ((iDiff === 0) && (jDiff === 1) && (kDiff === 1)) {
        return true
    } else {
        return false
    }
}

// Checks if a Coord is an Edge Border
const checkIfCoordisEdgeBorder = (coord) => {
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

// Checks if two Arrays are equal
function arraysAreEqual(array1, array2) {
    if (array1.length !== array2.length) {
      return false
    }
  
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false
      }
    }
  
    return true
  }

// Checks if a Coord is a Door
const checkIfCoordisDoor = (coord) => {
    if (arraysAreEqual(coord, [5,5,0]) || arraysAreEqual(coord, [5,5,10])) {
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

const isCoordinateOnCubeEdge = (coord, cubeCenterCoord) => {
    const iDiff = Math.abs(coord[0] - cubeCenterCoord[0])
    const jDiff = Math.abs(coord[1] - cubeCenterCoord[1])
    const kDiff = Math.abs(coord[2] - cubeCenterCoord[2])

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

const isCoordinateInsideCube = (coord, cubeCenterCoord) => {
    const iDiff = Math.abs(coord[0] - cubeCenterCoord[0])
    const jDiff = Math.abs(coord[1] - cubeCenterCoord[1])
    const kDiff = Math.abs(coord[2] - cubeCenterCoord[2])

    if ((iDiff <= 1) && (jDiff <= 1) && (kDiff <= 1)) {
        return true
    } else {
        return false
    }
}

const getMajorCubeCentres = () => {
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

const checkIfMajorLineBetweenCubes = (cubeCenterCoord1, cubeCenterCoord2) => {
    const iDiff = Math.abs(cubeCenterCoord1[0] - cubeCenterCoord2[0])
    const jDiff = Math.abs(cubeCenterCoord1[1] - cubeCenterCoord2[1])
    const kDiff = Math.abs(cubeCenterCoord1[2] - cubeCenterCoord2[2])

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

const MAJOR_CUBE_CENTRES = getMajorCubeCentres()

const checkIfCoordIsMajorGridEdge = (coord) => {
    // if (checkIfCoordIsInnerBorder(coord) && checkIfInArena(coord)) {
    //     return false
    // } else if (positionInArray(coord, MAJOR_CUBE_CENTRES)) {
    //     return false
    // } else {
    //     return true
    // }

    // //TODO: Redo
    // const minimumDistanceFromCentre = MAJOR_CUBE_CENTRES.map((centre) => {
    //     return calculateManhattanDistance(coord, centre)
    // }).reduce((a,b) => {
    //     return Math.min(a,b)
    // })

    return false
}

class CubeNode {
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
     * 3: Major Grid Edge Cubes - MAY BE REDUNDANT
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
            if (checkIfCoordisEdgeBorder(this.coord)) {
                this.setTypeEdgeBorder()
            }
        }

        if (checkIfCoordisDoor(this.coord)) {
            this.setTypeDoor()
        }

        if (checkIfCoordIsInnerBorder(this.coord)) {
            this.setTypeInnerBorder()
        }

        if (checkIfCoordIsMajorGridEdge(this.coord)) {
            this.setTypeMajor()
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

    setTypeEdgeBorder() {
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

    setTypeDoor() {
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
        // if (node1.fixedTypes.has(3) && node2.fixedTypes.has(3)) {
        //     return true
        // } else {
        //     return false
        // }

        const cubeCentre = MAJOR_CUBE_CENTRES.filter((centre) => {
            if (isCoordinateOnCubeEdge(node1.getCoord(), centre)) {
                return true
            } else {
                return false
            }
        })
        const cubeCentre2 = MAJOR_CUBE_CENTRES.filter((centre) => {
            if (isCoordinateOnCubeEdge(node2.getCoord(), centre)) {
                return true
            } else {
                return false
            }
        })

        // Lines on Inner border or further out
        if (cubeCentre.length === 0 || cubeCentre2.length === 0) {
            return false
        } else if (cubeCentre.length > 2 || cubeCentre2.length > 2) {
            console.error("ERROR: More than 2 Cube Centres")
        } else if (!checkIfMajorLineBetweenCubes(cubeCentre[0], cubeCentre2[0])) {
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

class LineEdge {


    /**
     * TYPES
     * 0: Default
     * 1: Border Line
     * 2: Major Grid Line
     * 3: Army 1 Attack Zone
     * 4: Army 2 Attack Zone
     * 5: Army 1 and 2 Attack Zone (Shared)
     * 6: Door
     * 7: Hovered
     */

    constructor(node1, node2) {
        this.node1 = node1
        this.node2 = node2
        this.createLine()
        this.priorities = new Set() // TODO: Remove once redundant
        this.types = new Set([0])
        this.setFixedTypes()
    }

    getPoints () {
        return this.points
    }

    createLine () {

        const [node1X, node1Y, node1Z] = this.node1.getCoord()
        const [node2X, node2Y, node2Z] = this.node2.getCoord()

        const avgX = (node1X + node2X) / 2
        const avgY = (node1Y + node2Y) / 2
        const avgZ = (node1Z + node2Z) / 2

        if (node1X === node2X) {
            this.points = [
                [node1X - ARENA_SPECS.CUBE_LENGTH / 2,avgY,avgZ], 
                [node1X + ARENA_SPECS.CUBE_LENGTH / 2,avgY,avgZ]
            ]
        } else if (node1Y === node2Y) {
            this.points = [
                [avgX,node1Y - ARENA_SPECS.CUBE_LENGTH / 2,avgZ],
                [avgX,node1Y + ARENA_SPECS.CUBE_LENGTH / 2,avgZ]
            ]
        } else if (node1Z === node2Z) {
            this.points= [
                [avgX,avgY,node1Z - ARENA_SPECS.CUBE_LENGTH / 2],
                [avgX,avgY,node1Z + ARENA_SPECS.CUBE_LENGTH / 2]
            ]
        }
    }

    setFixedTypes () {
        if (CubeNode.isBorderLineBetweenNodes(this.node1, this.node2)) {
            this.types.add(1)
        }

        if (CubeNode.isMajorLineBetweenNodes(this.node1, this.node2)) {
            this.types.add(2)
        }

        if (CubeNode.isDoorLineBetweenNodes(this.node1, this.node2)) {
            this.types.add(6)
        }
    }

    setPriority (num) {
        this.priorities.add(num)
    }

    removePriority (num) {
        this.priorities.delete(num)
    }

    getHighestPriority () {
        return Math.max(...this.priorities)
    }

    getType() {
        return Math.max(...this.types)
    }
}

const createCoordKey = (coord) => {
    const [x,y,z] = coord

    return `${x}-${y}-${z}`
}

class ArenaGraph {
    constructor () {
        this.nodesMap = new Map()
        this.nodes = []
        this.createNodes()
        this.createEmptyAdjList()
        this.createEdges()
    }

    // Creates a Node for each Cube in the Arena
    createNodes () {
        for (let i = -1; i < ARENA_SPECS.ARENA_LENGTH + 1; i++) {
            for (let j = -1; j < ARENA_SPECS.ARENA_LENGTH + 1; j++) {
                for (let k = -1; k < ARENA_SPECS.ARENA_LENGTH + 1; k++) {
                    const node = new CubeNode([i,j,k])
                    this.nodesMap.set(createCoordKey([i,j,k]), node)
                    this.nodes.push(node)
                }
            }
        }
    }

    // Creates an Empty Adjacency List
    createEmptyAdjList () {
        const numOfNodes = this.nodes.length
        this.adjList = Array(numOfNodes).fill().map(()=> {
            return []
        })
    }

    // Creates an Edge between two Nodes if they are adjacent, adds it to the Adjacency List
    createEdges () {
        for (let i = 0; i < this.nodes.length - 1; i++) {
            for (let j = i+1; j < this.nodes.length; j++) {
                if (checkIfEdge(this.nodes[i].getCoord(), this.nodes[j].getCoord())) {
                    const edge = new LineEdge(this.nodes[i], this.nodes[j])
                    this.adjList[i].push(edge)
                }
            }
        }
    }

    // Returns a list of Edges from the Adjacency List
    getEdges() {
        return this.adjList.flat()
    }

    // TODO
    getNodes() {
        return this.nodes
    }

    // Returns a list of all Nodes (Cubes) in the Arena
    getNodesInArena() {
        return this.nodes.filter((node) => {
            if (checkIfInArena(node.getCoord())) {
                return true
            } else {
                return false
            }
        })
    }

    removeCubeVariableTypes(coords) {
        coords.forEach((coord) => {
            const node = this.nodesMap.get(createCoordKey(coord))
            node.removeVariableTypes()
        })
    }

    setCubesAttackZoneArmy1(coords) {
        coords.forEach((coord) => {
            const node = this.nodesMap.get(createCoordKey(coord))
            node.setTypeAttackZoneArmy1()
        })
    }

    setCubesAttackZoneArmy2(coords) {
        coords.forEach((coord) => {
            const node = this.nodesMap.get(createCoordKey(coord))
            node.setTypeAttackZoneArmy2()
        })
    }

    setCubesAttackZoneShared(coords) {
        coords.forEach((coord) => {
            const node = this.nodesMap.get(createCoordKey(coord))
            node.setTypeAttackZoneShared()
        })
    }
}

const arenaGraph = new ArenaGraph()

// Testing Parameters
arenaGraph.setCubesAttackZoneArmy1([
    [4,4,0],
    [4,5,0],
    [4,6,0],
    [5,4,0],
    [5,5,0],
    [5,6,0],
    [6,4,0],
    [6,5,0],
    [6,6,0],
    [4,4,1],
    [4,5,1],
    [4,6,1],
    [5,4,1],
    [5,5,1],
    [5,6,1],
    [6,4,1],
    [6,5,1],
    [6,6,1],
    [4,4,2],
    [4,5,2],
    [4,6,2],
    [5,4,2],
    [5,5,2],
    [5,6,2],
    [6,4,2],
    [6,5,2],
    [6,6,2]
])
arenaGraph.setCubesAttackZoneArmy2([
    [4,4,2],
    [4,5,2],
    [4,6,2],
    [5,4,2],
    [5,5,2],
    [5,6,2],
    [6,4,2],
    [6,5,2],
    [6,6,2],
    [4,4,3],
    [4,5,3],
    [4,6,3],
    [5,4,3],
    [5,5,3],
    [5,6,3],
    [6,4,3],
    [6,5,3],
    [6,6,3],
    [4,4,4],
    [4,5,4],
    [4,6,4],
    [5,4,4],
    [5,5,4],
    [5,6,4],
    [6,4,4],
    [6,5,4],
    [6,6,4]
])
arenaGraph.setCubesAttackZoneShared([
    [4,4,2],
    [4,5,2],
    [4,6,2],
    [5,4,2],
    [5,5,2],
    [5,6,2],
    [6,4,2],
    [6,5,2],
    [6,6,2]
])

export default arenaGraph