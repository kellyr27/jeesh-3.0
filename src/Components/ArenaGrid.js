import { Line, Box } from '@react-three/drei';
import { ARENA_SPECS, centreCoord, centreCoords } from '../globals';
import arenaGraph from '../Classes/Arena';

const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

export default function ArenaGrid() {


    return (
        <>
            {/* {arenaGraph.getEdges().map((el, index) => {
                const a = randColor()

                return (
                    <>
                        <Line 
                            points={centreCoords(el.points)}
                            color={a}
                            linewidth={0.7}
                        />
                    </>
                )
            })}
            {arenaGraph.getNodesInArena().map((el, index) => {
                const a = randColor()
                console.log(el)
                return (
                    <>
                        <Box 
                            args={[ARENA_SPECS.CUBE_LENGTH, ARENA_SPECS.CUBE_LENGTH, ARENA_SPECS.CUBE_LENGTH]}
                            position={centreCoord(el.coord)}
                            material-color={a}
                            material-transparent={true}
                            material-opacity={0.05}
                        />
                    </>
                )
            })} */}
        </>
    )
}

