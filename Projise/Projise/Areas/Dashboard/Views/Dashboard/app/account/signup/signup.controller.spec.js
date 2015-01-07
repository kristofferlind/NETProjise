xdescribe('Controller: SignupCtrl', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var q, d,
        SignupCtrl,
        scope,
        Auth = {
            createUser: function() {
                d = q.defer();
                d.resolve();
                return d.promise;
            }
        };

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        SignupCtrl = $controller('SignupCtrl', {
            $scope: scope,
            Auth: Auth
        });
    }));

    it('should call Auth.createUser on register', function () {
        spyOn(Auth, 'createUser').and.callThrough();

        var form = {
            $valid: true
        };

        scope.user = {
            name: 'name',
            email: 'email',
            password: 'password'
        };

        scope.register(form);
        expect(Auth.createUser).toHaveBeenCalledWith(scope.user);
    });
});
