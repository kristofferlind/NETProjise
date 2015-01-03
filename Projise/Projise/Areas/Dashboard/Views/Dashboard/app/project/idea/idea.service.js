/**
 * @ngdoc service
 * @name  Idea
 * @description Service for managing ideas
 */
angular.module('projiSeApp').factory('Idea', ['$http', '$modal', 'socket', function($http, $modal, socket) {
    'use strict';

    //Fetch ideas from server on load
    $http.get('/api/ideas').success(function(ideas) {

        //Set internal list of ideas to fetched data
        Idea.all = angular.copy(ideas);

        //Setup sync between local and backend ideas
        socket.syncUpdates('idea', Idea.all);
    });

    var Idea = {
        /**
         * @ngdoc function
         * @name  all
         * @type {Array}
         * @description Array of idea objects
         */
        all: [],
        /**
         * @ngdoc function
         * @name  create
         * @description Opens a modal for user input and saves to backend on submit
         */
        create: function() {

            //Open up modal for user input
            var createModal = $modal.open({
                templateUrl: 'Areas/Dashboard/Views/Dashboard/app/project/idea/create/create.html',
                controller: 'ideaCreateController'
            });

            //Save idea on backend
            createModal.result.then(function(idea) {
                $http.post('/api/ideas', idea);
            });
        },
        /**
         * @ngdoc function
         * @name  delete
         * @param {object} idea Idea object
         * @description Deletes idea sent as parameter
         */
        delete: function(idea) {
            $http.delete('/api/ideas/' + idea._id);
        },
        /**
         * @ngdoc function
         * @name  voteUp
         * @param {object} idea Idea object
         * @description Gives idea a positive vote
         */
        voteUp: function(idea) {
            $http.put('/api/ideas/' + idea._id + '/up');
        },
        /**
         * @ngdoc function
         * @name  voteDown
         * @param {object} idea Idea object
         * @description Give idea a negative vote
         */
        voteDown: function(idea) {
            $http.put('/api/ideas/' + idea._id + '/down');
        }
    };

    return Idea;
}]);
