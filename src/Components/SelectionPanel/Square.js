import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
import selectionPanelController from "../../Classes/SelectionPanel";

const Square = ({ x, y, isSelected, onSelect, xOffset, yOffset}) => {
    const [isHovered, setIsHovered] = useState(false);
    

    const handleMouseEnter = () => {
        setIsHovered(true);
        selectionPanelController.setMouseOffsets(xOffset, yOffset)
    };

    const handleMouseLeave = () => {
        setIsHovered(false);

    };

    const handleClick = () => {
        onSelect(x, y, xOffset, yOffset);
    };

    return (
        <Rect
            x={x}
            y={y}
            width={150 / 3}
            height={150 / 3}
            // fill={isSelected ? "blue" : isHovered ? "green" : "white"}
            fill={
                isSelected 
                    ? "blue" 
                    : isHovered 
                        ? "green" 
                        : selectionPanelController.checkIfSquareAvailable(xOffset, yOffset) 
                            ? "white" 
                            : "red" // replace "red" with the color you want when the square is not available
            }
            stroke="black"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        />
    );
};

export default Square