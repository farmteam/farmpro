(function () {
  'use strict';

  describe('Farms Route Tests', function () {
    // Initialize global variables
    var $scope,
      FarmsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _FarmsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      FarmsService = _FarmsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('farms');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/farms');
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
          FarmsController,
          mockFarm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('farms.view');
          $templateCache.put('modules/farms/client/views/view-farm.client.view.html', '');

          // create mock Farm
          mockFarm = new FarmsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Farm Name'
          });

          //Initialize Controller
          FarmsController = $controller('FarmsController as vm', {
            $scope: $scope,
            farmResolve: mockFarm
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:farmId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.farmResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            farmId: 1
          })).toEqual('/farms/1');
        }));

        it('should attach an Farm to the controller scope', function () {
          expect($scope.vm.farm._id).toBe(mockFarm._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/farms/client/views/view-farm.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          FarmsController,
          mockFarm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('farms.create');
          $templateCache.put('modules/farms/client/views/form-farm.client.view.html', '');

          // create mock Farm
          mockFarm = new FarmsService();

          //Initialize Controller
          FarmsController = $controller('FarmsController as vm', {
            $scope: $scope,
            farmResolve: mockFarm
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.farmResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/farms/create');
        }));

        it('should attach an Farm to the controller scope', function () {
          expect($scope.vm.farm._id).toBe(mockFarm._id);
          expect($scope.vm.farm._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/farms/client/views/form-farm.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          FarmsController,
          mockFarm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('farms.edit');
          $templateCache.put('modules/farms/client/views/form-farm.client.view.html', '');

          // create mock Farm
          mockFarm = new FarmsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Farm Name'
          });

          //Initialize Controller
          FarmsController = $controller('FarmsController as vm', {
            $scope: $scope,
            farmResolve: mockFarm
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:farmId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.farmResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            farmId: 1
          })).toEqual('/farms/1/edit');
        }));

        it('should attach an Farm to the controller scope', function () {
          expect($scope.vm.farm._id).toBe(mockFarm._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/farms/client/views/form-farm.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
