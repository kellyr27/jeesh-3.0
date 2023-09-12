import { centreCoord } from "../globals"
import { useRef } from "react"
import { arrayEquals } from "../globals"

const directionToRotation = (direction) => {
    if (arrayEquals(direction, [0,0,1])) {
        return [- Math.PI / 2, 0, 0]
    } else if (arrayEquals(direction, [0,0,-1])) {
        return [Math.PI / 2,0,0]
    } else if (arrayEquals(direction, [0,1,0])) {
        return [Math.PI,0,0]
    } else if (arrayEquals(direction, [0,-1,0])) {
        return [0,0,0]
    } else if (arrayEquals(direction, [1,0,0])) {
        return [0,0,Math.PI / 2]
    } else if (arrayEquals(direction, [-1,0,0])) {
        return [0,0,-Math.PI / 2]
    }
}

export default function SoldierCone({initialPosition, soldierId, colorScheme}) {
    
    const ref = useRef()
    const {colorNormal, colorHovered, colorSelected} = colorScheme
    const [initialCoord, initialDir] = initialPosition

    return (
        <>
            <mesh visible
                ref={ref}
                soldierId={soldierId}
                position={centreCoord(initialCoord)}
                rotation={directionToRotation(initialDir)}

            >
                <coneGeometry args={[0.4, 0.8]}/>
                <meshBasicMaterial color={colorNormal}/>
            </mesh>
            {/* <mesh visible
                position={centreCoord(initialCoord)}
                rotation={[0, 0, 0]}
            >
                <coneGeometry args={[0.4, 0.8]}/>
                <meshBasicMaterial color="#eee" wireframe/>
            </mesh> */}
        </>
    )
}