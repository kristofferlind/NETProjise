'use strict';
/**
 * @ngdoc object
 * @name SignupCtrl
 * @requires  $scope
 * @requires  Auth
 * @requires  $location
 * @requires  $window
 * @description Controller for signup view
 */
angular.module('projiSeApp')
    .controller('SignupCtrl', function($scope, Auth, $location, $window) {
        $scope.user = {};
        $scope.errors = {};

        /**
         * @ngdoc function
         * @name  $scope.register
         * @description  Viewlogic for registering a new user
         */
        $scope.register = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.createUser({
                    name: $scope.user.name,
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .then(function() {
                        // Account created, redirect to home
                        $location.path('/');
                    })
                    .catch(function(err) {
                        err = err.data;
                        $scope.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, function(error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.errors[field] = error.message;
                        });
                    });
            }
        };

        /**
         * @ngdoc function
         * @name  $scope.loginOauth
         * @description  Viewlogic for logging in using oauth
         */
        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
