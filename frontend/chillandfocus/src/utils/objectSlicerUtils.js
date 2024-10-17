
function getItemContentByKeys(obj, keys) {
    const newArr = [];
    keys.forEach((key) => {
        newArr.push(obj[key]);
    });

}

function getItemContentByKey(obj, key){
    return obj[key];
}