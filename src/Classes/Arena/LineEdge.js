import { ARENA_SPECS } from "../../globals"
import CubeNode from "./CubeNode"

export default class LineEdge {

    /**
     * TYPES - In order of priority
     * 0: Default
     * 1: Border Line
     * 2: Cuboid Lines
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
        if (CubeNode.isBorderEdgeBetweenNodes(this.node1, this.node2)) {
            this.types.add(1)
        }

        if (CubeNode.isCuboidEdgeBetweenNodes(this.node1, this.node2)) {
            this.types.add(2)
        }

        if (CubeNode.isDoorEdgeBetweenNodes(this.node1, this.node2)) {
            this.types.add(6)
        }
    }

    getType() {
        return Math.max(...this.types)
    }
}