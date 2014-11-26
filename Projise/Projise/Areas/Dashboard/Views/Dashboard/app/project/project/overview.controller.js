/**
 * @ngdoc object
 * @name  OverviewController
 * @description Controller for Project overview page
 */
angular.module('projiSeApp')
    .controller('OverviewController', function($scope, Idea) {
        'use strict';

        //Make Idea service available in the view
        $scope.Idea = Idea;
    });
