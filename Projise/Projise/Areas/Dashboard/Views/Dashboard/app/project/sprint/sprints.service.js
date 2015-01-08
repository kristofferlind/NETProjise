/**
 * @ngdoc service
 * @name  Sprint
 * @required $http
 * @required $modal
 * @required SprintProvider
 * @description Service for managing sprints
 */
angular.module('projiSeApp').factory('Sprint', ['$http', '$modal', 'SprintProvider', '$rootScope', 'Notify', '$q', '$state', '$location', function($http, $modal, SprintProvider, $rootScope, Notify, $q, $state, $location) {
    'use strict';

    var _sprints = SprintProvider.sprints, _activeSprint,
        Sprint = {
            setActiveSprint: function () {
                var deferred = $q.defer();
                var now = new Date().getTime();
                var found = false;

                _sprints.forEach(function (sprint) {
                    var start = new Date(sprint.start),
                        end = new Date(sprint.end)

                    //Set starting time to 00:00:00
                    start.setHours(0);
                    start.setMinutes(0);
                    start.setSeconds(0);

                    //Set ending time to 23:59:59
                    end.setHours(23);
                    end.setMinutes(59);
                    end.setSeconds(59);

                    //Convert dates to ms since 1970
                    start = start.getTime();
                    end = end.getTime();

                    if (now > start && now < end) {
                        found = true;
                        Sprint.activeSprintId = sprint._id;
                        _activeSprint = sprint;
                        deferred.resolve();
                    }
                });
                if (!found) {
                    Notify.warning('Could not find active sprint, please create one.');
                    deferred.reject();
                    //$state.go('dashboard.project.project');
                    //$location.path('/project');
                    //document.location.href = '/dashboard/#/project';
                }
                return deferred.promise;
            },
            /**
             * @ngdoc method
             * @name  activeSprint
             * @returns {object} Current sprint based on date
             * @description Figures out which sprint is active based on date and returns it
             */
            activeSprint: function () {
                Sprint.setActiveSprint().then(function () {
                    return _activeSprint;
                });
            },
            /**
             * @ngdoc property
             * @name  activeSprintId
             * @type {Object}
             * @description Currently active sprintId
             */
            activeSprintId: {},
            /**
             * @ngdoc method
             * @name  all
             * @return {Array}
             * @description  Returns all sprints in project
             */
            all: function() {
                return _sprints;
            },
            /**
             * @ngdoc method
             * @name  create
             * @description Create sprint using modal for user input
             */
            create: function() {
                //Open modal for user input
                var createModal = $modal.open({
                    templateUrl: 'Areas/Dashboard/Views/Dashboard/app/project/sprint/create/create.html',
                    controller: 'sprintCreateController'
                });

                //Send to backend on submit
                createModal.result.then(function(sprint) {
                    $http.post('/api/sprints', sprint);
                });
            },
            /**
             * @ngdoc method
             * @name  delete
             * @param {Object} sprint Sprint object
             * @description Delete project
             */
            delete: function(sprint) {
                $http.delete('/api/sprints/' + sprint._id);
            },
            // find: function() {},
            /**
             * @ngdoc method
             * @name  update
             * @param {Object} sprint Sprint object
             * @description Update sprint using modal for user input
             */
            update: function(sprint) {
                //Open modal for user input
                var editModal = $modal.open({
                    templateUrl: 'Areas/Dashboard/Views/Dashboard/app/project/sprint/edit/edit.html',
                    controller: 'sprintEditController',
                    resolve: {
                        sprint: function() {
                            return sprint;
                        }
                    }
                });

                //Send to backend on submit
                editModal.result.then(function(sprint) {
                    $http.put('/api/sprints/' + sprint._id, sprint);
                });
            }
        };

    //Sprint.setActiveSprint();

    $rootScope.$on('sprints:updated', Sprint.setActiveSPrint);

    return Sprint;
}]);
