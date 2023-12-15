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

    updateSelectionPanel (callback) {
        
    }
}

const dispatcher = new Dispatcher()
export default dispatcher