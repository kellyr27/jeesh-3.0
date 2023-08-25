import './App.css';
import { Canvas } from '@react-three/fiber';
import { Line, TrackballControls } from '@react-three/drei';
import { Stars, QuadraticBezierLine } from '@react-three/drei'
import ArenaGrid from './Components/ArenaGrid';
import StarField from './Components/StarField';

function App() {
  
  return (
    <>
    <div className="Game-display">
      <Canvas>
        <color attach="background" args={['#191920']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <TrackballControls makeDefault rotateSpeed='3'/>
        <axesHelper args={[20]}/>
        <mesh visible
          position={[21,21,21]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <coneGeometry />
          <meshBasicMaterial color="red"/>
        </mesh>

        <ArenaGrid />
        <StarField />
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
