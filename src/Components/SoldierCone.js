import { centerCoord } from "../globals"
import { useRef } from "react"


const directionToRotation = (direction) => {
    if (direction === '+z') {
        return [- Math.PI / 2, 0, 0]
    } else if (direction === '-z') {
        return [Math.PI / 2,0,0]
    } else if (direction === '+y') {
        return [Math.PI,0,0]
    } else if (direction === '-y') {
        return [0,0,0]
    } else if (direction === '+x') {
        return [0,0,Math.PI / 2]
    } else if (direction === '-x') {
        return [0,0,-Math.PI / 2]
    }
}

export default function SoldierCone({initialPosition, soldierId, colorScheme, initialPose}) {
    
    const ref = useRef()
    const {colorNormal} = colorScheme
    const {position, direction} = initialPose

    return (
        <>
            <mesh visible
                ref={ref}
                soldierId={soldierId}
                position={centerCoord(position)}
                rotation={directionToRotation(direction)}

            >
                <coneGeometry args={[0.4, 0.8]}/>
                <meshBasicMaterial color={colorNormal}/>
            </mesh>
            {/* <mesh visible
                position={centreCoord(position)}
                rotation={[0, 0, 0]}
            >
                <coneGeometry args={[0.4, 0.8]}/>
                <meshBasicMaterial color="#eee" wireframe/>
            </mesh> */}
        </>
    )
}