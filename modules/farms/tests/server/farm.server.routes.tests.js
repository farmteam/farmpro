'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Farm = mongoose.model('Farm'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, farm;

/**
 * Farm routes tests
 */
describe('Farm CRUD tests', function () {

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

    // Save a user to the test db and create new Farm
    user.save(function () {
      farm = {
        name: 'Farm name'
      };

      done();
    });
  });

  it('should be able to save a Farm if logged in', function (done) {
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

        // Save a new Farm
        agent.post('/api/farms')
          .send(farm)
          .expect(200)
          .end(function (farmSaveErr, farmSaveRes) {
            // Handle Farm save error
            if (farmSaveErr) {
              return done(farmSaveErr);
            }

            // Get a list of Farms
            agent.get('/api/farms')
              .end(function (farmsGetErr, farmsGetRes) {
                // Handle Farm save error
                if (farmsGetErr) {
                  return done(farmsGetErr);
                }

                // Get Farms list
                var farms = farmsGetRes.body;

                // Set assertions
                (farms[0].user._id).should.equal(userId);
                (farms[0].name).should.match('Farm name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Farm if not logged in', function (done) {
    agent.post('/api/farms')
      .send(farm)
      .expect(403)
      .end(function (farmSaveErr, farmSaveRes) {
        // Call the assertion callback
        done(farmSaveErr);
      });
  });

  it('should not be able to save an Farm if no name is provided', function (done) {
    // Invalidate name field
    farm.name = '';

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

        // Save a new Farm
        agent.post('/api/farms')
          .send(farm)
          .expect(400)
          .end(function (farmSaveErr, farmSaveRes) {
            // Set message assertion
            (farmSaveRes.body.message).should.match('Please fill Farm name');

            // Handle Farm save error
            done(farmSaveErr);
          });
      });
  });

  it('should be able to update an Farm if signed in', function (done) {
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

        // Save a new Farm
        agent.post('/api/farms')
          .send(farm)
          .expect(200)
          .end(function (farmSaveErr, farmSaveRes) {
            // Handle Farm save error
            if (farmSaveErr) {
              return done(farmSaveErr);
            }

            // Update Farm name
            farm.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Farm
            agent.put('/api/farms/' + farmSaveRes.body._id)
              .send(farm)
              .expect(200)
              .end(function (farmUpdateErr, farmUpdateRes) {
                // Handle Farm update error
                if (farmUpdateErr) {
                  return done(farmUpdateErr);
                }

                // Set assertions
                (farmUpdateRes.body._id).should.equal(farmSaveRes.body._id);
                (farmUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Farms if not signed in', function (done) {
    // Create new Farm model instance
    var farmObj = new Farm(farm);

    // Save the farm
    farmObj.save(function () {
      // Request Farms
      request(app).get('/api/farms')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Farm if not signed in', function (done) {
    // Create new Farm model instance
    var farmObj = new Farm(farm);

    // Save the Farm
    farmObj.save(function () {
      request(app).get('/api/farms/' + farmObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', farm.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Farm with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/farms/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Farm is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Farm which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Farm
    request(app).get('/api/farms/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Farm with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Farm if signed in', function (done) {
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

        // Save a new Farm
        agent.post('/api/farms')
          .send(farm)
          .expect(200)
          .end(function (farmSaveErr, farmSaveRes) {
            // Handle Farm save error
            if (farmSaveErr) {
              return done(farmSaveErr);
            }

            // Delete an existing Farm
            agent.delete('/api/farms/' + farmSaveRes.body._id)
              .send(farm)
              .expect(200)
              .end(function (farmDeleteErr, farmDeleteRes) {
                // Handle farm error error
                if (farmDeleteErr) {
                  return done(farmDeleteErr);
                }

                // Set assertions
                (farmDeleteRes.body._id).should.equal(farmSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Farm if not signed in', function (done) {
    // Set Farm user
    farm.user = user;

    // Create new Farm model instance
    var farmObj = new Farm(farm);

    // Save the Farm
    farmObj.save(function () {
      // Try deleting Farm
      request(app).delete('/api/farms/' + farmObj._id)
        .expect(403)
        .end(function (farmDeleteErr, farmDeleteRes) {
          // Set message assertion
          (farmDeleteRes.body.message).should.match('User is not authorized');

          // Handle Farm error error
          done(farmDeleteErr);
        });

    });
  });

  it('should be able to get a single Farm that has an orphaned user reference', function (done) {
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

          // Save a new Farm
          agent.post('/api/farms')
            .send(farm)
            .expect(200)
            .end(function (farmSaveErr, farmSaveRes) {
              // Handle Farm save error
              if (farmSaveErr) {
                return done(farmSaveErr);
              }

              // Set assertions on new Farm
              (farmSaveRes.body.name).should.equal(farm.name);
              should.exist(farmSaveRes.body.user);
              should.equal(farmSaveRes.body.user._id, orphanId);

              // force the Farm to have an orphaned user reference
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

                    // Get the Farm
                    agent.get('/api/farms/' + farmSaveRes.body._id)
                      .expect(200)
                      .end(function (farmInfoErr, farmInfoRes) {
                        // Handle Farm error
                        if (farmInfoErr) {
                          return done(farmInfoErr);
                        }

                        // Set assertions
                        (farmInfoRes.body._id).should.equal(farmSaveRes.body._id);
                        (farmInfoRes.body.name).should.equal(farm.name);
                        should.equal(farmInfoRes.body.user, undefined);

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
      Farm.remove().exec(done);
    });
  });
});
