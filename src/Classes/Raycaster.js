class UserRaycaster {
    constructor () {
        this.selectedIndex = -1
        this.hoveredIndex = -1
        this.selectedObject = null
        this.hoveredObject = null
    }

    setColorScheme(colorNormal, colorHovered, colorSelected) {
        this.colorNormal = colorNormal
        this.colorHovered = colorHovered
        this.colorSelected = colorSelected
    }

    setColorNormal(obj) {
        obj.material.color.set(this.colorNormal)
    }

    setColorSelected(obj) {
        obj.material.color.set(this.colorSelected)
    }

    setColorHovered(obj) {
        obj.material.color.set(this.colorHovered)
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

    updateOnContextMenu () {
        if (this.selectedObject) {
            if (this.selectedIndex === this.hoveredIndex) {
                this.setColorHovered(this.selectedObject)
            } else {
                this.setColorNormal(this.selectedObject)
            }
        }

        this.selectedIndex = -1
        this.selectedObject = null
    }
}

const raycaster = new UserRaycaster()

export default raycaster