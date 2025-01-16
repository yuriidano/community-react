import { Suspense } from "react";

const withLAzy = (Component) => () => {
    return (
        <Suspense fallback={'Loading...'}>
            <Component />
        </Suspense>
    )
};


export default withLAzy;