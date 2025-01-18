export const updateObjectInArraay = (items: any, objPropName: any, actionId: any, newObjProps: any) => {
  return  items.map((u: any) => {
        if (u[objPropName] === actionId) {
            return { ...u, ...newObjProps}
        }
        return u;
    })
}







