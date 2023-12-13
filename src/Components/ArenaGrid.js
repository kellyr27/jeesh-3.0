import { Line, Box } from '@react-three/drei';
import { ARENA_SPECS, centreCoord, centreCoords } from '../globals'
import arenaGraph from '../Classes/Arena/Arena'
import React, { useState } from 'react'
import { useControls, folder } from 'leva'

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
        lineWidth: 2,
        display: false
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
    CUBE_COLOR_SCHEME: 'Arena - Nodes',
    LINE_COLOR_SCHEME: 'Arena - Edges'
}

export default function ArenaGrid() {

    const edges = arenaGraph.getCombinedEdges()
    const nodes = arenaGraph.getNodesInArena()

    const [nodeControls, setNodeControls] = useControls(() => (generateControlsFromScheme(CUBE_COLOR_SCHEME, CONTROL_SCHEME_TITLES.CUBE_COLOR_SCHEME)));
    const [edgeControls, setEdgeControls] = useControls(() => (generateControlsFromScheme(LINE_COLOR_SCHEME, CONTROL_SCHEME_TITLES.LINE_COLOR_SCHEME)));


    return (
        <>
            {edges.map((lineEdge, index) => {
                const displayType = lineEdge.getType()
                const colorScheme = DISPLAY_LINE_TO_COLOR_SCHEME[displayType]

                return (
                    <React.Fragment key={index}>
                        {edgeControls[`${CONTROL_SCHEME_TITLES.LINE_COLOR_SCHEME}.${colorScheme}.display`] && (
                            <Line
                                key={index}
                                points={centreCoords(lineEdge.getPoints())}
                                color={edgeControls[`${CONTROL_SCHEME_TITLES.LINE_COLOR_SCHEME}.${colorScheme}.color`]}
                                linewidth={edgeControls[`${CONTROL_SCHEME_TITLES.LINE_COLOR_SCHEME}.${colorScheme}.lineWidth`]}
                            />
                        )}
                    </React.Fragment>
                )
            })}
            {nodes.map((node, index) => {
                const displayType = node.getDisplayType()
                const colorScheme = DISPLAY_TYPE_TO_COLOR_SCHEME[displayType]

                return (
                    <React.Fragment key={index}>
                        {nodeControls[`${CONTROL_SCHEME_TITLES.CUBE_COLOR_SCHEME}.${colorScheme}.display`] && (
                            <Box 
                                key={index}
                                args={[ARENA_SPECS.CUBE_LENGTH, ARENA_SPECS.CUBE_LENGTH, ARENA_SPECS.CUBE_LENGTH]}
                                position={centreCoord(node.getCoord())}
                                material-color={nodeControls[`${CONTROL_SCHEME_TITLES.CUBE_COLOR_SCHEME}.${colorScheme}.color`]}
                                material-transparent={true}
                                material-opacity={nodeControls[`${CONTROL_SCHEME_TITLES.CUBE_COLOR_SCHEME}.${colorScheme}.opacity`]}
                            />
                        )}
                    </React.Fragment>
                )
            })}
        </>
    )
}

