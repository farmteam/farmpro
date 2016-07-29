'use strict';

describe('Articles E2E Tests:', function() {
  describe('Test Articles page', function() {
    it('Should not include new Articles', function() {
      browser.get('http://localhost:3000/#!/articles');
      expect(element.all(by.repeater('article in articles')).count()).toEqual(0);
    });
  });
});
