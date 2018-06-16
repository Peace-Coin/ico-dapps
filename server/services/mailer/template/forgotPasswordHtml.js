module.exports = forgotPasswordHtml => {

  var conf;

  if (process.env.NODE_ENV === 'playground') {

    conf = require('../../../config/prodconf.json');

  }else{

    conf = require('../../../config/devconf.json');
  }

  let url = conf.CHANGE_PASSWORD_URL + forgotPasswordHtml.local.secretToken

  return `
  <html>
    <body>
      <p>Please Reset your password from folloing Link.</p>
      ${
        url
      }
    </body>
  </html>
  `;
};
