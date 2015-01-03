/**
 * @ngdoc object
 * @name  DocumentCreateController
 * @description  Viewlogic for creating documents
 */
angular.module('projiSeApp')
    .controller('documentCreateController', ['$scope', '$modalInstance', function($scope, $modalInstance) {
        'use strict';

        $scope.documentMeta = {};

        $scope.create = function() {
            $modalInstance.close($scope.documentMeta);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);
