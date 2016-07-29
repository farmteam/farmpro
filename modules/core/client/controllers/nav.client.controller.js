'use strict';

angular.module('core').controller('NavController', ['$scope', '$state', 'Authentication', 'Menus', '$window','$location',
  function ($scope, $state, Authentication, Menus, $window,$location) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;


    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // nav toggle
    $scope.isTreeOpened = [];
    $scope.toggleTreeClass = function (id) {
      $scope.isTreeOpened[id] = $scope.isTreeOpened[id] === 'tree-active'? 'hidden':'tree-active';
    };



    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });


    $scope.toggleSidebar = function () {
      var body = angular.element(document.querySelector('body'));

      ////Enable sidebar push menu
      var screenSizes = {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
      };

      if ($window.innerWidth > (screenSizes.sm - 1)) {
        if (body.hasClass('sidebar-collapse')) {
          body.removeClass('sidebar-collapse');
        } else {
          body.addClass('sidebar-collapse');
        }
      }
      //Handle sidebar push menu for small screens
      else {
        if (body.hasClass('sidebar-open')) {
          body.removeClass('sidebar-open').removeClass('sidebar-collapse');
        } else {
          body.addClass('sidebar-open');
        }
      }

    };


  }
]);