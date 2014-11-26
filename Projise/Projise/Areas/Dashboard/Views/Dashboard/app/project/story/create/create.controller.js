/**
 * @ngdoc object
 * @name  StoryCreateController
 * @description Handles modal for creating stories
 */
angular.module('projiSeApp')
    .controller('storyCreateController', function($scope, $modalInstance) {
        'use strict';

        $scope.story = {};

        $scope.create = function() {
            $modalInstance.close($scope.story);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
