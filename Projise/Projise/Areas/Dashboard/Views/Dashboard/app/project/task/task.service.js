/**
 * @ngdoc service
 * @name  Task
 * @description Manages tasks
 */
angular.module('projiSeApp').factory('Task', function($http, $modal, socket) {
    'use strict';

    var _story = {},
        Task = {
        /**
         * @ngdoc property
         * @name  all
         * @type {Array}
         * @description Container for tasks belonging to story
         */
        all: [],
        /**
         * @ngdoc method
         * @name  setAll
         * @param {Object} story Story data
         */
        setAll: function(story) {
            _story = story;
            //Fetch tasks from backend
            $http.get('/api/tasks/' + story._id).success(function(tasks) {
                //Update getter
                Task.all = angular.copy(tasks);
                //Setup sync with backend
                socket.syncUpdates('task', Task.all);
            });
        },
        /**
         * @ngdoc method
         * @name  create
         * @param {Object} task Task data
         * @description Creates task
         */
        create: function(task) {
            //Set initial status and storyId (move to backend?)
            task.isDone = false;
            task.storyId = _story._id;

            //Send to backend
            $http.post('/api/tasks', task);
        },
        /**
         * @ngdoc method
         * @name  delete
         * @param {Object} task Task data
         * @description Deletes task
         */
        delete: function(task) {
            $http.delete('/api/tasks/' + task._id);
        },
        /**
         * @ngdoc method
         * @name  edit
         * @param {Object} task Task data
         * @description  Edit task using modal
         */
        edit: function(task) {
            //Request userdata using modal
            var editModal = $modal.open({
                templateUrl: 'Areas/Dashboard/Views/Dashboard/app/project/task/edit/edit.html',
                    controller: 'taskEditController',
                    resolve: {
                        task: function() {
                            return task;
                        }
                    }
                });

            //Send to backend on submit
            editModal.result.then(function(task) {
                Task.update(task);
            });
        },
        /**
         * @ngdoc method
         * @name  update
         * @param {Object} task Task data
         * @description Update task
         */
        update: function(task) {
            $http.put('/api/tasks/' + task._id, task);
        }
    };

    return Task;
});
