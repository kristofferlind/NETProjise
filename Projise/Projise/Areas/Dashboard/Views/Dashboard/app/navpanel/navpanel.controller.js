/**
 * @ngdoc object
 * @name  NavpanelController
 * @description  Viewlogic for navpanel (menu in left sidebar)
 */
angular.module('projiSeApp').controller('NavpanelController', ['$scope', 'PanelSwitch', 'Auth', '$timeout', function($scope, PanelSwitch, Auth, $timeout) {
    'use strict';

    $scope.Auth = Auth;

    $scope.navpanelActive = PanelSwitch.navpanel.get();

    $scope.$on('navpanel:switched', function() {
        if ($scope.navpanelActive !== PanelSwitch.navpanel.get()) {
            $timeout(function() {
                $scope.navpanelActive = PanelSwitch.navpanel.get();
            });
        }
    });
}]);
