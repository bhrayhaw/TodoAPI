const Joi = require("joi");

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(8).max(255).required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().min(8).max(255)
    })
    return schema.validate(user);
}

module.exports = validateUser;