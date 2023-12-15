import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";

const PanelText = ({ text, fontSize, fontFamily, fill, x, y }) => {
    const textRef = useRef();

    useEffect(() => {
        if (textRef.current) {
            const textWidth = textRef.current.width();
            const textHeight = textRef.current.height();
            textRef.current.offsetX(textWidth / 2);
            textRef.current.offsetY(textHeight / 2);
        }
    }, [text]);

    return (
        <Text
            ref={textRef}
            x={x} // Half the width of the canvas
            y={y} // Half the height of the canvas
            text={text}
            fontSize={fontSize}
            fontFamily={fontFamily}
            fill={fill}
            align="center"
            listening={false}
        />
    );
};

export default PanelText