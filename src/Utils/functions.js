import { ARENA_LENGTH, ATTACK_RANGE } from "./constants.js";

// Add coordinates together
export function addCoords(...coords) {
    return coords.reduce((total, coord) => {
        const [x, y, z] = coord;
        total[0] += x;
        total[1] += y;
        total[2] += z;
        return total;
    }, [0, 0, 0]);
}

// Checks if a coordinate is in the arena
export function checkIfCoordInArena(coord) {
    for (const axes of coord) {
        if ((axes < 0) || (axes >= ARENA_LENGTH)) {
            return false
        }
    }
    return true
}

function arrayEquals (a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

// Compare two coordinates
export function equalCoords(a, b) {
    return arrayEquals(a, b)
}

// Checks if coordinates are in an array of coorindates
export function coordInArray(selectedCoord, coordsArr) {
    for (const coord of coordsArr) {
        if (equalCoords(coord, selectedCoord)) {
            return true
        }
    }
    return false
}

// Generate random coordinate in the arena
export function generateRandomCoord() {
    return [
        Math.floor(Math.random() * ARENA_LENGTH),
        Math.floor(Math.random() * ARENA_LENGTH),
        Math.floor(Math.random() * ARENA_LENGTH)
    ]
}

// Generate random direction
export function generateRandomDirection() {
    const directions = ['+x', '-x', '+y', '-y', '+z', '-z']
    return directions[Math.floor(Math.random() * directions.length)]
}

// Get the attack zone of a soldier
export const getSoldierAttackZone = (position, direction) => {
    let attackZonePositions = []


    const minOffset = -Math.floor(ATTACK_RANGE / 2)
    const maxOffset = Math.ceil(ATTACK_RANGE / 2)
    for (let i = minOffset; i < maxOffset; i++) {
        for (let j = minOffset; j < maxOffset; j++) {
            for (let k = minOffset; k < maxOffset; k++) {

                attackZonePositions.push([
                    position[0] + i,
                    position[1] + j,
                    position[2] + k
                ])
            }
        }
    }

    // Now Offset in the direction of the soldier
    if (direction === '+x') {
        attackZonePositions = attackZonePositions.forEach((position) => {
            position[0] += maxOffset
        })
    } else if (direction === '-x') {
        attackZonePositions = attackZonePositions.forEach((position) => {
            position[0] -= maxOffset
        })
    } else if (direction === '+y') {
        attackZonePositions = attackZonePositions.forEach((position) => {
            position[1] += maxOffset
        })
    } else if (direction === '-y') {
        attackZonePositions = attackZonePositions.forEach((position) => {
            position[1] -= maxOffset
        })
    } else if (direction === '+z') {
        attackZonePositions = attackZonePositions.forEach((position) => {
            position[2] += maxOffset
        })
    } else if (direction === '-z') {
        attackZonePositions = attackZonePositions.forEach((position) => {
            position[2] -= maxOffset
        })
    }

    // Filter out positions that are inside the arena
    attackZonePositions = attackZonePositions.filter((position) => {
        return checkIfCoordInArena(position)
    })

    return attackZonePositions
}

// 
export const separatePositions = (...positionArrays) => {
    const positionCounts = new Map();

    for (const positions of positionArrays) {
        for (const position of positions) {
            const key = JSON.stringify(position);
            positionCounts.set(key, (positionCounts.get(key) || 0) + 1);
        }
    }

    const singleOccurrencePositions = [];
    const multipleOccurrencePositions = [];

    for (const [key, count] of positionCounts) {
        const position = JSON.parse(key);
        if (count === 1) {
            singleOccurrencePositions.push(position);
        } else {
            multipleOccurrencePositions.push(position);
        }
    }

    return [singleOccurrencePositions, multipleOccurrencePositions];
}

const directionToMoveOffsets = {
    '+x': [
        { direction: '+x', position: [1, 0, 0] },
        { direction: '-x', position: [-1, 0, 0] },
        { direction: '+y', position: [0, 1, 0] },
        { direction: '-y', position: [0, -1, 0] },
        { direction: '+z', position: [0, 0, 1] },
        { direction: '-z', position: [0, 0, -1] }
    ],
    '-x': [
        { direction: '+x', position: [1, 0, 0] },
        { direction: '-x', position: [-1, 0, 0] },
        { direction: '+y', position: [-1, 1, 0] },
        { direction: '-y', position: [-1, -1, 0] },
        { direction: '+z', position: [-1, 0, 1] },
        { direction: '-z', position: [-1, 0, -1] }
    ],
    '+y': [
        { direction: '+x', position: [1, 1, 0] },
        { direction: '-x', position: [-1, 1, 0] },
        { direction: '+y', position: [0, 1, 0] },
        { direction: '-y', position: [0, -1, 0] },
        { direction: '+z', position: [0, 1, 1] },
        { direction: '-z', position: [0, 1, -1] }
    ],
    '-y': [
        { direction: '+x', position: [1, -1, 0] },
        { direction: '-x', position: [-1, -1, 0] },
        { direction: '+y', position: [0, 1, 0] },
        { direction: '-y', position: [0, -1, 0] },
        { direction: '+z', position: [0, -1, 1] },
        { direction: '-z', position: [0, -1, -1] }
    ],
    '+z': [
        { direction: '+x', position: [1, 0, 1] },
        { direction: '-x', position: [-1, 0, 1] },
        { direction: '+y', position: [0, 1, 1] },
        { direction: '-y', position: [0, -1, 1] },
        { direction: '+z', position: [0, 0, 1] },
        { direction: '-z', position: [0, 0, -1] }
    ],
    '-z': [
        { direction: '+x', position: [1, 0, -1] },
        { direction: '-x', position: [-1, 0, -1] },
        { direction: '+y', position: [0, 1, -1] },
        { direction: '-y', position: [0, -1, -1] },
        { direction: '+z', position: [0, 0, 1] },
        { direction: '-z', position: [0, 0, -1] }
    ]
}

export const getAvailableMoves = (position, direction) => {
    let availableMoves = directionToMoveOffsets[direction]
    console.log('1', availableMoves)
    // For each position in availableMoves add the current position to it
    availableMoves = availableMoves.map((move) => {
        return {
            direction: move.direction,
            position: addCoords(move.position, position)
        }
    })
    console.log('2', availableMoves)


    // Now filter the available moves to ensure they are inside the Arena
    availableMoves = availableMoves.filter((move) => {
        return checkIfCoordInArena(move.position)
    })

    console.log('3', availableMoves)

    return availableMoves
}