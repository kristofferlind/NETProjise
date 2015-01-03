/**
 * @ngdoc object
 * @requires  $scope
 * @requires  DocumentManager
 * @description Viewlogic for viewing documents
 */
angular.module('projiSeApp').controller('DocumentViewerController', ['$scope', 'DocumentManager', function($scope, DocumentManager) {
    'use strict';

    //Make DocumentManager service available in view
    $scope.DocumentManager = DocumentManager;
}]);
