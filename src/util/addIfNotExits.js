export default addIfNotExits = (array, item) => {
    const newArr = [...array]
    const exists = newArr.includes(item);
    if (exists){
      return newArr;
    }else {
      newArr.push(item);
      return newArr;
    }
};