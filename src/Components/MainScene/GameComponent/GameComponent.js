import React from 'react';
import CubeNodeComponent from './CubeNodesComponent/CubeNodeComponent';
import gameController from './Classes/GameController';

const GameComponent = () => {
    return (
        <>
            {gameController.getDisplayCubeNodes().map((cubeNode, index) => {
                const { color, opacity, isVisible, position} = cubeNode.getProperties()

                return (
                    <CubeNodeComponent
                        key={index}
                        position={position}
                        opacity={opacity}
                        isVisible={isVisible}
                        color={color}
                    />
                );
            })

            }
        </>
    );
};

export default GameComponent;
