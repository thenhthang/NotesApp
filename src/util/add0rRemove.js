export default addOrRemove = (array, item) => {
    const newArr = [...array]
    const exists = newArr.includes(item);
    if (exists) {
      return newArr.filter((c) => {
        return c !== item;
      });
    } else {
      newArr.push(item);
      return newArr;
    }
};