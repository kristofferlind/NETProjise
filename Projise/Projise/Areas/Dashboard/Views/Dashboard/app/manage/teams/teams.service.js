/**
 * @ngdoc service
 * @name Team
 * @requires $http
 * @requires $rootScope
 * @requires TeamProvider
 * @requires Session
 * @requires $modal
 * @description Service for managing team data
 */
angular.module('projiSeApp').factory('Team', function($http, $rootScope, TeamProvider, Session, $modal) {
    'use strict';

    var _teams = TeamProvider.teams,
        _user = Session.user(),
        _users = {};

    var Team = {
        /**
         * @ngdoc function
         * @name active
         * @return {String} Contains active TeamId
         */
        active: function() {
            return _user.activeTeam;
        },
        /**
         * @ngdoc function
         * @name activate
         * @param {object} team Containing teamdata
         */
        activate: function(team) {
            $http.put('/api/users/me/activate/team/' + team._id);
        },
        /**
         * @ngdoc function
         * @name activeTeam
         * @return {object} Containing teamdata
         */
        activeTeam: function() {
            return Team.find(Team.active());
        },
        /**
         * @ngdoc function
         * @name  all
         * @return {Array} List of team objects with teamdata
         */
        all: function() {
            return _teams;
        },
        /**
         * @ngdoc function
         * @name create
         * @description Opens up a modal for input of data, sends data to backend on submit
         */
        create: function() {
            //Open a modal for user input
            var createModal = $modal.open({
                templateUrl: 'Areas/Dashboard/Views/Dashboard/app/manage/teams/create/create.html',
                controller: 'teamCreateController'
            });

            //Save data on form submit
            createModal.result.then(function(team) {
                $http.post('/api/teams', {
                    name: team.name,
                    description: team.description,
                    users: [_user._id]
                });
            });
        },
        /**
         * @ngdoc function
         * @name delete
         * @param {object} team Containing teamdata
         * @description Deletes the team sent as param
         */
        delete: function(team) {
            $http.delete('/api/teams/' + team._id);
        },
        /**
         * @ngdoc function
         * @name  find
         * @param {String} teamId Id of team to find
         * @return {object} Object containing teamdata
         * @description Finds a team by its id from local array of teams
         */
        find: function(teamId) {
            var _team = {};

            _team = _.find(_teams, {
                _id: teamId
            });

            return _team;
        },
        /**
         * @ngdoc function
         * @name update
         * @param {Object} team Team to edit
         * @description Opens up a modal with form for team metadata, sends update to backend on submit
         */
        update: function(team) {
            //Open up a modal for editing the team
            var editModal = $modal.open({
                templateUrl: 'Areas/Dashboard/Views/Dashboard/app/manage/teams/edit/edit.html',
                controller: 'teamEditController',
                resolve: {
                    team: function() {
                        return team;
                    }
                }
            });

            //Send data to backend on submit
            editModal.result.then(function(team) {
                $http.put('/api/teams/' + team._id, team);
            });
        },
        /**
         * ngdoc object
         * @name  Users
         * @description Manages users in team
         */
        Users: {
            /**
             * @ngdoc function
             * @name  add
             * @param {Object} user Userdata
             * @description Adds user to active team
             */
            add: function(user) {
                return $http.put('/api/teams/users', user);
            },
            /**
             * @ngdoc function
             * @name  all
             * @return {Array} Array of userobjects
             * @description Returns array of users in active team
             */
            all: function() {
                return _users;
            },
            /**
             * @ngdoc function
             * @name  setAll
             * @description Sets internal users of active project
             */
            setAll: function() {
                //Get active team
                var teamId = Team.active(),
                    team = Team.find(teamId);

                //Make sure it exists and update internal array of users
                if (team) {
                    _users = angular.copy(team.users);
                }
            },
            /**
             * @ngdoc function
             * @name  remove
             * @param {Object} user Object containing userdata
             * @description Remove user from active team
             */
            remove: function(user) {
                $http.delete('/api/teams/users/' + user._id);
            }
        }
    };


    //watch to keep track of changes to users
    //this is some ugly code, refactor to make it better
    $rootScope.$watch(function() {
        var team = Team.activeTeam();
        if (team) {
            return team.users;
        }
    }, function() {
        var team = Team.activeTeam();
        if (team && team.users) {
            _users = angular.copy(team.users);
        }
    }, true);

    return Team;
});
