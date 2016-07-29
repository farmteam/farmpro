'use strict';
var modalInstanceCtrl = function ($scope, $uibModalInstance, item,index) {
  $scope.ok = function () {
    $uibModalInstance.close(item,index);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};


var modalController = function ($scope, $uibModalInstance) {

  $scope.openModal = function (item,index) {
    var modalInstance = $uibModalInstance.open({
      templateUrl: '/modules/core/client/views/modal.client.view.html',
      controller: modalInstanceCtrl,
      size: 'sm',
      resolve: {
        item: function () {
          return item;
        },
        index: function () {
          return index;
        }
      }

    });

    modalInstance.result.then(function (selectedItem) {
      $scope.remove(selectedItem,index);
    }, function () {

    });
  };


};

