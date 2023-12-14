import Soldier from './Soldier.js'

export default class Army {

    constructor (startingPoses) {
        this.soldiers = this.#createSoldiers(startingPoses)
    }

    // Generates a list of Soldiers at each of the starting positions
    #createSoldiers(startingPoses) {
        const soldiers = []

        for (const pose of startingPoses) {
            soldiers.push(new Soldier(pose))
        }

        return soldiers
    }

    // Gets the number of Soldiers alive at a given move.
    getAliveCount(moveNum) {
        return this.soldiers.filter(soldier => soldier.isAlive(moveNum)).length
    }

    // Gets an array of Soldier Poses at an given move
    getPoses(moveNum) {
        const poses = []

        for (const soldier of this.soldiers) {
            if (soldier.isAlive(moveNum)) {
                poses.push(soldier.getPose(moveNum))
            }
        }

        return poses
    }

    // Gets an array of Soldier Positions at an given move.
    getPositions(moveNum) {
        return this.getPoses(moveNum).map((pose) => {
            return pose.position
        })
    }
}