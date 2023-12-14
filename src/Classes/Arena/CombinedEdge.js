
/**
 * In 3D Space, a Combined Edge is the combination of 2 Line Edges.
 * For example the edge between [0,0,0] and [0,1,1] is shared by [0,1,0] and [0,0,1]
 */
export default class CombinedEdge {
    constructor(lineEdge1, lineEdge2) {
        this.lineEdge1 = lineEdge1
        this.lineEdge2 = lineEdge2
    }

    getPoints () {
        return this.lineEdge1.getPoints()
    }

    getType () {

        if (this.lineEdge2) {
            let maxType = Math.max(this.lineEdge1.getType(), this.lineEdge2.getType())

            // Removes all Lines inside an Attack Zone
            if (this.lineEdge1.checkIfInsideAttackZone() && this.lineEdge2.checkIfInsideAttackZone()) {
                return 0
            }

            // Special case to only show edges of the Attack Zones
            if (maxType === 3 || maxType === 4 || maxType === 5) {
                if ((this.lineEdge1.getType() === 3 || this.lineEdge1.getType() === 4 || this.lineEdge1.getType() === 5) && 
                    (this.lineEdge2.getType() === 3 || this.lineEdge2.getType() === 4 || this.lineEdge2.getType() === 5)) {
                        return 0;
                }
                else {
                    return maxType
                }
            } else {
                return maxType
            }

        } else {
            return this.lineEdge1.getType()
        }
    }
}