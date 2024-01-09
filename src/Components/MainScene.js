import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import StarBackgroud from './StarBackground';
import TrackballControlsComponent from './TrackballControlsComponent';
import AxesHelperComponent from './AxesHelperComponent';
import SoldierCone from './SoldierCone.js';
import controller from '../Classes/Controller.js';
import React, { useEffect } from 'react';

function directionToRotation(direction) {
    // Create an object to represent the rotation
    const rotation = { x: 0, y: 0, z: 0 };

    // Switch based on the input direction
    switch (direction) {
        case '+x':
            break;
        case '-x':
            rotation.y = Math.PI;
            break;
        case '+y':
            rotation.x = -Math.PI / 2;
            break;
        case '-y':
            rotation.x = Math.PI / 2;
            break;
        case '+z':
            rotation.z = Math.PI / 2;
            break;
        case '-z':
            rotation.z = -Math.PI / 2;
            break;
        default:
            console.error('Invalid direction');
            return rotation; // return default rotation if direction is invalid
    }

    rotation.x += Math.PI / 2;
    
    return [
        rotation.x,
        rotation.y,
        rotation.z
    ];
}

const MainScene = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            controller.updateSoldierCones();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Canvas style={{ width: '100vw', height: '100vh' }}>
            <StarBackgroud />
            <TrackballControlsComponent />
            <AxesHelperComponent />
            {controller.getSoldierCones().map((soldier, index) => (
                <SoldierCone
                    soldierId={index}
                    key={index}
                    initialPosition={soldier.position}
                    targetPosition={[1,1,1]}
                    rotation={[0, 0, 0]}
                />
            ))}
        </Canvas>
    );
};

export default MainScene;
