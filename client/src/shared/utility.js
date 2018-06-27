export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const getURL = () => {

  var conf = require('../config/conf.json');

  if (process.env.NODE_ENV === 'production') {

    return conf.TEST_API_DOMAIN;
    //return conf.API_DOMAIN;

  } else {

    return conf.TEST_API_DOMAIN;
  }
};
