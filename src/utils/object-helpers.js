export const updateObjectInArraay = (items, objPropName, actionId, newObjProps) => {
  return  items.map((u) => {
        if (u[objPropName] === actionId) {
            return { ...u, ...newObjProps}
        }
        return u;
    })
}







export const updateObjectInArrayTest = (items, objectPrName, actionAd, newObjProp) => {
    return (
        items.map(item => {
            if(item[objectPrName] == actionAd) {
                return {...item, ...newObjProp}
            }

            return item;
        })
    )
}