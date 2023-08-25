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

    console.log('innerThirds',innerThirds())

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