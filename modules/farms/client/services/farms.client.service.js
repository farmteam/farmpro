//Farms service used to communicate Farms REST endpoints
(function () {
  'use strict';

  angular
    .module('farms')
    .factory('FarmsService', FarmsService);

  FarmsService.$inject = ['$resource'];

  function FarmsService($resource) {
    return $resource('api/farms/:farmId', {
      farmId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
