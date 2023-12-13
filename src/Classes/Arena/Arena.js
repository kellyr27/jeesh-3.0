import { checkIfInArena, ARENA_SPECS} from "../../globals"
import CubeNode from "./CubeNode"
import LineEdge from "./LineEdge"
import CombinedEdge from "./CombinedEdge"

/**
 * Checks if an Edge exists between two coordinates
 */
const checkIfEdgeBetweenNodes = (a, b) => {
    const [iDiff, jDiff, kDiff] = [Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]), Math.abs(a[2] - b[2])]

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
        this.createNodes()
        this.edges = new Set()
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
                }
            }
        }
    }

    // Creates an Edge between two Nodes if they are adjacent, adds it to the Adjacency List - TODO: Fix this.nodes
    createEdges () {

        const nodes = Array.from(this.nodesMap.values());

        for (let i = 0; i < nodes.length - 1; i++) {
            for (let j = i+1; j < nodes.length; j++) {

                const node1 = nodes[i]
                const node2 = nodes[j]

                if (checkIfEdgeBetweenNodes(node1.getCoord(), node2.getCoord())) {
                    const edge = new LineEdge(node1, node2)
                    this.edges.add(edge)
                }
            }
        }
    }

    // Returns a list of Edges from the Adjacency List
    getEdges() {
        return Array.from(this.edges)
    }

    getCombinedEdges () {
        return this.combinedEdges
    }

    // TODO
    getNodes() {
        return Array.from(this.nodesMap.values())
    }

    // Returns a list of all Nodes (Cubes) in the Arena
    getNodesInArena() {
        return this.getNodes().filter((node) => {
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

    resetNodeDisplayTypes() {
        this.getNodes().forEach((node) => {
            node.resetDisplayTypes()
        })
    }

    resetEdgeDisplayTypes() {
        this.getEdges().forEach((edge) => {
            edge.resetEdgeDisplayTypes()
        })
    }


    setCubesAttackZoneArmy1(coords) {
        coords.forEach((coord) => {
            const node = this.nodesMap.get(createCoordKey(coord))
            node.setType_AttackZoneArmy1()
        })
    }

    updateVariableTypes(coordsArmy1AttackZone, coordsArmy2AttackZone, coordsSharedAttackZone) {
        this.resetNodeDisplayTypes()
        this.resetEdgeDisplayTypes()

        this.setCubesAttackZoneArmy1(coordsArmy1AttackZone)
        this.setCubesAttackZoneArmy2(coordsArmy2AttackZone)
        this.setCubesAttackZoneShared(coordsSharedAttackZone)

        this.updateLineEdgesDisplay()
    }

    setCubesAttackZoneArmy2(coords) {
        coords.forEach((coord) => {
            const node = this.nodesMap.get(createCoordKey(coord))
            node.setType_AttackZoneArmy2()
        })
    }

    setCubesAttackZoneShared(coords) {
        coords.forEach((coord) => {
            const node = this.nodesMap.get(createCoordKey(coord))
            node.setType_AttackZoneShared()
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

        for (let i = 0; i < edges.length; i++) {
            if (edges[i].checkIfEdgeIsArenaBorder()) {
                combinedEdges.push(new CombinedEdge(edges[i], null))
            }
        }
        

        return combinedEdges
    
    }
}

const arenaGraph = new ArenaGraph()

// TODO: Remove after testing
// Testing Parameters
arenaGraph.updateVariableTypes([
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
], [
    [5,5,3],
    [5,6,3],
    [5,7,3],
    [6,5,3],
    [6,6,3],
    [6,7,3],
    [7,5,3],
    [7,6,3],
    [7,7,3],
    [5,5,4],
    [5,6,4],
    [5,7,4],
    [6,5,4],
    [6,6,4],
    [6,7,4],
    [7,5,4],
    [7,6,4],
    [7,7,4],
    [9,9,9],
    [9,10,9],
    [9,10,8]

], [
    [4,4,2],
    [4,5,2],
    [4,6,2],
    [5,4,2],
    [5,5,2],
    [5,6,2],
    [6,4,2],
    [6,5,2],
    [6,6,2], 
    ])

export default arenaGraph