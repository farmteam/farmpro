'use strict';

// Configuring the Articles module
angular.module('farms.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Trang trại',
      state: 'admin.farms'
    });
    
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Sản phẩm',
      state: 'admin.products'
    });

    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Mùa vụ',
      state: 'admin.crops'
    });        
  }
]);
