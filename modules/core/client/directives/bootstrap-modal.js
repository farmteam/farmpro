'use strict';

/**
 * Created by keithics
 */


angular.module('core').directive('alertui', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      message: '=message'
    },
    templateUrl: 'modules/core/client/directives/alert.html',
    link: function($scope, element, attrs) {
      $scope.getIcon = function(type) {
        var icon = {
          danger: 'ban',
          info : 'info',
          warning: 'warning',
          success: 'check'
        };
        return icon[type];
      };

      $scope.close = function() {
        $scope.message = null;
      };
    }
  };
});