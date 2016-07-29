'use strict';

describe('Crops E2E Tests:', function () {
  describe('Test Crops page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/crops');
      expect(element.all(by.repeater('crop in crops')).count()).toEqual(0);
    });
  });
});
