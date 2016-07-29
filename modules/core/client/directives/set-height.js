'use strict';

/**
 * Created by keithics on 12/8/15.
 */


angular.module('core').directive('setHeight', function($window){
  return {
    link: function(scope, element, attrs){
      console.log($window.innerHeight);
      element.css('min-height', $window.innerHeight - 101+'px');
    }
  };
});