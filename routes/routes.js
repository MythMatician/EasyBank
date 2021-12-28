const express = require('express');
const router = express.Router({mergeParams: true});
const catchError = require('../utils/catchError')
const controller = require('../controller/controllers');
const Client = require('../models/clients');
const ExpressError = require('../utils/ExpressError');
const { clientSchema } = require('../schemas')

const validateClient = (req, res, next) => {
    const { error } =  clientSchema.validate(req.body);   
    if(error) {
        const msg = error.details.map(item => item.message).join(',');
        console.log(msg);
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.get('/about', controller.getAbout)

router.route('/contact')
    .get(controller.getContact)
    .post(catchError(controller.sendMessage));

router.route('/request')
    .get(controller.getRequest)
    .post(validateClient, catchError(controller.sendRequest));

router.get('/careers', controller.getCareers)

module.exports = router;