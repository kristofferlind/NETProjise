angular.module('projiSeApp').factory('SyncManager', ['$http', function ($http) {
    'use strict';

    var SyncManager = {
        sync: function () {
            var toBeSynced = angular.fromJson(localStorage['toBeSynced']);
            if (toBeSynced) {
                toBeSynced.forEach(function (item) {
                    delete item.data.notSynced;
                    switch (item.method) {
                        case 'POST':
                            $http.post(item.url, item.data)
                            break;
                        case 'PUT':
                            $http.put(item.url, item.data)
                            break;
                    }
                })
                localStorage.removeItem('toBeSynced');
            }
        }
    }

    return SyncManager;
}])