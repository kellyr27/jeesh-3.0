import { centerCoord } from "../../globals"
import React from "react"

const ArenaStar = ({coord}) => {

    return (
        <React.Fragment>
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
}

export default ArenaStar