class SoldierCone {
    constructor (position, direction) {
        this._position = position;
        this._targetPosition = null
        this._direction = direction;
    }

    get position() {
        return this._position;
    }

    get direction() {
        return this._direction;
    }

    set position(position) {
        this._position = position;
    }

    set direction(direction) {
        this._direction = direction;
    }
}

export default SoldierCone;