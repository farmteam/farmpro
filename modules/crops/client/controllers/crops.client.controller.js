(function () {
  'use strict';

  // Crops controller
  angular
    .module('crops')
    .controller('CropsController', CropsController);

  CropsController.$inject = ['$scope', '$state', 'Authentication', 'cropResolve'];

  function CropsController ($scope, $state, Authentication, crop) {
    var vm = this;

    vm.authentication = Authentication;
    vm.crop = crop;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Crop
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.crop.$remove($state.go('crops.list'));
      }
    }

    // Save Crop
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.cropForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.crop._id) {
        vm.crop.$update(successCallback, errorCallback);
      } else {
        vm.crop.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('crops.view', {
          cropId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
