'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Farm Schema
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Farm name',
    trim: true
  },
  term: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Product', ProductSchema);
