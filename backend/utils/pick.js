const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        // eslint-disable-next-line 
        obj[key] = object[key];
      }
      return obj;
    }, {});
  };
  
  module.exports = pick;