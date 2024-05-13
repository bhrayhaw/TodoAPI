const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(8).max(255).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: passwordComplexity().required(),
  });
  return schema.validate(user);
}

function authValidation(user) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: passwordComplexity().required(),
  });
  return schema.validate(user);
}

module.exports = { validateUser, authValidation };
