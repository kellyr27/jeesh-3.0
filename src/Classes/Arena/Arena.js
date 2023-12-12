import { checkIfInArena, ARENA_SPECS} from "../../globals"
import CubeNode from "./CubeNode"
import LineEdge from "./LineEdge"
import CombinedEdge from "./CombinedEdge"

/**
 * Checks if an Edge exists between two coordinates
 */
const checkIfEdgeBetweenNodes = (a, b) => {
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

// Creates a Key for a coordinate
const createCoordKey = (coord) => {
    const [x,y,z] = coord

    return `${x}-${y}-${z}`
}

class ArenaGraph {
    constructor () {
        this.nodesMap = new Map()
        this.nodes = []  // TODO: Remove redundant variable and use nodesMap
        this.createNodes()
        this.createEmptyAdjList()
        this.createEdges()
        this.combinedEdges = this.createCombinedEdges()
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
        const numOfNodes = this.nodesMap.size
        this.adjList = Array(numOfNodes).fill().map(()=> {
            return []
        })
    }

    // Creates an Edge between two Nodes if they are adjacent, adds it to the Adjacency List
    createEdges () {
        for (let i = 0; i < this.nodes.length - 1; i++) {
            for (let j = i+1; j < this.nodes.length; j++) {
                if (checkIfEdgeBetweenNodes(this.nodes[i].getCoord(), this.nodes[j].getCoord())) {
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

    getCombinedEdges () {
        return this.combinedEdges
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

    updateLineEdgesDisplay () {
        this.getEdges().forEach((edge) => {
            edge.setDisplayTypes()
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
            node.setType_AttackZoneArmy1()
            this.updateLineEdgesDisplay()
        })
    }

    setCubesAttackZoneArmy2(coords) {
        coords.forEach((coord) => {
            const node = this.nodesMap.get(createCoordKey(coord))
            node.setType_AttackZoneArmy2()
            this.updateLineEdgesDisplay()
        })
    }

    setCubesAttackZoneShared(coords) {
        coords.forEach((coord) => {
            const node = this.nodesMap.get(createCoordKey(coord))
            node.setType_AttackZoneShared()
            this.updateLineEdgesDisplay()
        })
    }

    createCombinedEdges () {
        const edges = this.getEdges()
        const combinedEdges = []

        for (let i = 0; i < edges.length - 1; i++) {
            for (let j = i+1; j < edges.length; j++) {
                if (LineEdge.sharedEdge(edges[i], edges[j])) {
                    combinedEdges.push(new CombinedEdge(edges[i], edges[j]))
                    break
                }
            }
        }
        

        return combinedEdges
    
    }
}

const arenaGraph = new ArenaGraph()

// TODO: Remove after testing
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