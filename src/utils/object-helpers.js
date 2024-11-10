export const updateObjectInArraay = (items, objPropName, actionId, newObjProps) => {
  return  items.map((u) => {
        if (u[objPropName] === actionId) {
            return { ...u, ...newObjProps}
        }
        return u;
    })
}







export const objectHelpersTest = (items, objectProperty, actionId, newObjectProps) => {
    return (
        items.map(item => {
            if(item[objectProperty] === actionId) {
                return {...item, ...newObjectProps}
            }
            return item;
        }) 
    )
}