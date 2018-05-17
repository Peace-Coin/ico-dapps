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
        .min(1)
        .max(48)
        .required()
        .options({
          language: {
            string: {
              min: 'more than 2 char',
              max: 'less than 48 char'
            }
          }
        }),
      lastName: Joi.string()
        .min(1)
        .max(48)
        .required()
        .options({
          language: {
            string: {
              min: 'more than 2 char',
              max: 'less than 48 char'
            }
          }
        }),
      address: Joi.string()
        .required()
        .max(250)
        .options({
          language: {
            string: {
              required: 'Address must be required',
              max: 'less than 250 char'
            }
          }
        }),
      birth: Joi.string()
        .required()
        .options({
          language: {
            string: {
              required: 'Birth must be required'
            }
          }
        }),
      country: Joi.string()
        .required()
        .options({
          language: {
            string: {
              required: 'Country must be required'
            }
          }
        }),
      passport: Joi.string()
        .required()
        .max(1000000)
        .options({
          language: {
            string: {
              required: 'Passport must be required',
              max: 'less than 10MB byte size'
            }
          }
        }),
      certificateResidence: Joi.string()
        .required()
        .max(1000000)
        .options({
          language: {
            string: {
              required: 'Certificate of Residence must be required',
              max: 'less than 10MB byte size'
            }
          }
        }),
      picture: Joi.string()
        .required()
        .max(1000000)
        .options({
          language: {
            string: {
              required: 'Picture must be required',
              max: 'less than 250 char'
            }
          }
        }),
      ethereumAddress: Joi.string()
        .required()
        .max(250)
        .options({
          language: {
            string: {
              required: 'EthereumAddress must be required',
              max: 'less than 250 char'
            }
          }
        }),
      aml: Joi.boolean()
        .valid(true)
        .required()
        .options({
          language: {
            string: {
              valid: 'AML(anti-money laundering)? must be Checked'
            }
          }
        }),
      terms: Joi.boolean()
        .valid(true)
        .required()
        .options({
          language: {
            string: {
              valid: 'We confirmed PiaceCoin Terms must be Checked'
            }
          }
        }),
    })
  }
};

// {
//   firstName : "fails to match the aaaa pattern",
//   lastName  : "fails to match the bbbb pattern"
// }

// lastName: Joi.string()
// .regex(/^[1-4]\d*$/, 'aaaa')
// .required()
// .options({
//   language: {
//     string: {
//       regex: {
//         aaaa: '1-4 rgular expression error 1',
//         bbbb: '5-9 rgular expression error 1'
//       }
//     }
//   }
// })
// })

// password: Joi.string()
//   .regex(/^\S+$/, 'firstName')
//   .regex(/[A-Z]+/, 'secondName')
//   .regex(/\d+/, 'thirdName')
//   .required()
//   .options({
//     language: {
//       string: {
//         regex: {
//           base: 'base',
//           firstName: 'first',
//           secondName: 'second',
//           thirdName: 'third'
//         }
//       }
//     }
//   });
