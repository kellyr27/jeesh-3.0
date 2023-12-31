import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
import selectionPanelController from "../Classes/SelectionPanel";
import dispatcher from "../Classes/Dispatcher";
import Square from "./SelectionPanel/Square";
import Trapezoid from "./SelectionPanel/Trapezoid";
import PanelText from "./SelectionPanel/PanelText";

const SelectionPanel = () => {
    const [selectedSquare, setSelectedSquare] = useState({ x: null, y: null });

    const handleSelect = (x, y, xOffset, yOffset) => {
        setSelectedSquare({ x, y });
        
    };

    const height = 250;
    const width = 250;
    const depthTrapezoid = 50;

    const textPointPositions = {
        left: {
            x: depthTrapezoid/2,
            y: height/2
        },
        right: {
            x: width - depthTrapezoid/2,
            y: height/2
        },
        top: {
            x: width/2,
            y: depthTrapezoid/2
        },
        bottom: {
            x: width/2,
            y: height - depthTrapezoid/2
        },
        center: {
            x: width/2,
            y: height/2
        }
    }

    const trapezoidPoints = {
        top: [
            0,
            0,
            width,
            0,
            width - depthTrapezoid,
            depthTrapezoid,
            depthTrapezoid,
            depthTrapezoid,
        ],
        right: [
            width - depthTrapezoid,
            depthTrapezoid,
            width,
            0,
            width,
            height,
            width - depthTrapezoid,
            height - depthTrapezoid,
        ],
        bottom: [
            depthTrapezoid,
            height - depthTrapezoid,
            width - depthTrapezoid,
            height - depthTrapezoid,
            width,
            height,
            0,
            height,
        ],
        left: [
            0,
            0,
            depthTrapezoid,
            depthTrapezoid,
            depthTrapezoid,
            height - depthTrapezoid,
            0,
            height,
        ],
    };

    const [selectedTrapezoid, setSelectedTrapezoid] = useState(null);
    const [hoveredTrapezoid, setHoveredTrapezoid] = useState(null);

    const handleTrapezoidSelect = (points, direction) => {
        setSelectedTrapezoid(points);
        selectionPanelController.updateTrapezoidDirections(direction)
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
                left: 20,
                background: "white",
            }}
        >
            <Layer>
                {Object.entries(trapezoidPoints).map(([key, value], index) => (
                    <Trapezoid
                        key={index}
                        direction={key}
                        points={value}
                        fill="lightgray"
                        isHovered={JSON.stringify(hoveredTrapezoid) === JSON.stringify(value)}
                        isSelected={JSON.stringify(selectedTrapezoid) === JSON.stringify(value)}
                        onHover={handleTrapezoidHover}
                        onSelect={handleTrapezoidSelect}
                    />
                ))}
                {[...Array(3)].map((_, i) =>
                    [...Array(3)].map((_, j) => (
                        <Square
                            key={`${i}-${j}`}
                            xOffset={i-1}
                            yOffset={-(j-1)}
                            x={depthTrapezoid + (i * (width - 2*depthTrapezoid)) / 3}
                            y={depthTrapezoid + (j * (height - 2*depthTrapezoid)) / 3}
                            isSelected={
                                selectedSquare.x === 50 + (i * 150) / 3 &&
                                selectedSquare.y === 50 + (j * 150) / 3
                            }
                            onSelect={handleSelect}
                        />
                    ))
                )}
                {Object.entries(textPointPositions).map(([key, value], index) => (
                    <PanelText
                        key={index}
                        text={selectionPanelController.getText()[key]}
                        fontSize={20}
                        fontFamily="Arial"
                        fill="black"
                        x={textPointPositions[key].x}
                        y={textPointPositions[key].y}
                    />
                ))}
            </Layer>
        </Stage>
    );
};

export default SelectionPanel;
