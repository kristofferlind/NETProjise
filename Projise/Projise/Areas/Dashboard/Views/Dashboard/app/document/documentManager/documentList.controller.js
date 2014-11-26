/**
 * @ngdoc object
 * @name DocumentListController
 * @description Viewlogic for managing documents
 */
angular.module('projiSeApp').controller('DocumentListController', function($scope, DocumentManager) {
    'use strict';

    //Make DocumentManager service available in view
    $scope.DocumentManager = DocumentManager;
});
