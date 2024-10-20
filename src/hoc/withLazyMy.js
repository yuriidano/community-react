import { Suspense } from "react"


const withLazyMy = (Component) => {
    return  (props) => {
        return (
            <Suspense fallback={<div>Загрузка...</div>}>
                <Component {...props} />
            </Suspense>
        )
    }
};

export default withLazyMy;