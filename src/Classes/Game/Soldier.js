/**
 * SOLDIER
 * A Soldier is a game piece.
 * A Soldier to any surrounding square (imagine a Rubik's cube with the Soldier being the centre)
 * Once a soldier is Dead, it can no longer be moved.
 */

export default class Soldier {
    /**
     * A Pose is an Object with the following properties:
     * - position: The position of the Soldier
     * - direction: The direction the Soldier is facing
     */
    constructor (startingPose) {
        this.poses = {
            0: startingPose
        }
        this.deathIndex = -1
    }

    // Checks whether the Soldier is alive at an given move.
    isAlive(moveNum) {
        if (this.deathIndex === -1) {
            return true
        }
        else if (this.deathIndex > moveNum) {
            return true
        }
        else {
            return false
        }
    }

    // Sets the move number at which the Soldier died.
    setDead(moveNum) {
        this.deathIndex = moveNum
    }

    /**
     * Gets the Soldiers position at a given move.
     * NOTE: Does not check whether the Soldiers status (alive/dead) at a the given position
     */
    getPose(moveNum) {
        const foundPositionIndex = Object.keys(this.poses).reverse().find(el => parseInt(el) <= moveNum)
        return this.poses[foundPositionIndex]
    }

    // Gets a list of all the Soldiers previous positions
    getAllPoses() {
        return Object.values(this.poses)
    }

    // Sets the Soliders position at an given move.
    setPose(moveNum, position) {
        this.positions[moveNum] = position
    }
}