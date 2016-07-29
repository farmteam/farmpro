'use strict';

// Setting up route
angular.module('farms.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.products', {
        url: '/products',
        templateUrl: 'modules/farms/client/views/admin/list-product.client.view.html',
        controller: 'ProductsListController'
      }).
      state('admin.productscreate', {
        url: '/createProduct',
        templateUrl: 'modules/farms/client/views/admin/create-product.client.view.html',
        controller: 'ProductController'
      });/*.
      state('articles.edit', {
        url: '/:articleId/edit',
        templateUrl: 'modules/articles/client/views/edit-article.client.view.html'
      });*/
/*      
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      });
*/      
  }
]);
