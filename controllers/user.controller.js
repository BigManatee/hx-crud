const validator = require('validator');
const User = require('../models/user.model');

/** List all users */
exports.all_users = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(422).json({
        status: 0,
        error: err.message || 'An error occurred while retrieving usera',
      });
    }

    return res.status(200).json({
      status: 1,
      message: 'Retrieved successfully',
      users,
    });
  });
};

/** Create Action */
exports.user_create = async (req, res) => {
  // Check if the suppied email is actually an email
  if (typeof req.body.email !== 'undefined' && !validator.isEmail(req.body.email)) {
    return res.status(422).json({
      status: 0,
      error: 'Please provide a valid email address',
    });
  }

  // Check if given or family name is empty
  if ((req.body.givenName && validator.isEmpty(req.body.givenName))
      || (req.body.familyName && validator.isEmpty(req.body.familyName))) {
    return res.status(422).json({
      status: 0,
      error: 'Please check givenName and familyName is not empty',
    });
  }

  const user = new User({
    email: req.body.email,
    givenName: req.body.givenName,
    familyName: req.body.familyName,
  });

  const existingUser = await User.findOne({ email: req.body.email }).exec();
  if (existingUser) {
    return res.status(409).json({
      status: 0,
      error: `The specified email ${req.body.email} address already exists`,
    });
  }

  // Save the user into mongo once it's all validated
  user.save((err) => {
    if (err) {
      return res.status(422).json({
        status: 0,
        error: err.message || 'An error occurred while creating the user',
      });
    }

    return res.status(201).json({
      status: 1,
      message: 'Created Successfully',
      user: {
        _id: user.id,
      },
    });
  });

  return undefined;
};

/** Read by ID Action */
exports.user_details = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(422).json({
        status: 0,
        error: `No user with id of ${req.params.id}`,
      });
    }
    return res.status(200).json({
      status: 1,
      user,
    });
  });
};

/** Update Action */
exports.user_update = (req, res) => {
  // Check if the suppied email is actually an email
  if (typeof req.body.email !== 'undefined' && !validator.isEmail(req.body.email)) {
    return res.status(422).json({
      status: 0,
      error: 'Please provide a valid email address',
    });
  }

  // Check if given or family name is empty
  if ((req.body.givenName && validator.isEmpty(req.body.givenName))
      || (req.body.familyName && validator.isEmpty(req.body.familyName))) {
    return res.status(422).json({
      status: 0,
      error: 'Please check givenName and familyName is not empty',
    });
  }

  // Process if no fields are empty and valid email
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) {
      return res.status(422).json({
        status: 0,
        error: err.message || 'An error occurred while updating user',
      });
    }
    return res.status(200).json({
      status: 1,
      message: 'Update Successful',
    });
  });

  return undefined;
};

/** Delete Action */
exports.user_delete = (req, res) => {
  // Check if id is provided
  if (validator.isEmpty(req.body.id)) {
    return res.status(422).json({
      status: 0,
      error: 'Please include an id to delete',
    });
  }

  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return res.status(422).json({
        status: 0,
        error: err.message || 'An error occurred while deleting user',
      });
    }
    return res.status(200).json({
      status: 1,
      message: 'Deleted successfully',
    });
  });

  return undefined;
};
