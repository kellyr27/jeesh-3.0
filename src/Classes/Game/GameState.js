import Army from "./Army"

class GameState {

    startGame(army1StartingPoses, army2StartingPoses, starPositions) {
        this.armies = [new Army(army1StartingPoses), new Army(army2StartingPoses)]
        this.starCoordinates = starPositions
        this.currentMoveNum = 1
        this.currentArmyNum = 1
    }

    getStarPositions() {
        return this.starCoordinates
    }

    getStartingPoses(armyNum) {
        return this.armies[armyNum].getPoses(0)
    }
}

const gameState = new GameState()
export default gameState