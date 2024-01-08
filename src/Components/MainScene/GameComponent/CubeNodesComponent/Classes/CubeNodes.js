import CubeNode from './CubeNode'
import { ARENA_SPECS, checkIfInArena } from '../../../../../globals'

// Creates a Key for a coordinate
const createPositionKey = (coord) => {
    const [x,y,z] = coord

    return `${x}-${y}-${z}`
}

class CubeNodes {
    constructor () {
        this.nodesMap = new Map()
        this.createNodes()
    }

    // Creates a Node for each Cube in the Arena
    createNodes () {
        for (let i = -1; i < ARENA_SPECS.ARENA_LENGTH + 1; i++) {
            for (let j = -1; j < ARENA_SPECS.ARENA_LENGTH + 1; j++) {
                for (let k = -1; k < ARENA_SPECS.ARENA_LENGTH + 1; k++) {
                    const node = new CubeNode([i,j,k])
                    this.nodesMap.set(createPositionKey([i,j,k]), node)
                }
            }
        }
    }

    getNodesArray () {
        return Array.from(this.nodesMap.values())
    }

    // Returns a list of all Nodes (Cubes) in the Arena
    getDisplayCubeNodes () {
        return this.getNodesArray().filter((node) => {
            if (checkIfInArena(node.getPosition())) {
                return true
            } else {
                return false
            }
        })
    }
}

export default CubeNodes;