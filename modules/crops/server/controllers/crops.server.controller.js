'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Crop = mongoose.model('Crop'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Crop
 */
exports.create = function(req, res) {
  var crop = new Crop(req.body);
  crop.user = req.user;

  crop.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(crop);
    }
  });
};

/**
 * Show the current Crop
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var crop = req.crop ? req.crop.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  crop.isCurrentUserOwner = req.user && crop.user && crop.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(crop);
};

/**
 * Update a Crop
 */
exports.update = function(req, res) {
  var crop = req.crop ;

  crop = _.extend(crop , req.body);

  crop.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(crop);
    }
  });
};

/**
 * Delete an Crop
 */
exports.delete = function(req, res) {
  var crop = req.crop ;

  crop.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(crop);
    }
  });
};

/**
 * List of Crops
 */
exports.list = function(req, res) { 
  Crop.find().sort('-created').populate('user', 'displayName').exec(function(err, crops) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(crops);
    }
  });
};

/**
 * Crop middleware
 */
exports.cropByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Crop is invalid'
    });
  }

  Crop.findById(id).populate('user', 'displayName').exec(function (err, crop) {
    if (err) {
      return next(err);
    } else if (!crop) {
      return res.status(404).send({
        message: 'No Crop with that identifier has been found'
      });
    }
    req.crop = crop;
    next();
  });
};
