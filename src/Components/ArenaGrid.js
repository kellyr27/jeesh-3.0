import { Line } from '@react-three/drei';
import { ARENA_SPECS } from '../globals';

export default function ArenaGrid() {

    const Lines = () => {
        let lines = []
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 12; j++) {
                lines.push(
                    <Line
                        points={[[0,i,j],[11,i,j]]}
                        color='yellow'
                        linewidth={0.2}
                    />
                )
                lines.push(
                    <Line
                        points={[[i,0,j],[i,11,j]]}
                        color='yellow'
                        linewidth={0.2}
                    />
                )
                lines.push(
                    <Line
                        points={[[i,j,0],[i,j,11]]}
                        color='yellow'
                        linewidth={0.2}
                    />
                )
            }
        }
        return lines
    }

    const SignificantLines = () => {
        let lines = []

        return lines
    }

    return (
        <>
            {Lines()}
            {/* <Line
                points={[[0,1,0],[11,1,0]]}
                color='yellow'
                linewidth={0.7}
            />
            <Line
                points={[[0,0,0],[0,11,0]]}
                color='yellow'
                linewidth={0.7}
            />
            <Line
                points={[[0,0,0],[0,0,11]]}
                color='yellow'
                linewidth={0.7}
            />
            <Line
                points={[[0,0,0],[1,0,0]]}
                color='yellow'
                linewidth={0.7}
            />
            <Line
                points={[[0,0,0],[1,0,0]]}
                color='yellow'
                linewidth={0.7}
            /> */}
        </>
    )
}