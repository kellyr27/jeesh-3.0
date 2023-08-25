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