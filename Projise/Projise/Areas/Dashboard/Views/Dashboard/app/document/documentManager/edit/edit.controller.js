/**
 * @ngdoc object
 * @name ProjectEditController
 * @description Viewlogic for editing document metadata
 */
angular.module('projiSeApp')
    .controller('documentEditController', ['$scope', '$modalInstance', 'documentMeta', function($scope, $modalInstance, documentMeta) {
        'use strict';

        $scope.documentMeta = documentMeta;

        $scope.update = function() {
            $modalInstance.close($scope.documentMeta);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);
