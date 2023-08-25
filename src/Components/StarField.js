import { OctahedronGeometry } from "three"

export default function StarField() {

    return (
        <>
            <mesh 
                visible
                position={[2,2,2]}
            >
                <octahedronGeometry args={[0.5]}/>
                <meshBasicMaterial color="black"/>
            </mesh>
        </>
    )
}