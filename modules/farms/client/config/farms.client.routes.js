(function () {
  'use strict';

  angular
    .module('farms')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('farms', {
        abstract: true,
        url: '/farms',
        template: '<ui-view/>'
      })
      .state('farms.list', {
        url: '',
        templateUrl: 'modules/farms/client/views/list-farms.client.view.html',
        controller: 'FarmsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Farms List'
        }
      })
      .state('farms.create', {
        url: '/create',
        templateUrl: 'modules/farms/client/views/form-farm.client.view.html',
        controller: 'FarmsController',
        controllerAs: 'vm',
        resolve: {
          farmResolve: newFarm
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Farms Create'
        }
      })
      .state('farms.edit', {
        url: '/:farmId/edit',
        templateUrl: 'modules/farms/client/views/form-farm.client.view.html',
        controller: 'FarmsController',
        controllerAs: 'vm',
        resolve: {
          farmResolve: getFarm
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Farm {{ farmResolve.name }}'
        }
      })
      .state('farms.view', {
        url: '/:farmId',
        templateUrl: 'modules/farms/client/views/view-farm.client.view.html',
        controller: 'FarmsController',
        controllerAs: 'vm',
        resolve: {
          farmResolve: getFarm
        },
        data:{
          pageTitle: 'Farm {{ articleResolve.name }}'
        }
      });
  }

  getFarm.$inject = ['$stateParams', 'FarmsService'];

  function getFarm($stateParams, FarmsService) {
    return FarmsService.get({
      farmId: $stateParams.farmId
    }).$promise;
  }

  newFarm.$inject = ['FarmsService'];

  function newFarm(FarmsService) {
    return new FarmsService();
  }
})();
