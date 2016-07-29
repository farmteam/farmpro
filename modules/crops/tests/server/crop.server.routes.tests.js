'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Crop = mongoose.model('Crop'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, crop;

/**
 * Crop routes tests
 */
describe('Crop CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Crop
    user.save(function () {
      crop = {
        name: 'Crop name'
      };

      done();
    });
  });

  it('should be able to save a Crop if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Crop
        agent.post('/api/crops')
          .send(crop)
          .expect(200)
          .end(function (cropSaveErr, cropSaveRes) {
            // Handle Crop save error
            if (cropSaveErr) {
              return done(cropSaveErr);
            }

            // Get a list of Crops
            agent.get('/api/crops')
              .end(function (cropsGetErr, cropsGetRes) {
                // Handle Crop save error
                if (cropsGetErr) {
                  return done(cropsGetErr);
                }

                // Get Crops list
                var crops = cropsGetRes.body;

                // Set assertions
                (crops[0].user._id).should.equal(userId);
                (crops[0].name).should.match('Crop name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Crop if not logged in', function (done) {
    agent.post('/api/crops')
      .send(crop)
      .expect(403)
      .end(function (cropSaveErr, cropSaveRes) {
        // Call the assertion callback
        done(cropSaveErr);
      });
  });

  it('should not be able to save an Crop if no name is provided', function (done) {
    // Invalidate name field
    crop.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Crop
        agent.post('/api/crops')
          .send(crop)
          .expect(400)
          .end(function (cropSaveErr, cropSaveRes) {
            // Set message assertion
            (cropSaveRes.body.message).should.match('Please fill Crop name');

            // Handle Crop save error
            done(cropSaveErr);
          });
      });
  });

  it('should be able to update an Crop if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Crop
        agent.post('/api/crops')
          .send(crop)
          .expect(200)
          .end(function (cropSaveErr, cropSaveRes) {
            // Handle Crop save error
            if (cropSaveErr) {
              return done(cropSaveErr);
            }

            // Update Crop name
            crop.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Crop
            agent.put('/api/crops/' + cropSaveRes.body._id)
              .send(crop)
              .expect(200)
              .end(function (cropUpdateErr, cropUpdateRes) {
                // Handle Crop update error
                if (cropUpdateErr) {
                  return done(cropUpdateErr);
                }

                // Set assertions
                (cropUpdateRes.body._id).should.equal(cropSaveRes.body._id);
                (cropUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Crops if not signed in', function (done) {
    // Create new Crop model instance
    var cropObj = new Crop(crop);

    // Save the crop
    cropObj.save(function () {
      // Request Crops
      request(app).get('/api/crops')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Crop if not signed in', function (done) {
    // Create new Crop model instance
    var cropObj = new Crop(crop);

    // Save the Crop
    cropObj.save(function () {
      request(app).get('/api/crops/' + cropObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', crop.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Crop with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/crops/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Crop is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Crop which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Crop
    request(app).get('/api/crops/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Crop with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Crop if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Crop
        agent.post('/api/crops')
          .send(crop)
          .expect(200)
          .end(function (cropSaveErr, cropSaveRes) {
            // Handle Crop save error
            if (cropSaveErr) {
              return done(cropSaveErr);
            }

            // Delete an existing Crop
            agent.delete('/api/crops/' + cropSaveRes.body._id)
              .send(crop)
              .expect(200)
              .end(function (cropDeleteErr, cropDeleteRes) {
                // Handle crop error error
                if (cropDeleteErr) {
                  return done(cropDeleteErr);
                }

                // Set assertions
                (cropDeleteRes.body._id).should.equal(cropSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Crop if not signed in', function (done) {
    // Set Crop user
    crop.user = user;

    // Create new Crop model instance
    var cropObj = new Crop(crop);

    // Save the Crop
    cropObj.save(function () {
      // Try deleting Crop
      request(app).delete('/api/crops/' + cropObj._id)
        .expect(403)
        .end(function (cropDeleteErr, cropDeleteRes) {
          // Set message assertion
          (cropDeleteRes.body.message).should.match('User is not authorized');

          // Handle Crop error error
          done(cropDeleteErr);
        });

    });
  });

  it('should be able to get a single Crop that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Crop
          agent.post('/api/crops')
            .send(crop)
            .expect(200)
            .end(function (cropSaveErr, cropSaveRes) {
              // Handle Crop save error
              if (cropSaveErr) {
                return done(cropSaveErr);
              }

              // Set assertions on new Crop
              (cropSaveRes.body.name).should.equal(crop.name);
              should.exist(cropSaveRes.body.user);
              should.equal(cropSaveRes.body.user._id, orphanId);

              // force the Crop to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Crop
                    agent.get('/api/crops/' + cropSaveRes.body._id)
                      .expect(200)
                      .end(function (cropInfoErr, cropInfoRes) {
                        // Handle Crop error
                        if (cropInfoErr) {
                          return done(cropInfoErr);
                        }

                        // Set assertions
                        (cropInfoRes.body._id).should.equal(cropSaveRes.body._id);
                        (cropInfoRes.body.name).should.equal(crop.name);
                        should.equal(cropInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Crop.remove().exec(done);
    });
  });
});
