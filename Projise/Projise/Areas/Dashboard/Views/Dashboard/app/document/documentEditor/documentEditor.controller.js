/**
 * @ngdoc object
 * @name DocumentEditorController
 * @todo  should work better for multiple users (operational transformation)
 * @description Viewlogic for document editor
 */
angular.module('projiSeApp').controller('DocumentEditorController', ['$scope', 'DocumentManager', function($scope, DocumentManager) {
    'use strict';

    //Make DocumentManager service available in view
    $scope.DocumentManager = DocumentManager;
}]);
