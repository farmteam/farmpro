//Crops service used to communicate Crops REST endpoints
(function () {
  'use strict';

  angular
    .module('crops')
    .factory('CropsService', CropsService);

  CropsService.$inject = ['$resource'];

  function CropsService($resource) {
    return $resource('api/crops/:cropId', {
      cropId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
