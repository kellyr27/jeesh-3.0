// MainScene.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import StarBackgroudComponent from "./StarBackgroundComponent/StarBackgroudComponent";
import TrackballControlsComponent from "./TrackballControlsComponent/TrackballControlsComponent";
import AxesHelperComponent from "./AxesHelperComponent/AxesHelperComponent";
import GameComponent from "./GameComponent/GameComponent";

const MainScene = () => {

    return (
        <Canvas style={{ width: '100vw', height: '100vh' }}>
            <StarBackgroudComponent />
            <TrackballControlsComponent />
            <AxesHelperComponent />
            <GameComponent />
        </Canvas>
    );
};

export default MainScene;
