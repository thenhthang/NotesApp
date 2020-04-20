export default addIfNotExits = (array, item) => {
    const exists = array.includes(item);
    if (exists){
      return array;
    }else {
      const result = array;
      result.push(item);
      return result;
    }
};