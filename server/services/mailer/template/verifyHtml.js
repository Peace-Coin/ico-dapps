module.exports = verifyHtml => {

  var conf;

  if (process.env.NODE_ENV === 'playground') {

    conf = require('../../../config/prodconf.json');

  }else{

    conf = require('../../../config/devconf.json');
  }

  let url = conf.VERIFY_PASSWORD_URL + verifyHtml.local.secretToken

  return `
  <html>
    <body>
      <p>Hello</p>
      <p>Thankyou for registeration!</p>
      <p>Please verifty your email cliking following url:</p>
      ${
        url
      }
      <br />
    </body>
  </html>
  `;
};
