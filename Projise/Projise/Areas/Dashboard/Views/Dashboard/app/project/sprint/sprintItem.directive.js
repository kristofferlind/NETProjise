/**
 * @ngdoc directive
 * @name  sprintItem
 * @description Handles sprintitems, styling based on status and linking it to a partial
 */
angular.module('projiSeApp')

.directive('sprintItem', function() {
    'use strict';
    // Runs during compile
    return {
        scope: {
            sprint: '=ngModel'
        }, // {} = isolate, true = child, false/undefined = no change
        templateUrl: 'app/project/sprint/sprintItem.partial.html',
        replace: true,
        transclude: true,
        link: function($scope) {
            var status,
                sprint = $scope.sprint,
                start = new Date(sprint.start),
                end = new Date(sprint.end),
                now = new Date().getTime();

            //Set time of start to 00:00:00
            start.setHours(0);
            start.setMinutes(0);
            start.setSeconds(0);

            //Set time of end to 23:59:59
            end.setHours(23);
            end.setMinutes(59);
            end.setSeconds(59);

            //Convert date to milliseconds from 1970
            start = start.getTime();
            end = end.getTime();

            // If now is later than end
            if (now > end) {
                status = 'completed';
            }
            //If now is between start and end
            if (now > start && now < end) {
                status = 'in-progress';
            }
            //If now is before start
            if (now < start) {
                status = 'not-started';
            }

            //Apply status to sprint
            $scope.sprint.status = status;
        }
    };
});
