import { Line, Box } from '@react-three/drei';
import { ARENA_SPECS, centreCoord, centreCoords } from '../globals';
import arenaGraph from '../Classes/Arena';

const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

const DISPLAY_TYPE_TO_COLOR_SCHEME = {
    0: 'default',
    1: 'attackZoneArmy1',
    2: 'attackZoneArmy2',
    3: 'attackZoneShared',
    4: 'door',
    5: 'hovered'
}

const CUBE_COLOR_SCHEME = {
    'default': {
        color: '#ffffff',
        opacity: 0.01
    },
    'attackZoneArmy1': {
        color: '#ff0000',
        opacity: 0.35
    },
    'attackZoneArmy2': {
        color: '#0000ff',
        opacity: 0.35
    },
    'attackZoneShared': {
        color: '#800080',
        opacity: 0.35
    },
    'door': {
        color: '#ffff00',
        opacity: 0.6
    },
    'hovered': {
        color: '#F98B88',
        opacity: 0.1
    },
}

const DISPLAY_LINE_TO_COLOR_SCHEME = {
    0: 'default',
    1: 'border',
    2: 'majorGrid',
    3: 'attackZoneArmy1',
    4: 'attackZoneArmy2',
    5: 'attackZoneShared',
    6: 'door',
    7: 'hovered'
}

const LINE_COLOR_SCHEME = {
    'default': {
        color: '#ff00ff',
        lineWidth: 0.3
    },
    'border': {
        color: '#ffffff',
        lineWidth: 2
    },
    'majorGrid': {
        color: '#ffffff',
        lineWidth: 4
    },
    'attackZoneArmy1': {
        color: '#ff0000',
        lineWidth: 0.35
    },
    'attackZoneArmy2': {
        color: '#0000ff',
        lineWidth: 0.35
    },
    'attackZoneShared': {
        color: '#800080',
        lineWidth: 0.35
    },
    'door': {
        color: '#ffff00',
        lineWidth: 2
    },
    'hovered': {
        color: '#F98B88',
        lineWidth: 0.1
    },
}

export default function ArenaGrid() {


    return (
        <>
            {arenaGraph.getEdges().map((lineEdge, index) => {
                const displayType = lineEdge.getType()
                const colorScheme = DISPLAY_LINE_TO_COLOR_SCHEME[displayType]
                return (
                    <>
                        <Line 
                            points={centreCoords(lineEdge.getPoints())}
                            color={LINE_COLOR_SCHEME[colorScheme]['color']}
                            linewidth={LINE_COLOR_SCHEME[colorScheme]['lineWidth']}
                        />
                    </>
                )
            })}
            {arenaGraph.getNodesInArena().map((node, index) => {
                const displayType = node.getDisplayType()
                const colorScheme = DISPLAY_TYPE_TO_COLOR_SCHEME[displayType]
                return (
                    <>
                        <Box 
                            args={[ARENA_SPECS.CUBE_LENGTH, ARENA_SPECS.CUBE_LENGTH, ARENA_SPECS.CUBE_LENGTH]}
                            position={centreCoord(node.coord)}
                            material-color={CUBE_COLOR_SCHEME[colorScheme]['color']}
                            material-transparent={true}
                            material-opacity={CUBE_COLOR_SCHEME[colorScheme]['opacity']}
                        />
                    </>
                )
            })}
        </>
    )
}

