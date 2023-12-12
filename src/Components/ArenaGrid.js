import { Line, Box } from '@react-three/drei';
import { ARENA_SPECS, centreCoord, centreCoords } from '../globals';
import arenaGraph from '../Classes/Arena';

const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

const CubeTypes = {
    'attackZoneArmy1': {
        color: '#ff0000',
        opacity: 0.05
    },
    'attackZoneArmy2': {
        color: '#0000ff',
        opacity: 0.05
    },
    'attackZoneShared': {
        color: '#800080',
        opacity: 0.05
    },
}

export default function ArenaGrid() {


    return (
        <>
            {arenaGraph.getEdges().map((el, index) => {
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
                            material-color={'#ff0000'}
                            material-transparent={true}
                            material-opacity={0.05}
                        />
                    </>
                )
            })}
        </>
    )
}

