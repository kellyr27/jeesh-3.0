import { Line } from '@react-three/drei';
import { ARENA_SPECS } from '../globals';

const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

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

    getCoord () {
        // console.log(this.coord)
        return this.coord
    }

    static checkIfEdge(a, b) {
        const iDiff = Math.abs(a.coord[0] - b.coord[0])
        const jDiff = Math.abs(a.coord[1] - b.coord[1])
        const kDiff = Math.abs(a.coord[2] - b.coord[2])


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
}

class LineEdge {
    constructor(node1, node2) {
        this.lineObj = null
        this.createLine(node1, node2)
    }

    getLineObj () {
        return this.lineObj
    }

    createLine (node1, node2) {

        const [node1X, node1Y, node1Z] = node1.getCoord()
        const [node2X, node2Y, node2Z] = node2.getCoord()

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

        // if (node1[0] === node2[0]) {
        //     this.lineObj = (
        //         <Line
        //             points={[
        //                 [node1[0] - ARENA_SPECS.CUBE_LENGTH / 2,avgY,avgZ],
        //                 [node1[0] + ARENA_SPECS.CUBE_LENGTH / 2,avgY,avgZ]]}
        //             color='green'
        //             linewidth={0.7}
        //         />
        //     )
        // } else if (node1[1] === node2[1]) {
        //     this.lineObj = (
        //         <Line
        //             points={[
        //                 [avgX,node1[1] - ARENA_SPECS.CUBE_LENGTH / 2,avgZ],
        //                 [avgX,node1[1] + ARENA_SPECS.CUBE_LENGTH / 2,avgZ]]}
        //             color='red'
        //             linewidth={0.7}
        //         />
        //     )
        // } else if (node1[2] === node2[2]) {
        //     this.lineObj = (
        //         <Line
        //             points={[
        //                 [avgX,avgY,node1[2] - ARENA_SPECS.CUBE_LENGTH / 2],
        //                 [avgX,avgY,node1[2] + ARENA_SPECS.CUBE_LENGTH / 2]]}
        //             color='purple'
        //             linewidth={0.7}
        //         />
        //     )
        // }
        // this.lineObj = (
        //     <Line points={[[0,0,0],[1,1,1]]} color='yellow' lineWidth={0.7} />
        // )
    }
}


class ArenaGraph {
    constructor () {
        this.nodes = []
        this.createNodes()
        this.createAdjList()
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

    createAdjList () {
        const numOfNodes = this.nodes.length
        this.adjList = Array(numOfNodes).fill().map(()=> {
            return []
        })
    }

    createEdges () {
        for (let i = 0; i < this.nodes.length - 1; i++) {
            for (let j = i+1; j < this.nodes.length; j++) {
                if (CubeNode.checkIfEdge(this.nodes[i], this.nodes[j])) {
                    const edge = new LineEdge(this.nodes[i], this.nodes[j])
                    this.adjList[i].push(edge)
                }
            }
        }
    }

    getEdges() {
        // const allLines = [...new Set(this.adjList.flat())]
        return this.adjList.flat()
    }
}

export default function ArenaGrid() {

    const arena = new ArenaGraph()
    arena.getEdges()

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
            {/* {AllLines()} */}
            {/* {LineCube([0,0,0],ARENA_SPECS.ARENA_LENGTH, 'Yellow', 2)} */}
            {/* {innerThirds().map((el, index) => {
                return (
                    <>
                        {LineCube(el, 3, 'yellow', 0.4)}
                    </>
                )
            })} */}
            {arena.getEdges().map((el, index) => {
                const a = randColor()

                return (
                    <>
                        <Line 
                            points={el.points}
                            color={a}
                            linewidth={0.7}
                        />
                    </>
                )
            })}
        </>
    )
}