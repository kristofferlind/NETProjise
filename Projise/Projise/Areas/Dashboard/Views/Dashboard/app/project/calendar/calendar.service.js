﻿angular.module('projiSeApp').factory('Calendar', ['$http', function ($http) {
    'use strict';

    $http.get('api/events').success(function (events) {
        Calendar.all = angular.copy(events);
    })

    var Calendar = {
        all: []
    }

    return Calendar;
}])