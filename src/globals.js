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
