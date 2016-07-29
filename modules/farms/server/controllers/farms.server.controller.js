'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Farm = mongoose.model('Farm'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Farm
 */
exports.create = function(req, res) {
  var farm = new Farm(req.body);
  farm.user = req.user;

  farm.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(farm);
    }
  });
};

/**
 * Show the current Farm
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var farm = req.farm ? req.farm.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  farm.isCurrentUserOwner = req.user && farm.user && farm.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(farm);
};

/**
 * Update a Farm
 */
exports.update = function(req, res) {
  var farm = req.farm ;

  farm = _.extend(farm , req.body);

  farm.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(farm);
    }
  });
};

/**
 * Delete an Farm
 */
exports.delete = function(req, res) {
  var farm = req.farm ;

  farm.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(farm);
    }
  });
};

/**
 * List of Farms
 */
exports.list = function(req, res) { 
  Farm.find().sort('-created').populate('user', 'displayName').exec(function(err, farms) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(farms);
    }
  });
};

/**
 * Farm middleware
 */
exports.farmByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Farm is invalid'
    });
  }

  Farm.findById(id).populate('user', 'displayName').exec(function (err, farm) {
    if (err) {
      return next(err);
    } else if (!farm) {
      return res.status(404).send({
        message: 'No Farm with that identifier has been found'
      });
    }
    req.farm = farm;
    next();
  });
};
