(function () {
  'use strict';

  angular
    .module('crops')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('crops', {
        abstract: true,
        url: '/crops',
        template: '<ui-view/>'
      })
      .state('crops.list', {
        url: '',
        templateUrl: 'modules/crops/client/views/list-crops.client.view.html',
        controller: 'CropsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Crops List'
        }
      })
      .state('crops.create', {
        url: '/create',
        templateUrl: 'modules/crops/client/views/form-crop.client.view.html',
        controller: 'CropsController',
        controllerAs: 'vm',
        resolve: {
          cropResolve: newCrop
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Crops Create'
        }
      })
      .state('crops.edit', {
        url: '/:cropId/edit',
        templateUrl: 'modules/crops/client/views/form-crop.client.view.html',
        controller: 'CropsController',
        controllerAs: 'vm',
        resolve: {
          cropResolve: getCrop
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Crop {{ cropResolve.name }}'
        }
      })
      .state('crops.view', {
        url: '/:cropId',
        templateUrl: 'modules/crops/client/views/view-crop.client.view.html',
        controller: 'CropsController',
        controllerAs: 'vm',
        resolve: {
          cropResolve: getCrop
        },
        data:{
          pageTitle: 'Crop {{ articleResolve.name }}'
        }
      });
  }

  getCrop.$inject = ['$stateParams', 'CropsService'];

  function getCrop($stateParams, CropsService) {
    return CropsService.get({
      cropId: $stateParams.cropId
    }).$promise;
  }

  newCrop.$inject = ['CropsService'];

  function newCrop(CropsService) {
    return new CropsService();
  }
})();
