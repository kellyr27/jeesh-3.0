import React from 'react';
import { useEffect } from 'react';
import { Line } from '@react-three/drei';

const CubeEdgeComponent = ({color, lineWidth, isVisible, points}) => {
    
    // Update when props change
    useEffect(() => {
    }, [color, lineWidth, isVisible, points]);
    
    return (
        <>
            {isVisible && (
                <Line
                    points={points}
                    color={color}
                    linewidth={lineWidth}
                />
            )}
        </>
    );
};

export default CubeEdgeComponent;
