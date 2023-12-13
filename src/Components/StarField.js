import { centerCoord } from "../globals"
import React from "react"


export default function StarField({starCoords}) {

    return (
        <>
            {starCoords.map((coord, index) => {
                return (
                    <React.Fragment key={index}>
                        <mesh 
                            visible
                            position={centerCoord(coord)}
                        >
                            <octahedronGeometry args={[0.4]}/>
                            <meshBasicMaterial color="black"/>
                        </mesh>
                        <mesh 
                            visible
                            position={centerCoord(coord)}
                        >
                            <octahedronGeometry args={[0.4]}/>
                            <meshBasicMaterial color="blue" wireframe/>
                        </mesh>
                    </React.Fragment>
                )
            })}
        </>
    )
}