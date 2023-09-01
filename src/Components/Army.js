import SoldierCone from "./SoldierCone"

class UserRaycaster {
    constructor () {
        this.selectedIndex = -1
        this.hoveredIndex = -1
        this.selectedObject = null
        this.hoveredObject = null
    }

    setColorNormal(obj) {
        obj.material.color.set('red')
    }

    setColorSelected(obj) {
        obj.material.color.set('green')
    }

    setColorHovered(obj) {
        obj.material.color.set('purple')
    }

    updateOnClick (newIndex, newObject) {
        if (this.selectedIndex === newIndex) {
            this.selectedIndex = -1
            this.selectedObject = null
            this.setColorNormal(newObject)
            return
        }

        if (this.selectedObject) {
            this.setColorNormal(this.selectedObject)
        }

        this.selectedIndex = newIndex
        this.selectedObject = newObject

        this.setColorSelected(this.selectedObject)
    }

    updateOnPointerOver (newIndex, newObject) {
        if (this.selectedIndex === newIndex) {
            this.hoveredIndex = newIndex
            this.hoveredObject = newObject
            return
        }


        if (this.hoveredIndex === newIndex) {
            return
        }

        if ((this.hoveredObject) && (newIndex !== this.selectedIndex)) {
            this.setColorNormal(this.hoveredObject)
        }

        this.hoveredIndex = newIndex
        this.hoveredObject = newObject
        this.setColorHovered(this.hoveredObject)
    }

    updateOnPointerOutHandler () {
        if ((this.hoveredObject) && (this.hoveredIndex !== this.selectedIndex)) {
            this.setColorNormal(this.hoveredObject)
        }

        this.hoveredIndex = -1
        this.hoveredObject = null
    }

}


export default function Army() {
    const startingPositions = [
        [[4,5,10],[0,0,1]],
        [[5,5,10],[0,0,1]],
        [[6,5,10],[0,0,1]],
        [[4,6,10],[0,0,1]],
        [[5,6,10],[0,0,1]],
        [[6,6,10],[0,0,1]],
        [[4,5,9],[0,0,1]],
        [[5,5,9],[0,0,1]],
        [[6,5,9],[0,0,1]],
        [[4,6,9],[0,0,1]],
        [[5,6,9],[0,0,1]],
        [[6,6,9],[0,0,1]],
    ]

    const raycaster = new UserRaycaster()

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

    const onContextMenuHandler = (e) => {

        e.stopPropagation()
    }


    return (
        <>
            <group
                onClick={onClickHandler}
                onContextMenu={onContextMenuHandler}
                onPointerOver={onPointerOverHandler}
                onPointerOut={onPointerOutHandler}
            >
                {startingPositions.map((startingPosition, index) => {
                    return (
                        <>
                            <SoldierCone initialPosition={startingPosition} soldierId={index}/>
                        </>
                    )
                })}
            </group>
        </>
    )
}