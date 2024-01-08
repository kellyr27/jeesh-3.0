// MainScene.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Stars } from "@react-three/drei";
import StarBackground from "./StarBackground/StarBackgroud";
import { TrackballControls } from "@react-three/drei";
import TrackballControlsComponent from "./TrackballControlsComponent/TrackballControlsComponent";
import StarField from "../StarField/StarField";
import ArenaGrid from "../ArenaGrid";
import ArenaDisplay from "../ArenaDisplay/ArenaDisplay";
import raycaster from "../../Classes/Raycaster";
import { useControls } from "leva";
import { AxesHelper } from "three";
import AxesHelperComponent from "../AxesHelper";
import ArmyDisplay from "../ArmyDisplay/ArmyDisplay";
import gameState from "../../Classes/Game/GameState";

const createAxesHelper = () => {
    return new AxesHelper(20);
};

const updateAxesHelperVisibility = (axesHelper, isVisible) => {
    if (axesHelper) {
        axesHelper.visible = isVisible;
    }
};

const MainScene = () => {

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
            <StarBackground />
            <TrackballControlsComponent />
            {/* <axesHelper args={[20]} /> */}
            {/* <AxesHelperComponent axesHelper={axesHelper} /> */}
            {/* <ArenaDisplay /> */}
            {/* <StarField starCoords={gameState.getStarPositions()} /> */}
            {/* <ArmyDisplay colorScheme={{colorNormal, colorHovered, colorSelected}}/> */}
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
