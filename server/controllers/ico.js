const Ico = require('../models/ico');

module.exports = {
  status: async (req, res, next) => {
    Ico.find({ _version: 0 })
      .then(ico => {
        if (!ico) {
          return res.status(200).json({});
        }
        res.status(200).json({
          raisedFund: ico[0].raisedFund,
          openingTime: ico[0].openingTime,
          closingTime: ico[0].closingTime,
          cap: ico[0].cap,
          goal: ico[0].goal
        });
      })
      .catch(err =>
        res.status(500).json({ error: '500 - INTERNAL SERVER ERROR' })
      );
  }
};
