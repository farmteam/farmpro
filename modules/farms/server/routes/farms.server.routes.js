'use strict';

/**
 * Module dependencies
 */
var farmsPolicy = require('../policies/farms.server.policy'),
  farms = require('../controllers/farms.server.controller');
  

module.exports = function(app) {
  // Farms Routes
  app.route('/api/farms').all(farmsPolicy.isAllowed)
    .get(farms.list)
    .post(farms.create);

  app.route('/api/farms/:farmId').all(farmsPolicy.isAllowed)
    .get(farms.read)
    .put(farms.update)
    .delete(farms.delete);

  // Finish by binding the Farm middleware
  app.param('farmId', farms.farmByID);
  
};
