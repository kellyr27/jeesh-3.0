import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";

const Trapezoid = ({
    direction,
    points,
    fill,
    isHovered,
    isSelected,
    onHover,
    onSelect,
}) => {
    const handleMouseEnter = () => {
        onHover(points);
    };

    const handleMouseLeave = () => {
        onHover(null);
    };

    const handleClick = () => {
        onSelect(points, direction);
    };

    return (
        <Line
            points={points}
            fill={isSelected ? "blue" : isHovered ? "green" : fill}
            closed
            stroke="black"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        />
    );
};

export default Trapezoid