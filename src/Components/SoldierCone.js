import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SoldierCone = ({ soldierId, initialPosition, targetPosition, rotation }) => {
    const meshRef = useRef();
    const curveRef = useRef();

    useEffect(() => {
        // Code to execute when the position prop changes
        console.log('Position changed:', targetPosition);

        // Update the quadratic Bezier curve with the new target position
        curveRef.current = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(initialPosition[0], initialPosition[1], initialPosition[2]),
            new THREE.Vector3(1,1,1), // TODO: Calculate the control point
            new THREE.Vector3(targetPosition[0], targetPosition[1], targetPosition[2])
        );
    }, [targetPosition])


    // Use the useFrame hook for animation
    useFrame((state, delta) => {
        // Calculate the progress of the animation
        const progress = Math.min(1, state.clock.elapsedTime / 1); // 1 second animation duration

        // Update the position along the quadratic Bezier curve
        const currentPosition = curveRef.current.getPointAt(progress);
        meshRef.current.position.copy(currentPosition);
    });

    return (
        <group ref={meshRef}>
            <mesh visible 
                soldierId={soldierId}
                position={initialPosition}
                rotation={rotation}
            >
                <coneGeometry args={[0.4, 0.8, 10]}/>
                <meshBasicMaterial color={'#ff0000'} />
            </mesh>
            <mesh visible
                position={initialPosition}
                rotation={rotation}
            >
                <coneGeometry args={[0.4, 0.8, 16]}/>
                <meshBasicMaterial color="#fff" wireframe/>
            </mesh>
        </group>
    );
};

export default SoldierCone;
