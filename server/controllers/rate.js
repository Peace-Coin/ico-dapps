const Rate = require('../models/rate');

module.exports = {
  getRate: async (req, res, next) => {

    Rate.findOne({ __v: 0 })
      .then(rate => {

        console.log(rate)

        res.status(200).json(rate);

      }).catch(err => res.status(404).json(err));
  },
  updateRate: async (req, res, next) => {

    Rate.findOne({ __v: 0 })
      .then(rate => {
        rate.remove();
      });

    let rate = {
      bitcoinRate: req.bitcoinRate,
      usdRate: req.usdRate,
    }

    new Rate(rate).save();

    res
      .status(200)
      .json({ message: 'Rate update Success' });
  }
};
