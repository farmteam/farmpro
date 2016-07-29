'use strict';

angular.module('core.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Quản trị hệ thống',
      state: 'admin',
      type: 'dropdown',
      roles: ['admin']
    });
  }
]);
