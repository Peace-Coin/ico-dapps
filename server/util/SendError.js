
const config = require('../config/mailer');
const mailer = require('../services/mailer/mailer');

module.exports = {
  send: error => {

    console.log('server SendError start...')

    //システムエラー発生時メール送信
    //一時間以内の再発は送信しない
    var lastSendTime = global.lastSendTime;

    console.log('last send time -> ' + global.lastSendTime)

    let sendFlg = false;

    if(lastSendTime){

      var now = new Date();
      var diff = (now.getTime() - lastSendTime.getTime()) / (1000 * 60 * 60);
      console.log('前回システムエラー送信日時の差' + diff + '時間');

      if(diff >= 1){

        sendFlg = true;
      }

    }else{

      sendFlg = true;
    }

    global.lastSendTime = new Date();

    console.log('send time -> ' + global.lastSendTime);
    console.log('error -> ')

    let body = error.toString()

    console.log(body);

    if(sendFlg){

      // send email reset url with it
      let message = {
        from: config.MAIL_SENDER,
        to: ['manabu@chime-p.com', 'takeo@thebind.io'],
        subject: 'Peace Coin ICO System Error',
        html: body
      };

      mailer.sendEmail(message);
    }

    console.log('server SendError end...')
  }

};
