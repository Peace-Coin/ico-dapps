const Profile = require('../models/profile');
const CodeNameUtil = require('../util/CodeNameUtil');
const Rate = require('../models/rate');

module.exports = {
  // secret
  secret: async (req, res, next) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors.noprofile);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  },

  checkProfile: async (req, res, next) => {

    Profile.findOne({"Profile.ethereumAddress":req.body.ethereumAddress}).then(profile => {

      //すでにethereumAddressが存在するかつ、それが自分のアカウント以外の場合
      if(profile != null && profile.user != req.user.id){

        let validation = {
          ethereumAddress: 'ERC20 Address is already in use'
        };

        res.status(400).json({validation});

      }else{

        res.json(req.body);
      }
    });
  },

  // Create Profile
  createProfile: async (req, res, next) => {
    // Basic Info
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;

    // KYC Information
    profileFields.Profile = {};
    profileFields.Profile.firstName = req.body.firstName;
    profileFields.Profile.lastName = req.body.lastName;
    profileFields.Profile.gender = req.body.gender;
    profileFields.Profile.phoneNumber1 = req.body.phoneNumber1;
    profileFields.Profile.phoneNumber2 = req.body.phoneNumber2;
    profileFields.Profile.postalCode = req.body.postalCode;
    profileFields.Profile.cityAddress = req.body.cityAddress;
    profileFields.Profile.streetAddress = req.body.streetAddress;
    profileFields.Profile.nationality = req.body.nationality;
    profileFields.Profile.idNumber = req.body.idNumber;
    profileFields.Profile.birth = req.body.birth;
    profileFields.Profile.country = req.body.country;
    profileFields.Profile.passport = req.body.passport;
    profileFields.Profile.certificateResidence = req.body.certificateResidence;
    profileFields.Profile.picture = req.body.picture;
    profileFields.Profile.ethereumAddress = req.body.ethereumAddress;
    profileFields.Profile.bitcoinAddress = req.body.bitcoinAddress;
    profileFields.Profile.aml = req.body.aml;
    profileFields.Profile.status = '1';

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          res.json(CodeNameUtil.getProfileStatus(profile));
        });
      } else {
        // Save Profile
        new Profile(profileFields)
          .save()
          .then(profile => res.json(CodeNameUtil.getProfileStatus(profile)));
      }
    });
  },

  // changeEthreumAddress
  changeEthreumAddress: async (req, res, next) => {
    // Basic Info
    const profileFields = {};
    profileFields.user = req.user.id;

    profileFields.Profile = {};
    profileFields.Profile.ethereumAddress = req.body.ethereumAddress;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.Profile.ethereumAddress = profileFields.Profile.ethereumAddress;

        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profile }
          ).then(profile => {
            Profile.findOne({ user: req.user.id })
              .then(profile => {
                if (!profile) {
                  errors.noprofile = 'There is no profile for this user';
                  res.status(404).json(errors);
                }

                res.json(CodeNameUtil.getProfileStatus(profile));
              })
              .catch(err => res.status(404).json(err));
          });
        }
      })
      .catch(err => res.status(500).json(err));
  },

  // changeBitcoinAddress
  changeBitcoinAddress: async (req, res, next) => {
    // Basic Info
    const profileFields = {};
    profileFields.user = req.user.id;

    profileFields.Profile = {};
    profileFields.Profile.bitcoinAddress = req.body.bitcoinAddress;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.Profile.bitcoinAddress = profileFields.Profile.bitcoinAddress;

        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profile }
          ).then(profile => {
            Profile.findOne({ user: req.user.id })
              .then(profile => {
                if (!profile) {
                  errors.noprofile = 'There is no profile for this user';
                  res.status(404).json(errors);
                }

                res.json(CodeNameUtil.getProfileStatus(profile));
              })
              .catch(err => res.status(404).json(err));
          });
        }
      })
      .catch(err => res.status(500).json(err));
  },

  // Get Profile
  getProfileByUserId: async (req, res) => {

    console.log('getProfileByUserId req.user.id -> ')
    console.log(req.user.id)

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(400).json(errors);
        }
        res.json(CodeNameUtil.getProfileStatus(profile));
      })
      .catch(err => res.status(404).json(err));
  },

  // Get Profile Status
  getProfileStatus: async (req, res) => {

    console.log('getProfileStatus req.user.id -> ')
    console.log(req.user.id)

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          res.json({ profileStatus: 0 });
        }
        res.json({
          profileStatus: 1,
          ethereumAddress: profile.Profile.ethereumAddress + '',
          bitcoinAddress: profile.Profile.bitcoinAddress + ''
        });
      })
      .catch(err => res.status(404).json(err));
  }
};
