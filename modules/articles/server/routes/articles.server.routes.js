'use strict';

module.exports = function(app) {
  var articles = require('../controllers/articles.server.controller');
  var articlesPolicy = require('../policies/articles.server.policy');

  // Articles Routes
  app.route('/api/articles').all()
    .get(articles.list).all(articlesPolicy.isAllowed)
    .post(articles.create);

  app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
    .get(articles.read)
    .put(articles.update)
    .delete(articles.delete);

  // Finish by binding the Article middleware
  app.param('articleId', articles.articleByID);
};