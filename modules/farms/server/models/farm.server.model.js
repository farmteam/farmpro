'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Farm Schema
 */
var FarmSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Farm name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Farm', FarmSchema);
