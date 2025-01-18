import React, { Suspense } from "react";

const withLAzy = (Component: React.ComponentType) => () => {
    return (
        <Suspense fallback={'Loading...'}>
            <Component />
        </Suspense>
    )
};


export default withLAzy;