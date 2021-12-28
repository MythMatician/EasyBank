const sendMail = require('../mail.js');
const sendInvitation = require('../mail.js');
const Client = require('../models/clients');

module.exports.getAbout = (req, res) => {
    res.render('about');
};

module.exports.getContact = (req, res) => {
    res.render('contact');
};

module.exports.getCareers = (req, res) => {
    res.render('careers');
};

module.exports.getRequest = (req, res) => {
    res.render('request');
};

module.exports.sendMessage = async (req, res) => {
    try {
        const {email, fullname, subject, message} = req.body;
        await sendMail(email, fullname, subject, message);
        req.flash('success', 'Successfully sent your message');
        res.redirect('contact');
    } catch(e) {
        req.flash('error', e);
        res.redirect('contact');
    }
};

module.exports.sendRequest = async (req, res) => {
    try {
        const {fullname, email, number} = req.body.client;
        const newClient = new Client({fullname,email,number});
        await newClient.save();
        sendInvitation(email, fullname);
        req.flash('success', 'Invitation has been sent, please check your inbox or spam folder and follow the link to get started');
        res.redirect('request');
    } catch(e) {
        req.flash('error', 'There is already a user with those credentials');
        res.redirect('request');
    }
}