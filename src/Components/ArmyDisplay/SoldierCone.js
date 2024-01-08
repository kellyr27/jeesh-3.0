import { centerCoord } from "../../globals"
import { useRef, useEffect } from "react"
import directionToRotationMap from "./Utils/directionToRotationMap"

const SoldierCone = ({initialPosition, soldierId, colorScheme, initialPose}) => {
    
    const ref = useRef()
    const {colorNormal, colorHovered, colorSelected} = colorScheme
    const {position, direction} = initialPose

    return (
        <>
            <mesh visible
                ref={ref}
                soldierId={soldierId}
                position={centerCoord(position)}
                rotation={directionToRotationMap.get(direction)}

            >
                <coneGeometry args={[0.4, 0.8, 10]}/>
                <meshBasicMaterial color={colorNormal} />
            </mesh>
            {/* <mesh visible
                position={centerCoord(position)}
                rotation={directionToRotationMap.get(direction)}
            >
                <coneGeometry args={[0.4, 0.8, 16]}/>
                <meshBasicMaterial color="#fff" wireframe/>
            </mesh> */}
        </>
    )
}

export default SoldierCone