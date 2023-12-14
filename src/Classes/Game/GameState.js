import Army from "./Army"

export default class GameState {

    constructor(army1StartingPoses, army2StartingPoses, starPositions) {
        this.army1 = new Army(army1StartingPoses)
        this.army2 = new Army(army2StartingPoses)
        this.starCoordinates = starPositions
        this.currentMoveNum = 1
        this.currentArmyNum = 1
    }

    getStarPositions() {
        return this.starCoordinates
    }
}