import { equalCoords, equalPositions, ARENA_SPECS, checkIfInArena } from "../globals"

/**
 * Get all Attacked Cubes
 */
const getAttackedCoords = (position) => {
    const [coord, direction] = position

    let attackedCoords = []

    for (let i = coord[0] - 1; i <= coord[0] + 1; i++) {
        for (let j = coord[1] - 1; j <= coord[1] + 1; j++) {
            for (let k = coord[2] - 1; k <= coord[2] + 1; k++) {
                if (checkIfInArena([i,j,k])) {
                    attackedCoords.push([i,j,k])
                }
            }
        }
    }

    if (equalPositions(direction, [1,0,0])) {
        attackedCoords = attackedCoords.map((coord) => {
            return [coord[0] + 2, coord[1], coord[2]]
        })
    } else if (equalPositions(direction, [-1,0,0])) {
        attackedCoords = attackedCoords.map((coord) => {
            return [coord[0] - 2, coord[1], coord[2]]
        })
    } else if (equalPositions(direction, [0,1,0])) {
        attackedCoords = attackedCoords.map((coord) => {
            return [coord[0], coord[1] + 2, coord[2]]
        })
    } else if (equalPositions(direction, [0,-1,0])) {
        attackedCoords = attackedCoords.map((coord) => {
            return [coord[0], coord[1] - 2, coord[2]]
        })
    } else if (equalPositions(direction, [0,0,1])) {
        attackedCoords = attackedCoords.map((coord) => {
            return [coord[0], coord[1], coord[2] + 2]
        })
    } else if (equalPositions(direction, [0,0,-1])) {
        attackedCoords = attackedCoords.map((coord) => {
            return [coord[0], coord[1], coord[2] - 2]
        })
    }

    return attackedCoords
}

/**
 * TODO - REMOVE DUPLICATE
 */
const getArmyAttackedCoords = (positions) => {
    let armyAttackedCoords = []

    for (const position of positions) {
        let attackedCoords = getAttackedCoords(position)
        armyAttackedCoords = [...armyAttackedCoords, ...attackedCoords]
    }

    return armyAttackedCoords
}

const getSharedAttackedCoords = (army1AttackedCoords, army2AttackedCoords) => {

}