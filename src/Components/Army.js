import SoldierCone from "./SoldierCone"
import raycaster from "../Classes/Raycaster"


export default function Army({colorScheme}) {
    const startingPositions = [
        [[4,5,10],[0,0,1]],
        [[5,5,10],[0,0,-1]],
        [[6,5,10],[0,1,0]],
        [[4,6,10],[0,-1,0]],
        [[5,6,10],[-1,0,0]],
        [[6,6,10],[1,0,0]],
    ]

    const onClickHandler = (e) => {
        const soldierId = e.intersections[0].object.soldierId
        const obj = e.intersections[0].object
        
        raycaster.updateOnClick(soldierId, obj)

        e.stopPropagation()
    }

    const onPointerOverHandler = (e) => {
        const soldierId = e.intersections[0].object.soldierId
        const obj = e.intersections[0].object

        raycaster.updateOnPointerOver(soldierId, obj)

        e.stopPropagation()
    }

    const onPointerOutHandler = (e) => {

        raycaster.updateOnPointerOutHandler()

        e.stopPropagation()
    }

    


    return (
        <>
            <group
                onClick={onClickHandler}
                // onContextMenu={onContextMenuHandler}
                onPointerOver={onPointerOverHandler}
                onPointerOut={onPointerOutHandler}
            >
                {startingPositions.map((startingPosition, index) => {
                    return (
                        <>
                            <SoldierCone initialPosition={startingPosition} soldierId={index} colorScheme={colorScheme}/>
                        </>
                    )
                })}
            </group>
        </>
    )
}