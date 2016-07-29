'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Crop Schema
 */
var CropSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Crop name',
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

mongoose.model('Crop', CropSchema);
