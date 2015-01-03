/**
 * @ngdoc object
 * @name  OverviewController
 * @description Controller for Project overview page
 */
angular.module('projiSeApp')
    .controller('OverviewController', ['$scope', 'Idea', 'Calendar', function($scope, Idea, Calendar) {
        'use strict';

        //Make Idea service available in the view
        $scope.Idea = Idea;

        $scope.Calendar = Calendar;
    }]);
