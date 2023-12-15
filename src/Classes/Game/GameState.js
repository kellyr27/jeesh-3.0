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
        direction: '-z'
    },
    {
        position: [5, 5, 10],
        direction: '-z'
    },
    {
        position: [6, 5, 10],
        direction: '-z'
    },
    {
        position: [5, 4, 10],
        direction: '-z'
    },
    {
        position: [5, 6, 10],
        direction: '-z'
    },
]

function getRandomValueFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const createRandomArmy1 = () => {
    const startingPoses = []
    for (let i = 0; i < 6; i++) {
        startingPoses.push({
            position: [
                generateRandomInt(0, ARENA_SPECS.ARENA_LENGTH - 2),
                generateRandomInt(0, ARENA_SPECS.ARENA_LENGTH - 2),
                generateRandomInt(1, ARENA_SPECS.ARENA_LENGTH - 2),
            ],
            direction: getRandomValueFromArray(['-z', '+z', '+y', '-y', '+x', '-x'])
        })
    }
    return startingPoses
}

const ARMY2_STARTING_POSES = [
    {
        position: [4, 5, 0],
        direction: '+z'
    },
    {
        position: [5, 5, 0],
        direction: '+z'
    },
    {
        position: [6, 5, 0],
        direction: '+z'
    },
    {
        position: [5, 4, 0],
        direction: '+z'
    },
    {
        position: [5, 6, 0],
        direction: '+z'
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
    const {position, direction} = pose

    let attackedCoords = []

    for (let i = position[0] - 1; i <= position[0] + 1; i++) {
        for (let j = position[1] - 1; j <= position[1] + 1; j++) {
            for (let k = position[2] - 1; k <= position[2] + 1; k++) {
                attackedCoords.push([i,j,k])
            }
        }
    }

    // Offset Attacked Coords to match direction
    if (direction === '+x') {
        attackedCoords = attackedCoords.map((position) => {
            return [position[0] + 2, position[1], position[2]]
        })
    } else if (direction === '-x') {
        attackedCoords = attackedCoords.map((position) => {
            return [position[0] - 2, position[1], position[2]]
        })
    } else if (direction === '+y') {
        attackedCoords = attackedCoords.map((position) => {
            return [position[0], position[1] + 2, position[2]]
        })
    } else if (direction === '-y') {
        attackedCoords = attackedCoords.map((position) => {
            return [position[0], position[1] - 2, position[2]]
        })
    } else if (direction === '+z') {
        attackedCoords = attackedCoords.map((position) => {
            return [position[0], position[1], position[2] + 2]
        })
    } else if (direction === '-z') {
        attackedCoords = attackedCoords.map((position) => {
            return [position[0], position[1], position[2] - 2]
        })
    }

    // Remove Coords that are outside the Arena
    attackedCoords = attackedCoords.filter((position) => {
        return checkIfInArena(position)
    })

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
        this.armies = [new Army(createRandomArmy1()), new Army(ARMY2_STARTING_POSES)]
        this.starCoordinates = this.#createStarPositions()
        this.currentMoveNum = 1
        this.currentArmyNum = 1
    }

    #createStarPositions () {
        const allSoldierStartingPositions = this.getAllArmyPositions(0)
        const numStars = generateRandomInt(0, ARENA_SPECS.MAX_NUM_STARS - 1)

        const starCoordinates = []
        for (let i = 0; i < numStars; i++) {
            // TODO: Modify so that stars are not placed on top of Soldiers
            let newStarCoordinate = generateRandomStarCoordinate()
            while (positionInArray(newStarCoordinate, starCoordinates) || positionInArray(newStarCoordinate, allSoldierStartingPositions)) {
                newStarCoordinate = generateRandomStarCoordinate()
            }

            starCoordinates.push(newStarCoordinate)
        }

        return starCoordinates
    }

    getStarPositions() {
        return this.starCoordinates
    }


    // TODO: This may be redundant in the future
    getStartingPoses(armyNum) {
        return this.armies[armyNum].getPoses(0)
    }

    getCurrentAttackZones() {
        const army1Poses = this.armies[ARMY_NUM_TO_INDEX[1]].getPoses(this.currentMoveNum)

        return {
            army1AttackZone: getArmyAttackedCoords(army1Poses), 
            army2AttackZone: [], 
            sharedAttackZone: []
        }
    }

    getAllArmyPositions(moveNum) {
        const army1Positions = this.armies[ARMY_NUM_TO_INDEX[1]].getPositions(moveNum)
        const army2Positions = this.armies[ARMY_NUM_TO_INDEX[2]].getPositions(moveNum)

        return [...army1Positions, ...army2Positions]
    }
}

const gameState = new GameState()
export default gameState