import gameState from "./Game/GameState"
import raycaster from "./Raycaster"
import selectionPanelController from "./SelectionPanel"
import arenaGraph from "./Arena/Arena"


class Dispatcher {
    constructor () {
        console.log('Dispatcher created')
    }


    updateArenaGrid (callback) {
        const {army1AttackZone, army2AttackZone, sharedAttackZone} = gameState.getCurrentAttackZones()
        arenaGraph.updateVariableTypes(army1AttackZone, army2AttackZone, sharedAttackZone)

        if (callback) {
            callback()
        }
    }

    updateSelectionPanelTrapezoidClick (callback) {
        
    }

    updateSelectionPanelSoldierClick (callback) {
        const newSelectedSoldierIndex = raycaster.getSelectedIndex()
        selectionPanelController.setSelectedSoldierIndex(newSelectedSoldierIndex)

        // This means that currently a Soldier is selected
        if (newSelectedSoldierIndex !== -1) {
            const soldierCurrentPose = gameState.getCurrentSoldierPose(1, newSelectedSoldierIndex)
            const soldierPossibleMoves = gameState.getPossibleSoldierMoves(newSelectedSoldierIndex)
            selectionPanelController.setPossibleMoves(soldierPossibleMoves)
            selectionPanelController.setCurrentPose(soldierCurrentPose)
            console.log(soldierPossibleMoves.length)
        }
    }
}

const dispatcher = new Dispatcher()
export default dispatcher