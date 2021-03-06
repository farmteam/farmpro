'use strict';

//Articles service used to communicate Articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
  function($resource) {
    return $resource('api/articles/:articleId', { articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);