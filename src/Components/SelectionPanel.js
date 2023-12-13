import React, { useState } from "react";
import { Stage, Layer, Rect, Line } from "react-konva";

const Square = ({ x, y, isSelected, onSelect }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        onSelect(x, y);
    };

    return (
        <Rect
            x={x}
            y={y}
            width={150 / 3}
            height={150 / 3}
            fill={isSelected ? "blue" : isHovered ? "green" : "white"}
            stroke="black"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        />
    );
};

const Trapezoid = ({
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
        onSelect(points);
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

const SelectionPanel = () => {
    const [selectedSquare, setSelectedSquare] = useState({ x: null, y: null });

    const handleSelect = (x, y) => {
        setSelectedSquare({ x, y });
    };

    const height = 250;
    const width = 250;
    const depthTrapezoid = 50;

    const trapezoidPoints = [
        [
            0,
            0,
            width,
            0,
            width - depthTrapezoid,
            depthTrapezoid,
            depthTrapezoid,
            depthTrapezoid,
        ], // Top
        [
            width - depthTrapezoid,
            depthTrapezoid,
            width,
            0,
            width,
            height,
            width - depthTrapezoid,
            height - depthTrapezoid,
        ], // Right
        [
            0,
            0,
            depthTrapezoid,
            depthTrapezoid,
            depthTrapezoid,
            height - depthTrapezoid,
            0,
            height,
        ], // Left
        [
            depthTrapezoid,
            height - depthTrapezoid,
            width - depthTrapezoid,
            height - depthTrapezoid,
            width,
            height,
            0,
            height,
        ], // Bottom
    ];

    const [selectedTrapezoid, setSelectedTrapezoid] = useState(null);
    const [hoveredTrapezoid, setHoveredTrapezoid] = useState(null);

    const handleTrapezoidSelect = (points) => {
        setSelectedTrapezoid(points);
    };

    const handleTrapezoidHover = (points) => {
        setHoveredTrapezoid(points);
    };

    return (
        <Stage
            width={250}
            height={250}
            style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                background: "white",
            }}
        >
            <Layer>
                {trapezoidPoints.map((points, i) => (
                    <Trapezoid
                        key={i}
                        points={points}
                        fill="lightgray"
                        isHovered={hoveredTrapezoid === points}
                        isSelected={selectedTrapezoid === points}
                        onHover={handleTrapezoidHover}
                        onSelect={handleTrapezoidSelect}
                    />
                ))}
                {[...Array(3)].map((_, i) =>
                    [...Array(3)].map((_, j) => (
                        <Square
                            key={`${i}-${j}`}
                            x={50 + (i * 150) / 3}
                            y={50 + (j * 150) / 3}
                            isSelected={
                                selectedSquare.x === 50 + (i * 150) / 3 &&
                                selectedSquare.y === 50 + (j * 150) / 3
                            }
                            onSelect={handleSelect}
                        />
                    ))
                )}
            </Layer>
        </Stage>
    );
};
export default SelectionPanel;
