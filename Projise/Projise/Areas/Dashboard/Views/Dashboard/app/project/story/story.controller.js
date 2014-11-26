/**
 * @ngdoc object
 * @name  StoryController
 * @description Controller for view: My story
 */
angular.module('projiSeApp')
    .controller('StoryController', function($scope, Story, Task) {
        'use strict';

        $scope.filter = {
            sbStatus: 'not started'
        };

        $scope.Story = Story;
        $scope.Task = Task;
    });
