import { equalCoords, equalPositions, ARENA_SPECS, checkIfInArena, findIntersectionPositions } from "../globals"

/**
 * Get all Attacked Cubes
 */
const getAttackedCoords = (pose) => {
    const [position, direction] = pose

    let attackedCoords = []

    for (let i = position[0] - 1; i <= position[0] + 1; i++) {
        for (let j = position[1] - 1; j <= position[1] + 1; j++) {
            for (let k = position[2] - 1; k <= position[2] + 1; k++) {
                if (checkIfInArena([i,j,k])) {
                    attackedCoords.push([i,j,k])
                }
            }
        }
    }

    // Offset Attacked Coords to match direction
    if (equalPositions(direction, '+x')) {
        attackedCoords = attackedCoords.map((position) => {
            return [position[0] + 2, position[1], position[2]]
        })
    } else if (equalPositions(direction, '-x')) {
        attackedCoords = attackedCoords.map((position) => {
            return [position[0] - 2, position[1], position[2]]
        })
    } else if (equalPositions(direction, '+y')) {
        attackedCoords = attackedCoords.map((position) => {
            return [position[0], position[1] + 2, position[2]]
        })
    } else if (equalPositions(direction, '-y')) {
        attackedCoords = attackedCoords.map((position) => {
            return [position[0], position[1] - 2, position[2]]
        })
    } else if (equalPositions(direction, '+z')) {
        attackedCoords = attackedCoords.map((position) => {
            return [position[0], position[1], position[2] + 2]
        })
    } else if (equalPositions(direction, '-z')) {
        attackedCoords = attackedCoords.map((position) => {
            return [position[0], position[1], position[2] - 2]
        })
    }

    return attackedCoords
}

const getArmyAttackedCoords = (poses) => {
    let armyAttackedCoords = []

    for (const pose of poses) {
        let attackedCoords = getAttackedCoords(pose)
        armyAttackedCoords = [...armyAttackedCoords, ...attackedCoords]
    }

    // Remove duplicate coords (array) from array
    armyAttackedCoords = [...new Set(armyAttackedCoords.map(JSON.stringify))].map(JSON.parse)

    return armyAttackedCoords
}

const getSharedAttackedCoords = (army1AttackedCoords, army2AttackedCoords) => {
    return findIntersectionPositions(army1AttackedCoords, army2AttackedCoords)
}
