/**
 * @ngdoc object
 * @name  StoryEditController
 * @description Handles modal for editing stories
 */
angular.module('projiSeApp')
    .controller('storyEditController', ['$scope', '$modalInstance', 'story', function($scope, $modalInstance, story) {
        'use strict';

        $scope.story = story;

        $scope.update = function() {
            $modalInstance.close($scope.story);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);
