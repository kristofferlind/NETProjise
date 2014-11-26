/**
 * @ngdoc object
 * @name  ProjectController
 * @description Controller for Plan project view
 */
angular.module('projiSeApp')
    .controller('ProjectController', function($scope, Sprint, Story) {
        'use strict';

        //Make Sprint service available in view
        $scope.Sprint = Sprint;

        //Make Story service available in view
        $scope.Story = Story;

        $scope.filter = {
            pbStatus: 'not started'
        };
    });
