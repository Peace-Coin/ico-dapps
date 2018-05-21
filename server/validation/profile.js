const Joi = require('joi');
const helper = require('./helper');

module.exports = {
  validateProfile: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema, {
        abortEarly: false
      });

      if (result.error) {
        const validation = helper.validationErrorMessage(result.error.details);
        return res.status(400).json({
          validation: validation
        });
      }

      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      next();
    };
  },

  profileSchema: {
    profileCheck: Joi.object().keys({
      firstName: Joi.string()
        .max(50)
        .required()
        .regex(/^[a-zA-Z0-9./=-]*$/)
        .label('first Name')
        .options({
          language: {
            string: {
              max: 'less than 50 char',
              regex: {
                base: 'fails to match the required pattern: half-width alphanumeric and number and [[./=-]'
              }
            }
          }
        }),
      lastName: Joi.string()
        .max(50)
        .required()
        .regex(/^[a-zA-Z0-9./=-]*$/)
        .label('last Name')
        .options({
          language: {
            string: {
              max: 'less than 50 char',
              regex: {
                base: 'fails to match the required pattern: half-width alphanumeric and number and [./=-]'
              }
            }
          }
        }),
      address: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9./=-]*$/)
        .max(250)
        .label('address')
        .options({
          language: {
            string: {
              max: 'less than 250 char',
              regex: {
                base: 'fails to match the required pattern: half-width alphanumeric and number and [./=-]'
              }
            }
          }
        }),
      birth: Joi.string()
        .required()
        .regex(/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
        .label('Date of birth')
        .options({
          language: {
            string: {
              regex: {
                base: 'fails to match the required pattern: YYYY-MM-DD',
              },
            },
          }
        }),
      country: Joi.string()
        .required()
        .label('country')
        .options({
          language: {
            string: {
            }
          }
        }),
      passport: Joi.string()
        .required()
        .max(1000000)
        .label('passport')
        .options({
          language: {
            string: {
              max: 'less than 10MB byte size'
            }
          }
        }),
      certificateResidence: Joi.string()
        .required()
        .max(1000000)
        .label('Certificate of Residence')
        .options({
          language: {
            string: {
              max: 'less than 10MB byte size'
            }
          }
        }),
      picture: Joi.string()
        .required()
        .max(1000000)
        .label('picture')
        .options({
          language: {
            string: {
              max: 'less than 10MB byte size'
            }
          }
        }),
      ethereumAddress: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9]*$/)
        .max(250)
        .label('Ethereum Address')
        .options({
          language: {
            string: {
              max: 'less than 250 char',
              regex: {
                base: 'fails to match the required pattern: half-width alphanumeric and number'
              }
            },
          }
        }),
      aml: Joi.boolean()
        .valid(true)
        .required()
        .label('AML(anti-money laundering)?')
        .options({
          language: {
            any: {
              allowOnly: 'must be Checked',
            }
          }
        }),
      terms: Joi.boolean()
        .valid(true)
        .required()
        .label('We confirmed PiaceCoin Terms')
        .options({
          language: {
            any: {
              allowOnly: 'must be Checked',
            }
          }
        }),
    })
  }
};
