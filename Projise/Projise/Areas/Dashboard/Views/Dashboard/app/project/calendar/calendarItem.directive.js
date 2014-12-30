angular.module('projiSeApp').directive('calendarItem', function () {
    'use strict';

    return {
        scope: {
            event: '=ngModel'
        },
        templateUrl: 'Areas/Dashboard/Views/Dashboard/app/project/calendar/calendarItem.partial.html',
        replace: true,
        link: function ($scope) {
            var event = $scope.event,
                date;

            if (event.isFullDay) {
                var eventDate = new Date(event.date);

                date = eventDate.toDateString();
            } else {
                var start = new Date(event.start),
                    end = new Date(event.end);

                date = start.toDateString() + ': ' + start.toTimeString().substr(0, 8) + ' - ' + end.toTimeString().substr(0, 8);
            }

            $scope.event.date = date;
        }
    }
})