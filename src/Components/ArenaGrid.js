import { Line } from '@react-three/drei';
import { ARENA_SPECS } from '../globals';

const getCoordsCubeOutline = (bottomCornerEdge, size) => {
    const [x, y, z] = bottomCornerEdge

    return [
        [[x,y,z],[x,y,z + size]],
        [[x,y,z],[x,y + size,z]],
        [[x,y,z],[x + size,y,z]],
        [[x + size,y + size,z + size],[x,y + size,z + size]],
        [[x + size,y + size,z + size],[x + size,y,z + size]],
        [[x + size,y + size,z + size],[x + size,y + size,z]],
        [[x + size,y + size,z],[x + size,y,z]],
        [[x + size,y + size,z],[x,y + size,z]],
        [[x,y + size,z + size],[x,y + size,z]],
        [[x,y + size,z + size],[x,y,z + size]],
        [[x + size,y,z + size],[x,y,z + size]],
        [[x + size,y,z + size],[x + size,y,z]],
    ]
}

const LineCube = (bottomCornerEdge, size, color, lineWidth) => {
    const lineCoords = getCoordsCubeOutline(bottomCornerEdge, size)

    const lines = []
    for (const lineCoord of lineCoords) {
        lines.push(
            <Line
                points={lineCoord}
                color={color}
                linewidth={lineWidth}
            />
        )
    }

    return lines
}

class CubeNode {
    constructor(coord) {
        this.coord = coord
    }
}

class LineEdge {
    constructor(node1, node2) {
        this.lineObj = null
        this.createLine(node1, node2)
    }

    createLine (node1, node2) {
        const avgX = (node1[0] + node2[0]) / 2
        const avgY = (node1[1] + node2[1]) / 2
        const avgZ = (node1[2] + node2[2]) / 2

        if (node1[0] === node2[0]) {
            this.lineObj = (
                <Line
                    points={[
                        [node1[0] - ARENA_SPECS.CUBE_LENGTH / 2,avgY,avgZ],
                        [node1[0] + ARENA_SPECS.CUBE_LENGTH / 2,avgY,avgZ]]}
                    color='green'
                    linewidth={0.7}
                />
            )
        } else if (node1[1] === node2[1]) {
            this.lineObj = (
                <Line
                    points={[
                        [avgX,node1[1] - ARENA_SPECS.CUBE_LENGTH / 2,avgZ],
                        [avgX,node1[1] + ARENA_SPECS.CUBE_LENGTH / 2,avgZ]]}
                    color='green'
                    linewidth={0.7}
                />
            )
        } else if (node1[2] === node2[2]) {
            this.lineObj = (
                <Line
                    points={[
                        [avgX,avgY,node1[2] - ARENA_SPECS.CUBE_LENGTH / 2],
                        [avgX,avgY,node1[2] + ARENA_SPECS.CUBE_LENGTH / 2]]}
                    color='green'
                    linewidth={0.7}
                />
            )
        }
    }
}


class ArenaGraph {
    constructor () {
        this.nodes = []
        this.createNodes()
    }

    createNodes () {
        for (let i = -1; i < ARENA_SPECS.ARENA_LENGTH + 1; i++) {
            const iRow = []
            for (let j = -1; j < ARENA_SPECS.ARENA_LENGTH + 1; j++) {
                const jRow = []
                for (let k = -1; k < ARENA_SPECS.ARENA_LENGTH + 1; k++) {
                    jRow.push(new CubeNode([i,j,k]))
                }
                iRow.push(jRow)
            }
            this.nodes.push(iRow)
        }
    }

    createEdges () {
        
    }
}

export default function ArenaGrid() {

    const AllLines = () => {
        let lines = []
        for (let i = 0; i <= ARENA_SPECS.ARENA_LENGTH; i++) {
            for (let j = 0; j <= ARENA_SPECS.ARENA_LENGTH; j++) {
                lines.push(
                    <Line
                        points={[[0,i,j],[ARENA_SPECS.ARENA_LENGTH,i,j]]}
                        color='yellow'
                        linewidth={0.7}
                    />
                )
                lines.push(
                    <Line
                        points={[[i,0,j],[i,ARENA_SPECS.ARENA_LENGTH,j]]}
                        color='yellow'
                        linewidth={0.7}
                    />
                )
                lines.push(
                    <Line
                        points={[[i,j,0],[i,j,ARENA_SPECS.ARENA_LENGTH]]}
                        color='yellow'
                        linewidth={0.7}
                    />
                )
            }
        }
        return lines
    }

    const innerThirds = () => {
        const coords = []

        for (let i = 1; i < ARENA_SPECS.ARENA_LENGTH - 2; i += 3) {
            for (let j = 1; j < ARENA_SPECS.ARENA_LENGTH - 2; j += 3) {
                for (let k = 1; k < ARENA_SPECS.ARENA_LENGTH - 2; k += 3) {
                    coords.push([i,j,k])
                }
            }
        }


        return coords
    }

    

    return (
        <>
            {AllLines()}
            {LineCube([0,0,0],ARENA_SPECS.ARENA_LENGTH, 'Yellow', 2)}
            {innerThirds().map((el, index) => {
                return (
                    <>
                        {LineCube(el, 3, 'yellow', 0.4)}
                    </>
                )
            })}
        </>
    )
}