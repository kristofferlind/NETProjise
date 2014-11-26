describe('Service: Auth', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    beforeEach(module(function($provide) {
        $provide.value('$cookieStore', mockCookieStore);
    }));

    var Auth, $httpBackend,
        user = {
            email: 'email',
            password: 'password'
        },
        loggedInUser = {
            email: 'email',
            password: 'password',
            role: 'admin'
        },
        cb = function() {},
        mockCookieStore = {
            get: function(key) {
                return key;
            },
            put: function() {},
            remove: function() {}
        },
        data = {
                token: 'token'
            };

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_Auth_, _$httpBackend_) {
        Auth = _Auth_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('/api/users/me').respond(200, loggedInUser);
    }));

    it('should be defined', function() {
        expect(Auth).toBeDefined();
    });

    describe('Method: login', function() {
        it('should return error on fail', function(done) {
            $httpBackend.expectPOST('/auth/local', user).respond(500);
            var correct;
            Auth.login(user).then(function() {
                correct = false;
            }).catch(function() {
                correct = true;
            }).finally(function() {
                expect(correct).toBe(true);
                done();
            });
            $httpBackend.flush();
        });

        it('should return data on success', function(done) {
            $httpBackend.expectPOST('/auth/local', user).respond(200, data);
            var correct;
            Auth.login(user, cb).then(function() {
                correct = true;
            }).catch(function() {
                correct = false;
            }).finally(function() {
                expect(correct).toBe(true);
                done();
            });
            $httpBackend.flush();
        });
    });

    describe('Method: createUser', function() {
        it('should handle failure', function() {
            $httpBackend.expectPOST('/api/users', user).respond(500);
            spyOn(Auth, 'logout');
            Auth.createUser(user);
            $httpBackend.flush();
            expect(Auth.logout).toHaveBeenCalled();
        });

        it('should handle success', function() {
            $httpBackend.expectPOST('/api/users', user).respond(200);
            spyOn(mockCookieStore, 'put');
            Auth.createUser(user);
            $httpBackend.flush();
            expect(mockCookieStore.put).toHaveBeenCalled();
        });
    });

    describe('Method: changePassword', function() {
        it('should handle failure', function() {
            $httpBackend.expectPUT('/api/users/password', {oldPassword: 'pass', newPassword: 'pass'}).respond(500);
            Auth.changePassword('pass', 'pass');
            $httpBackend.flush();
        });

        it('should handle success', function() {
            $httpBackend.expectPUT('/api/users/password', {oldPassword: 'pass', newPassword: 'pass'}).respond(200);
            Auth.changePassword('pass', 'pass', cb);
            $httpBackend.flush();
        });
    });

    describe('Method: getCurrentUser', function() {
        it('should return current user', function() {
            $httpBackend.expectPOST('/auth/local', user).respond(200, data);
            Auth.login(user);
            $httpBackend.flush();
            expect(Auth.getCurrentUser().email).toEqual(loggedInUser.email);
        });
    });

    describe('Method: isLoggedIn', function() {
        it('should return false when not logged in', function() {
            expect(Auth.isLoggedIn()).toBe(false);
        });

        it('should return true when logged in', function() {
            $httpBackend.expectPOST('/auth/local', user).respond(200, data);
            Auth.login(user);
            $httpBackend.flush();
            expect(Auth.isLoggedIn()).toBe(true);
        });
    });

    describe('Method: isLoggedInAsync', function() {
        it('should return false when not logged in', function(done) {
            Auth.logout();
            Auth.isLoggedInAsync(function(loggedIn) {
                expect(loggedIn).toBe(false);
                done();
            });
        });

        it('should return true when logged in', function(done) {
            $httpBackend.expectPOST('/auth/local', user).respond(200, data);
            Auth.login(user);
            Auth.isLoggedInAsync(function(loggedIn) {
                expect(loggedIn).toBe(true);
                done();
            });
            $httpBackend.flush();
        });
    });

    describe('Method: isAdmin', function() {
        it('should return true when logged in', function() {
            $httpBackend.expectPOST('/auth/local', user).respond(200, data);
            Auth.login(user);
            $httpBackend.flush();
            expect(Auth.isAdmin()).toBe(true);
        });
    });

    describe('Method: getToken', function() {
        it('should return token', function() {
            expect(Auth.getToken()).toEqual('token');
        });
    });
});
