import './App.css';
import { Canvas } from '@react-three/fiber';
import { TrackballControls } from '@react-three/drei';
import { Stars } from '@react-three/drei'

function App() {
  
  return (
    <>
    <div className="Game-display">
      <Canvas>
        <color attach="background" args={['#191920']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <TrackballControls makeDefault />
        <mesh>
          <coneGeometry />
          <meshBasicMaterial color="red"/>
        </mesh>
      </Canvas>
    </div>
    </>
  );
}

export default App;
