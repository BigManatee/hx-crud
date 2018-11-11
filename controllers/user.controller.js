const validator = require('validator');

const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

/** Create Action */
exports.user_create = function (req, res) {

    // Check if the suppied email is actually an email
    if(!validator.isEmail(req.body.email)) {
        return res.status(422).json({
            'status': 0,
            'error': 'Please provide a valid email address'
        });
    }

    // Check if given or family name is empty
    if(validator.isEmpty(req.body.givenName) || validator.isEmpty(req.body.familyName)) {
        return res.status(422).json({
            'status': 0,
            'error': 'Please check givenName and familyName is not empty'
        });
    }

    let user = new User({
        email: req.body.email,
        givenName: req.body.givenName,
        familyName: req.body.familyName
    });

    // Save the user into mongo once it's all validated
    user.save(function (err, user) {
        if (err) {
            return res.status(422).json({
                'status': 0,
                'error': err.message || 'An error occurred while creating the user'
            });
        }
        return res.status(201).json({
            'status': 1,
            'message': 'Created Successfully',
            'user': {
                '_id': user.id
            }
        });
    })
};

/** Read by ID Action */
exports.user_details = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(422).json({
                'status': 0,
                'error': err.message || 'An error occurred while retrieving user'
            });
        }
        return res.status(200).json({
            'status': 1,
            user
        });
    })
};

/** Update Action */
exports.user_update = function (req, res) {

    // Check if the suppied email is actually an email
    if(!validator.isEmail(req.body.email)) {
        return res.status(422).json({
            'status': 0,
            'error': 'Please provide a valid email address'
        });
    }

    // Check if given or family name is empty
    if(validator.isEmpty(req.body.givenName) || validator.isEmpty(req.body.familyName)) {
        return res.status(422).json({
            'status': 0,
            'error': 'Please check givenName and familyName is not empty'
        });
    }

    // Process if no fields are empty and valid email
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) {
            return res.status(422).json({
                'status': 0,
                'error': err.message || 'An error occurred while updating user'
            });
        }
        return res.status(200).json({
            'status': 1,
            'message': 'Update Successful'
        });
    });
};

/** Delete Action */
exports.user_delete = function (req, res) {

    // Check if id is provided
    if(validator.isEmpty(req.body.id)) {
        return res.status(422).json({
            'status': 0,
            'error': 'Please include an id to delete'
        });
    }

    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.status(422).json({
                'status': 0,
                'error': err.message || 'An error occurred while deleting user'
            });
        }
        return res.status(200).json({
            'status': 1,
            'message': 'Deleted successfully'
        });
    })
};