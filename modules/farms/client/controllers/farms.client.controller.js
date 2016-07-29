(function () {
  'use strict';

  // Farms controller
  angular
    .module('farms')
    .controller('FarmsController', FarmsController);

  FarmsController.$inject = ['$scope', '$state', 'Authentication', 'farmResolve'];

  function FarmsController ($scope, $state, Authentication, farm) {
    var vm = this;

    vm.authentication = Authentication;
    vm.farm = farm;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Farm
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.farm.$remove($state.go('farms.list'));
      }
    }

    // Save Farm
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.farmForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.farm._id) {
        vm.farm.$update(successCallback, errorCallback);
      } else {
        vm.farm.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('farms.view', {
          farmId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
