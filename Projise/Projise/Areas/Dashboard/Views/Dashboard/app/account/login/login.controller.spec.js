xdescribe('Controller: LoginCtrl', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var q, d,
        LoginCtrl,
        scope,
        Auth = {
            login: function() {
                d = q.defer();
                d.resolve();
                return d.promise;
            }
        };

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        LoginCtrl = $controller('LoginCtrl', {
            $scope: scope,
            Auth: Auth
        });
    }));

    it('should call Auth.login on login', function () {
        spyOn(Auth, 'login').and.callThrough();

        var form = {
            $valid: true
        };

        scope.user = {
            email: 'email',
            password: 'password'
        };

        scope.login(form);
        scope.$digest();
        expect(Auth.login).toHaveBeenCalledWith(scope.user);
    });
});

