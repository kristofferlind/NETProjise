describe('Controller: SettingsCtrl', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var q, d,
        SettingsCtrl,
        scope,
        Auth = {
            changePassword: function() {
                d = q.defer();
                d.resolve();
                return d.promise;
            }
        };

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        SettingsCtrl = $controller('SettingsCtrl', {
            $scope: scope,
            Auth: Auth
        });
    }));

    it('should call Auth.changePassword on changePassword', function () {
        spyOn(Auth, 'changePassword').and.callThrough();

        var form = {
            $valid: true
        };

        scope.user = {
            newPassword: 'new',
            oldPassword: 'old'
        };

        scope.changePassword(form);
        expect(Auth.changePassword).toHaveBeenCalledWith(scope.user.oldPassword, scope.user.newPassword);
    });
});
