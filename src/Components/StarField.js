import { centreCoord } from "../globals"


export default function StarField({starCoords}) {

    return (
        <>
            {starCoords.map((coord) => {
                return (
                    <>
                        <mesh 
                            visible
                            position={centreCoord(coord)}
                        >
                            <octahedronGeometry args={[0.4]}/>
                            <meshBasicMaterial color="black"/>
                        </mesh>
                        <mesh 
                            visible
                            position={centreCoord(coord)}
                        >
                            <octahedronGeometry args={[0.4]}/>
                            <meshBasicMaterial color="blue" wireframe/>
                        </mesh>
                    </>
                )
            })}
        </>
    )
}