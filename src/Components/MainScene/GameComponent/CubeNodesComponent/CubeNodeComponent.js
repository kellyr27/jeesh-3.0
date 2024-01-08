import React from 'react';
import { useEffect } from 'react';
import { Box } from '@react-three/drei';
import { centerCoord } from '../../../../globals';

const CubeNodeComponent = ({color, opacity, isVisible, position}) => {
    
    // Update when props change
    useEffect(() => {
    }, [color, opacity, isVisible, position]);
    
    return (
        <>
            {isVisible && (
                <Box 
                    args={[1, 1, 1]}
                    position={centerCoord(position)}
                    material-color={color}
                    material-transparent={true}
                    material-opacity={opacity}
                />
            )}
        </>
    );
};

export default CubeNodeComponent;
