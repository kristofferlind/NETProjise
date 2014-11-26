/**
 * @ngdoc object
 * @name  SprintController
 * @description Controller for view: plan sprint
 */
angular.module('projiSeApp')
    .controller('SprintController', function($scope, Story) {
        'use strict';

        $scope.filter = {
            status: ''
        };

        $scope.Story = Story;

    });
