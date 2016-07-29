(function () {
  'use strict';

  angular
    .module('farms')
    .controller('FarmsListController', FarmsListController);

  FarmsListController.$inject = ['FarmsService'];

  function FarmsListController(FarmsService) {
    var vm = this;

    vm.farms = FarmsService.query();
  }
})();
