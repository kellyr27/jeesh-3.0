import { Line, Box } from '@react-three/drei';
import { ARENA_SPECS, offsetCoord, offsetCoords, centerCoord, centerCoords } from '../../globals'
import arenaGraph from '../../Classes/Arena/Arena'
import React, { useState, useEffect } from 'react'
import { useControls, folder } from 'leva'
import dispatcher from '../../Classes/Dispatcher';


const nodeDisplayScheme = {
    0: {
        name: 'default',
        color: '#ffffff',
        opacity: 0.01,
        display: false
    },
    1: {
        name: 'attackZoneArmy1',
        color: '#ff0000',
        opacity: 0.35,
        display: true
    },
    2: {
        name: 'attackZoneArmy2',
        color: '#0000ff',
        opacity: 0.35,
        display: true
    },
    3: {
        name: 'attackZoneShared',
        color: '#800080',
        opacity: 0.35,
        display: true
    },
    4: {
        name: 'door',
        color: '#ffff00',
        opacity: 0.6,
        display: true
    },
    5: {
        name: 'hovered',
        color: '#F98B88',
        opacity: 0.1,
        display: true
    },
}

console.log('nodeDisplayScheme', nodeDisplayScheme)

const DISPLAY_NODE_TO_COLOR_SCHEME = {
    0: 'default',
    1: 'attackZoneArmy1',
    2: 'attackZoneArmy2',
    3: 'attackZoneShared',
    4: 'door',
    5: 'hovered'
}

const NODE_COLOR_SCHEME = {
    'default': {
        color: '#ffffff',
        opacity: 0.01,
        display: false
    },
    'attackZoneArmy1': {
        color: '#ff0000',
        opacity: 0.35,
        display: true
    },
    'attackZoneArmy2': {
        color: '#0000ff',
        opacity: 0.35,
        display: true
    },
    'attackZoneShared': {
        color: '#800080',
        opacity: 0.35,
        display: true
    },
    'door': {
        color: '#ffff00',
        opacity: 0.6,
        display: true
    },
    'hovered': {
        color: '#F98B88',
        opacity: 0.1,
        display: true
    },
}

const DISPLAY_EDGE_TO_COLOR_SCHEME = {
    0: 'default',
    1: 'border',
    2: 'majorGrid',
    3: 'attackZoneArmy1',
    4: 'attackZoneArmy2',
    5: 'attackZoneShared',
    6: 'door',
    7: 'hovered'
}

// 
const EDGE_COLOR_SCHEME = {
    'default': {
        color: '#ff00ff',
        lineWidth: 0.2,
        display: true
    },
    'border': {
        color: '#ffffff',
        lineWidth: 2,
        display: true
    },
    'majorGrid': {
        color: '#ffffff',
        lineWidth: 4,
        display: true
    },
    'attackZoneArmy1': {
        color: '#000000',
        lineWidth: 6,
        display: true
    },
    'attackZoneArmy2': {
        color: '#000000',
        lineWidth: 6,
        display: true
    },
    'attackZoneShared': {
        color: '#000000',
        lineWidth: 6,
        display: true
    },
    'door': {
        color: '#ffff00',
        lineWidth: 2,
        display: true
    },
    'hovered': {
        color: '#F98B88',
        lineWidth: 0.1,
        display: true
    },
}

function generateControlsFromScheme(scheme, title) {
    const controls = {};
    Object.entries(scheme).forEach(([key, values]) => {
        Object.entries(values).forEach(([property, value]) => {
            controls[`${title}.${key}.${property}`] = value;
        });
    });
    return controls;
}

const CONTROL_SCHEME_TITLES = {
    NODE_COLOR_SCHEME: 'Arena - Nodes',
    EDGE_COLOR_SCHEME: 'Arena - Edges'
}

const ArenaDisplay = () => {

    // const edges = arenaGraph.getCombinedEdges()
    // const nodes = arenaGraph.getNodesInArena()

    const [nodeControls, setNodeControls] = useControls(() => (generateControlsFromScheme(NODE_COLOR_SCHEME, CONTROL_SCHEME_TITLES.NODE_COLOR_SCHEME)));
    const [edgeControls, setEdgeControls] = useControls(() => (generateControlsFromScheme(EDGE_COLOR_SCHEME, CONTROL_SCHEME_TITLES.EDGE_COLOR_SCHEME)));

    const [edges, setEdges] = useState(arenaGraph.getCombinedEdges());
    const [nodes, setNodes] = useState(arenaGraph.getNodesInArena());

    useEffect(() => {
        dispatcher.updateArenaGrid(() => {
            setEdges(arenaGraph.getCombinedEdges());
            setNodes(arenaGraph.getNodesInArena());
        });
    }, []);

    return (
        <>
            {edges.map((lineEdge, index) => {
                const displayType = lineEdge.getType()
                const colorScheme = DISPLAY_EDGE_TO_COLOR_SCHEME[displayType]

                return (
                    <React.Fragment key={index}>
                        {edgeControls[`${CONTROL_SCHEME_TITLES.EDGE_COLOR_SCHEME}.${colorScheme}.display`] && (
                            <Line
                                key={index}
                                points={centerCoords(lineEdge.getPoints())}
                                color={edgeControls[`${CONTROL_SCHEME_TITLES.EDGE_COLOR_SCHEME}.${colorScheme}.color`]}
                                linewidth={edgeControls[`${CONTROL_SCHEME_TITLES.EDGE_COLOR_SCHEME}.${colorScheme}.lineWidth`]}
                            />
                        )}
                    </React.Fragment>
                )
            })}
            {nodes.map((node, index) => {
                const displayType = node.getDisplayType()
                const colorScheme = nodeDisplayScheme[displayType]

                return (
                    <React.Fragment key={index}>
                        {colorScheme.display && (
                            <Box 
                                key={index}
                                args={[ARENA_SPECS.CUBE_LENGTH, ARENA_SPECS.CUBE_LENGTH, ARENA_SPECS.CUBE_LENGTH]}
                                position={centerCoord(node.getCoord())}
                                material-color={colorScheme.color}
                                material-transparent={true}
                                material-opacity={colorScheme.opacity}
                            />
                        )}
                    </React.Fragment>
                )
            })}
        </>
    )
}

export default ArenaDisplay