'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope , Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    // If user is signed in then redirect back home
    if (!$scope.authentication.user) {
      window.location = '/signup';
    }

  }
]);
