import { NUM_SOLDIER } from "../Utils/constants";
import { generateRandomCoord, generateRandomDirection, getAvailableMoves } from "../Utils/functions";
import SoldierCone from "./SoldierCone";

class Controller {
    constructor () {
        this.createSoldierCones()

    }

    createSoldierCones () {
        this.soldierCones = [];

        for (let i = 0; i < NUM_SOLDIER; i++) {
            this.soldierCones.push(new SoldierCone(
                generateRandomCoord(),
                generateRandomDirection()
            ))
        }
    }

    getSoldierCones () {
        return this.soldierCones
    }

    updateSoldierCones () {
        this.soldierCones.forEach((soldier) => {
            // Find the Soldiers possible Moves
            const availableMoves = getAvailableMoves(soldier.position, soldier.direction)
            console.log(availableMoves)
            // Choose a random move
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)]
            console.log(randomMove)
            // Update the soldier position
            soldier.position = randomMove.position
            soldier.direction = randomMove.direction
        })
    }
    
}

const controller = new Controller()
export default controller