

let objectHelpersTest = (items, propertyName, actionId, newObjectName) => {
    return (
        items.map(item => {
            if(item[propertyName] === actionId) {
                return {...item, ...newObjectName}
            }
            return item;
        })
    )
};


export default objectHelpersTest;