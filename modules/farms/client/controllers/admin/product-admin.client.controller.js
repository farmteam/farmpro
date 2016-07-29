'use strict';

angular.module('farms').controller('ProductController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProductsService','$uibModal',
  function($scope, $stateParams, $location, Authentication, ProductsService,$uibModal) {
    $scope.authentication = Authentication;
    modalController($scope,$uibModal);
    
    // Create new product
    $scope.create = function() {
      var product = new ProductsService (this);

      // Redirect after save
      product.$save(function(response) {
        $location.path('products');
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing product
    $scope.remove = function(product) {
      if (product) { product.$remove();

        for (var i in $scope.products) {
          if ($scope.products [i] === product) {
            $scope.products.splice(i, 1);
          }
        }
      } else {
        $scope.product.$remove(function() {
          $location.path('products');
        });
      }
    };

    // Update existing product
    $scope.update = function() {
      var product = $scope.product ;

      product.$update(function() {
        $location.path('products');
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of product
    $scope.find = function() {
      $scope.products = ProductsService.query();
    };

    // Find existing Article
    $scope.findOne = function() {
      $scope.product = ProductsService.get({
        productId: $stateParams.productId
      });
    };
  }
]);