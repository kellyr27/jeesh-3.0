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

class CubeNode {
    constructor(coord) {
        this.coord = coord
    }

    getCoord() {
        return this.coord
    }
}

class LineEdge {
    constructor(coord1, coord2) {
        this.createLine(coord1, coord2)
        this.priorities = [0]
    }

    createLine (coord1, coord2) {

        const [node1X, node1Y, node1Z] = coord1
        const [node2X, node2Y, node2Z] = coord2

        const avgX = (node1X + node2X) / 2
        const avgY = (node1Y + node2Y) / 2
        const avgZ = (node1Z + node2Z) / 2

        if (node1X === node2X) {
            this.points = [
                [node1X - ARENA_SPECS.CUBE_LENGTH / 2,avgY,avgZ], 
                [node1X + ARENA_SPECS.CUBE_LENGTH / 2,avgY,avgZ]
            ]
            this.color = 'white'
            this.lineWidth = 0.8
        } else if (node1Y === node2Y) {
            this.points = [
                [avgX,node1Y - ARENA_SPECS.CUBE_LENGTH / 2,avgZ],
                [avgX,node1Y + ARENA_SPECS.CUBE_LENGTH / 2,avgZ]
            ]
            this.color = 'white'
            this.lineWidth = 0.8
        } else if (node1Z === node2Z) {
            this.points= [
                [avgX,avgY,node1Z - ARENA_SPECS.CUBE_LENGTH / 2],
                [avgX,avgY,node1Z + ARENA_SPECS.CUBE_LENGTH / 2]
            ]
            this.color = 'white'
            this.lineWidth = 0.8
        }
    }
}


class ArenaGraph {
    constructor () {
        this.nodes = []
        this.createNodes()
        this.createEmptyAdjList()
        this.createEdges()
    }

    createNodes () {
        for (let i = -1; i < ARENA_SPECS.ARENA_LENGTH + 1; i++) {
            for (let j = -1; j < ARENA_SPECS.ARENA_LENGTH + 1; j++) {
                for (let k = -1; k < ARENA_SPECS.ARENA_LENGTH + 1; k++) {
                    this.nodes.push(new CubeNode([i,j,k]))
                }
            }
        }
    }

    createEmptyAdjList () {
        const numOfNodes = this.nodes.length
        this.adjList = Array(numOfNodes).fill().map(()=> {
            return []
        })
    }

    createEdges () {
        for (let i = 0; i < this.nodes.length - 1; i++) {
            for (let j = i+1; j < this.nodes.length; j++) {
                if (checkIfEdge(this.nodes[i].getCoord(), this.nodes[j].getCoord())) {
                    const edge = new LineEdge(this.nodes[i].getCoord(), this.nodes[j].getCoord())
                    this.adjList[i].push(edge)
                }
            }
        }
    }

    getEdges() {
        return this.adjList.flat()
    }

    getNodes() {
        return this.nodes
    }
}

const arenaGraph = new ArenaGraph()

export default arenaGraph