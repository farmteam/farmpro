(function (app) {
  'use strict';

  app.registerModule('farms', ['core']);
})(ApplicationConfiguration);

ApplicationConfiguration.registerModule('farms.admin', ['core.admin']);
ApplicationConfiguration.registerModule('farms.admin.routes', ['core.admin.routes']);