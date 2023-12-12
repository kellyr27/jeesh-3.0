
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
            return Math.max(this.lineEdge1.getType(), this.lineEdge2.getType())
        } else {
            return this.lineEdge1.getType()
        }
    }
}