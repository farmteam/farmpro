'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Farms Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/farms',
      permissions: '*'
    }, {
      resources: '/api/farms/:farmId',
      permissions: '*'
    }, {
      resources: '/api/products',
      permissions: '*'
    }, {
      resources: '/api/products/:productId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/farms',
      permissions: ['get', 'post']
    }, {
      resources: '/api/farms/:farmId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/farms',
      permissions: ['get']
    }, {
      resources: '/api/farms/:farmId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Farms Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Farm is being processed and the current user created it then allow any manipulation
  if (req.farm && req.user && req.farm.user && req.farm.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
