import React from 'react';

const AxesHelperComponent = ({ axesHelper }) => {
    return (
        <>
            {axesHelper && axesHelper.visible && <primitive object={axesHelper} />}
        </>
    );
};

export default AxesHelperComponent;