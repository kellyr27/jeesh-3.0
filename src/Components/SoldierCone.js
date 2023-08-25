import { centreCoord } from "../globals"
import { useState, useRef, useEffect } from "react"

export default function SoldierCone({initialPosition, soldierId}) {
    
    const ref = useRef()
    const [initialCoord, initialDirection] = initialPosition
    const [isSelected, setIsSelected] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const updateColor = () => {
        if (isSelected) {
            ref.current.material.color.set('green')
        } else {
            if (isHovered) {
                ref.current.material.color.set('purple')
            } else {
                ref.current.material.color.set('red')
            }
        }
    }

    useEffect(() => {
        updateColor()
    }, [isSelected, isHovered])


    const onClickHandler = (e) => {
        setIsSelected(!isSelected)
        e.stopPropagation()
    }

    const onPointerOverHandler = (e) => {
        setIsHovered(true)
        e.stopPropagation()
    }

    const onPointerOut = (e) => {
        setIsHovered(false)
        e.stopPropagation()
    }

    const onContextMenu = (e) => {
        setIsSelected(false)
        e.stopPropagation()
    }


    return (
        <>
            <mesh visible
                ref={ref}
                soldierId={soldierId}
                position={centreCoord(initialCoord)}
                rotation={[0, 0, 0]}
                onClick={onClickHandler}
                onContextMenu={onContextMenu}
                onPointerOver={onPointerOverHandler}
                onPointerOut={onPointerOut}

            >
                <coneGeometry args={[0.4, 0.8]}/>
                <meshBasicMaterial color={'red'}/>
            </mesh>
            {/* <mesh visible
                position={centreCoord(initialCoord)}
                rotation={[0, 0, 0]}
                onClick={(e) => console.log('click')}
            >
                <coneGeometry args={[0.4, 0.8]}/>
                <meshBasicMaterial color="blue" wireframe/>
            </mesh> */}
        </>
    )
}