import './App.css';
import { Canvas } from '@react-three/fiber';
import { Line, TrackballControls } from '@react-three/drei';
import { Stars, QuadraticBezierLine } from '@react-three/drei'
import ArenaGrid from './Components/ArenaGrid';
import StarField from './Components/StarField';
import SoldierCone from './Components/SoldierCone';
import Army from './Components/Army';

function App() {
  
  const starCoords = [
    [0,0,0],
    [2,2,2],
    [2,3,3]
  ]

  return (
    <>
    <div className="Game-display">
      <Canvas>
        <color attach="background" args={['#191920']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <TrackballControls makeDefault rotateSpeed='3'/>
        <axesHelper args={[20]}/>
        <ArenaGrid />
        <StarField starCoords={starCoords}/>
        <Army />
        {/* <SoldierCone initialPosition={[[5,5,10],[0,0,1]]} soldierId={[0,1]}/>
        <SoldierCone initialPosition={[[4,5,10],[0,0,1]]} soldierId={[0,2]}/> */}
        {/* <QuadraticBezierLine 
          start={[0, 0, 0]} 
          end={[10, 0, 10]} 
          mid={[5, 5, 5]}
          color="blue"
          lineWidth={2}
        /> */}
      </Canvas>
    </div>
    </>
  );
}

export default App;
