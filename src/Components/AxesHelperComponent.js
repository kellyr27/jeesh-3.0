import { AxesHelper } from "three";
import { useControls } from "leva";

const AXIS_HELPER_LENGTH = 20


const createAxesHelper = () => {
    return new AxesHelper(AXIS_HELPER_LENGTH);
};

const updateAxesHelperVisibility = (axesHelper, isVisible) => {
    if (axesHelper) {
        axesHelper.visible = isVisible;
    }
};

const AxesHelperComponent = () => {
    const axesHelper = createAxesHelper();

    // Create a Leva control for axes helper visibility
    const { showAxesHelper } = useControls({
        showAxesHelper: { value: true, label: "Show Axes Helper" },
    });

    // Update AxesHelper visibility when the Leva control changes
    updateAxesHelperVisibility(axesHelper, showAxesHelper);


    return (
        <>
            {axesHelper && axesHelper.visible && <primitive object={axesHelper} />}
        </>
    )
}

export default AxesHelperComponent;