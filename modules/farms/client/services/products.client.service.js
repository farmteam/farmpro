//Products service used to communicate Farms REST endpoints
(function () {
  'use strict';

  angular
    .module('farms')
    .factory('ProductsService', ProductsService);

  ProductsService.$inject = ['$resource'];

  function ProductsService($resource) {
    return $resource('api/products/:productId', {
      productId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
  
  angular.module('farms.admin').factory('Admin', ['$resource',
    function ($resource) {
      return $resource('api/products/:productId', {
        userId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
  ]);
   
})();
