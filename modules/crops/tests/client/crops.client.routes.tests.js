(function () {
  'use strict';

  describe('Crops Route Tests', function () {
    // Initialize global variables
    var $scope,
      CropsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CropsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CropsService = _CropsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('crops');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/crops');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          CropsController,
          mockCrop;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('crops.view');
          $templateCache.put('modules/crops/client/views/view-crop.client.view.html', '');

          // create mock Crop
          mockCrop = new CropsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Crop Name'
          });

          //Initialize Controller
          CropsController = $controller('CropsController as vm', {
            $scope: $scope,
            cropResolve: mockCrop
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:cropId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.cropResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            cropId: 1
          })).toEqual('/crops/1');
        }));

        it('should attach an Crop to the controller scope', function () {
          expect($scope.vm.crop._id).toBe(mockCrop._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/crops/client/views/view-crop.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CropsController,
          mockCrop;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('crops.create');
          $templateCache.put('modules/crops/client/views/form-crop.client.view.html', '');

          // create mock Crop
          mockCrop = new CropsService();

          //Initialize Controller
          CropsController = $controller('CropsController as vm', {
            $scope: $scope,
            cropResolve: mockCrop
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.cropResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/crops/create');
        }));

        it('should attach an Crop to the controller scope', function () {
          expect($scope.vm.crop._id).toBe(mockCrop._id);
          expect($scope.vm.crop._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/crops/client/views/form-crop.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CropsController,
          mockCrop;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('crops.edit');
          $templateCache.put('modules/crops/client/views/form-crop.client.view.html', '');

          // create mock Crop
          mockCrop = new CropsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Crop Name'
          });

          //Initialize Controller
          CropsController = $controller('CropsController as vm', {
            $scope: $scope,
            cropResolve: mockCrop
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:cropId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.cropResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            cropId: 1
          })).toEqual('/crops/1/edit');
        }));

        it('should attach an Crop to the controller scope', function () {
          expect($scope.vm.crop._id).toBe(mockCrop._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/crops/client/views/form-crop.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
