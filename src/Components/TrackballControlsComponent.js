import { TrackballControls } from "@react-three/drei";

const TrackballControlsComponent = () => {
    return (
        <TrackballControls makeDefault rotateSpeed="5" maxDistance="700" />
    );
}

export default TrackballControlsComponent;