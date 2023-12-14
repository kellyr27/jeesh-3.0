// MainScene.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Stars } from "@react-three/drei";
import { TrackballControls } from "@react-three/drei";
import StarField from "./StarField";
import ArenaGrid from "./ArenaGrid";
import raycaster from "../Classes/Raycaster";
import { useControls } from "leva";
import { AxesHelper } from "three";
import AxesHelperComponent from "./AxesHelper";
import DisplayArmy from "./ArmyDisplay";

const createAxesHelper = () => {
    return new AxesHelper(20);
};

const updateAxesHelperVisibility = (axesHelper, isVisible) => {
    if (axesHelper) {
        axesHelper.visible = isVisible;
    }
};

const MainScene = () => {
    const starCoords = [
        [0, 0, 0],
        [2, 2, 2],
        [2, 3, 3],
    ];

    const axesHelper = createAxesHelper();

    // Create a Leva control for axes helper visibility
    const { showAxesHelper } = useControls({
        showAxesHelper: { value: true, label: "Show Axes Helper" },
    });

    // Update AxesHelper visibility when the Leva control changes
    updateAxesHelperVisibility(axesHelper, showAxesHelper);

    const { colorNormal, colorHovered, colorSelected } = useControls("Army 1", {
        colorNormal: "#ff0000",
        colorHovered: "#800080",
        colorSelected: "#008000",
    });
    raycaster.setColorScheme(colorNormal, colorHovered, colorSelected);

    const onContextMenuHandler = (e) => {
        raycaster.updateOnContextMenu();

        e.stopPropagation();
    };

    return (
        <Canvas onContextMenu={onContextMenuHandler} style={{ width: '100vw', height: '100vh' }}>
            <color attach="background" args={["#191920"]} />
            <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
            <TrackballControls makeDefault rotateSpeed="3" />
            {/* <axesHelper args={[20]} /> */}
            {/* <AxesHelperComponent axesHelper={axesHelper} /> */}
            <ArenaGrid />
            <StarField starCoords={starCoords} />
            <DisplayArmy colorScheme={{colorNormal, colorHovered, colorSelected}}/>
            {/* <SoldierCone initialPosition={[[5,5,10],[0,0,1]]} soldierId={[0,1]}/>
                <SoldierCone initialPosition={[[4,5,10],[0,0,1]]} soldierId={[0,2]}/> */}
            {/* <QuadraticBezierLine 
                start={[0, 0, 0]} 
                end={[10, 0, 10]} 
                mid={[5, 5, 5]}
                color="blue"
                lineWidth={2}
                /> */}
            {/*  */}
        </Canvas>
    );
};

export default MainScene;
