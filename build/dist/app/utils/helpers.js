export const ensure = (obj, prop, val) => obj[prop] || (obj[prop] = val);
export const doSave = (what, def, err) => {
  const ret = () => def instanceof Function ? def() : def;
  try {
    return what() || ret();
  } catch (e) {
    console.debug(e);
    err && err(e);
    return ret();
  }
};
export const saveCallback = (what, err, fin) => {
  return async (...args) => {
    try {
      return await what(...args);
    } catch (e) {
      console.debug(e);
      err && err(e);
    } finally {
      fin && fin();
    }
  };
};
