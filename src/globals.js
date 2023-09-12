export const ARENA_SPECS = {
    ARENA_LENGTH: 11,
    CUBE_LENGTH: 1
}

/**
 * Takes a coordinate and positions it to the centre of the Cube
 */
export function centreCoord(coord) {
    const [x, y, z] = coord
    const offset = 0.5 * ARENA_SPECS.CUBE_LENGTH
    return [x + offset, y + offset, z + offset]
}

export function centreCoords(coords) {
    return coords.map((coord) => {
        return centreCoord(coord)
    })
}

/**
 * Checks if a number is inbetween two values [low, high)
 */
export function isBetween(num, low, high) {
    if ((num >= low) && (num < high)) {
        return true
    } else {
        return false
    }
}

/**
 * Checks if Cube coordinate is inside the Arena
 */
export function checkIfInArena(coord) {
    for (const axes of coord) {
        if (!isBetween(axes, 0, ARENA_SPECS.ARENA_LENGTH)) {
            return false
        }
    }
    return true
}

export function arrayEquals (a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

export function equalCoords(a, b) {
    return arrayEquals(a, b)
}

export function equalPositions(a, b) {
    return arrayEquals(a, b)
}

export function positionInArray(checkPosition, positionsList) {
    for (const position of positionsList) {
        if (equalPositions(position, checkPosition)) {
            return true
        }
    }
    return false
}

export function removeDuplicatesPositions (positionsList) {
    const tempPositions = []

    for (const position of positionsList) {
        if (!positionInArray(position, tempPositions)) {
            tempPositions.push(position)
        }
    }

    return tempPositions
}

export function findIntersectionPositions(positionsList1, positionList2) {
    const tempPositions = []

    for (const position1 of positionsList1) {
        if (positionInArray(position1, positionList2)) {
            tempPositions.push(position1)
        }
    }

    return tempPositions
}