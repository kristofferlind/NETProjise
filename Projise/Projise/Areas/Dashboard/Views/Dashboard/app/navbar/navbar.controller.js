/**
 * @ngdoc object
 * @name  NavbarController
 * @description  Viewlogic for Navbar
 */
angular.module('projiSeApp')
    .controller('NavbarController', function($scope, $location, Auth, PanelSwitch, Project) {
    'use strict';

    $scope.Project = Project;

    $scope.navpanelSwitch = function() {
        PanelSwitch.navpanel.switch();
    };

    $scope.chatpanelSwitch = function() {
        PanelSwitch.chatpanel.switch();
    };

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
        Auth.logout();
        $location.path('/login');
    };

    $scope.isActive = function(route) {
        return route === $location.path();
    };
});
