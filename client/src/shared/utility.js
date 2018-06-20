export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const getURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://ico.peace-coin.org';
    //return 'http://localhost:5000';
  } else {
    return 'http://localhost:5000';
  }
};
