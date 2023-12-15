export const ARENA_SPECS = {
    ARENA_LENGTH: 11,
    CUBE_LENGTH: 1,
    MAX_NUM_STARS: 81
}

/**
 * Takes a coordinate and positions it to the centre of the Cube
 */
export function offsetCoord(coord) {
    const [x, y, z] = coord
    const offset = 0.5 * ARENA_SPECS.CUBE_LENGTH
    return [x + offset, y + offset, z + offset]
}

export function offsetCoords(coords) {
    return coords.map((coord) => {
        return offsetCoord(coord)
    })
}

export function centerCoord(coord) {
    const [x, y, z] = offsetCoord(coord)
    const centerOffset = - ARENA_SPECS.ARENA_LENGTH / 2
    return [x + centerOffset, y + centerOffset, z + centerOffset]
}

export function centerCoords (coords) {
    return coords.map((coord) => {
        return centerCoord(coord)
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

// Generates a random number in the range from min to max (inclusive)
export function generateRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
