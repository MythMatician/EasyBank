const Joi = require('joi');

module.exports.clientSchema = Joi.object({
    client : Joi.object({
        fullname: Joi.string().required(),
        email: Joi.string().email().required(),
        number: Joi.number().required(),
    }).required()
});