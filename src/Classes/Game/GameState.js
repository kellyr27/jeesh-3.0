import Army from "./Army"
import { ARENA_SPECS, generateRandomInt, positionInArray, checkIfInArena, equalPositions } from "../../globals"
import arenaGraph from "../Arena/Arena"

export function generateRandomStarCoordinate() {
    return [
        generateRandomInt(1, ARENA_SPECS.ARENA_LENGTH - 2),
        generateRandomInt(1, ARENA_SPECS.ARENA_LENGTH - 2),
        generateRandomInt(1, ARENA_SPECS.ARENA_LENGTH - 2)
    ]
}

const ARMY1_STARTING_POSES = [
    {
        position: [4, 5, 10],
        direction: [0, 0, -1]
    },
    {
        position: [5, 5, 10],
        direction: [0, 0, -1]
    },
    {
        position: [6, 5, 10],
        direction: [0, 0, -1]
    },
    {
        position: [5, 4, 10],
        direction: [0, 0, -1]
    },
    {
        position: [5, 6, 10],
        direction: [0, 0, -1]
    },
]

const ARMY2_STARTING_POSES = [
    {
        position: [4, 5, 0],
        direction: [0, 0, 1]
    },
    {
        position: [5, 5, 0],
        direction: [0, 0, 1]
    },
    {
        position: [6, 5, 0],
        direction: [0, 0, 1]
    },
    {
        position: [5, 4, 0],
        direction: [0, 0, 1]
    },
    {
        position: [5, 6, 0],
        direction: [0, 0, 1]
    },
]

const ARMY_NUM_TO_INDEX = {
    1: 0,
    2: 1
}

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

class GameState {

    constructor() {
        this.armies = [new Army(ARMY1_STARTING_POSES), new Army(ARMY2_STARTING_POSES)]
        this.starCoordinates = this.#createStarPositions()
        this.currentMoveNum = 1
        this.currentArmyNum = 1
    }

    #createStarPositions () {
        const numStars = generateRandomInt(0, ARENA_SPECS.MAX_NUM_STARS - 1)

        const starCoordinates = []
        for (let i = 0; i < numStars; i++) {
            // TODO: Modify so that stars are not placed on top of Soldiers
            let newStarCoordinate = generateRandomStarCoordinate()
            while (positionInArray(newStarCoordinate, starCoordinates)) {
                newStarCoordinate = generateRandomStarCoordinate()
            }

            starCoordinates.push(newStarCoordinate)
        }

        return starCoordinates
    }

    getStarPositions() {
        return this.starCoordinates
    }

    getStartingPoses(armyNum) {
        console.log()
        return this.armies[1].getPoses(0)
    }

    getCurrentAttackZones() {
        // console.log(this)
        // const army1Poses = this.armies[ARMY_NUM_TO_INDEX[1]].getPoses(this.currentMoveNum)
        // console.log(army1Poses)
        // return [getArmyAttackedCoords(army1Poses)]
    }

    updateArenaDisplay() {
        arenaGraph.updateVariableTypes(
            [[0,0,0]],
            [[1,1,1]],
            [[2,2,2]]
        )
    }
}

const gameState = new GameState()
export default gameState