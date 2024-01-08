import CubeNodes from '../CubeNodesComponent/Classes/CubeNodes'
import { equalCoords, positionInArray } from '../../../../globals'

// Checks if a Coord is a Door
const checkIfCoordIsDoor = (coord) => {
    if (equalCoords(coord, [5,5,0]) || equalCoords(coord, [5,5,10])) {
        return true
    } else {
        return false
    }
}

class GameController {
    constructor () {
        this.cubeNodes = new CubeNodes()
    }

    getDisplayCubeNodes () {
        return this.cubeNodes.getDisplayCubeNodes()
    }


    setCubeNodesDisplay(army1AttackZonePositions, army2AttackZonePositions) {
        this.getDisplayCubeNodes().forEach((cubeNode) => {
            const position = cubeNode.getPosition()
            const isArmy1AttackZone = positionInArray(position, army1AttackZonePositions)
            const isArmy2AttackZone = positionInArray(position, army2AttackZonePositions)
            const isDoor = checkIfCoordIsDoor(position)

            if (isDoor) {
                cubeNode.setDisplayDoor()
            } else if (isArmy1AttackZone && isArmy2AttackZone) {
                cubeNode.setDisplaySharedAttackZone()
            } else if (isArmy1AttackZone) {
                cubeNode.setDisplayArmy1AttackZone()
            } else if (isArmy2AttackZone) {
                cubeNode.setDisplayArmy2AttackZone()
            } else {
                cubeNode.setDisplayDefault()
            }

        })
    }
}

const gameController = new GameController();
gameController.setCubeNodesDisplay([[5,5,5],[5,5,6]], [[5,5,6],[5,5,7]])
export default gameController;