// SelectionPanel.js
import React from 'react';
import { Canvas } from '@react-three/fiber';

const SelectionPanel = () => {
  return (
    <Canvas
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '100px',
        height: '100px',
        // pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {/* Add your selection panel content here */}
    <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
    </mesh>
    </Canvas>
  );
};

export default SelectionPanel;