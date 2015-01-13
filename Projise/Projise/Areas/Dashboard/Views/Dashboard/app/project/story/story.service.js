/**
 * @ngdoc service
 * @name  Story
 * @description Service for managing stories
 */
angular.module('projiSeApp').factory('Story', ['$http', '$modal', '$rootScope', 'StoryProvider', 'Sprint', 'Session', 'Task', 'Notify', function($http, $modal, $rootScope, StoryProvider, Sprint, Session, Task, Notify) {
    'use strict';

    var _user = Session.user(),
        _sprintId = Sprint.activeSprintId,
        _backlog = StoryProvider.backlog,
        _sprintBacklog = StoryProvider.sprintBacklog,

        /**
         * @ngdoc object
         * @name  Story
         */
        Story = {
            /**
             * @ngdoc method
             * @name  backlog
             * @returns {Array} Array of story objects
             * @description Returns stories in product backlog
             */
            backlog: function() {
                return _backlog;
            },
            /**
             * @ngdoc method
             * @name  sprintBacklog
             * @returns {Array} Array of story objects
             * @description Returns stories in sprint backlog
             */
            sprintBacklog: function() {
                return _sprintBacklog;
            },
            /**
             * @ngdoc method
             * @name  create
             * @description Create story using modal
             */
            create: function() {
                //Request user input using modal
                var createModal = $modal.open({
                    templateUrl: 'Areas/Dashboard/Views/Dashboard/app/project/story/create/create.html',
                    controller: 'storyCreateController'
                });

                //Send to backend on submit
                createModal.result.then(function(story) {
                    //Should probably move this to backend
                    story.status = 'not started';
                    $http.post('/api/stories', story);
                });
            },
            /**
             * @ngdoc method
             * @name  delete
             * @param {Object} story Story data
             * @description Delete story
             */
            delete: function(story) {
                $http.delete('/api/stories/' + story._id);
            },
            // find: function() {},
            /**
             * @ngdoc method
             * @name edit
             * @param {Object} story Story data
             * @description Edit story using modal
             */
            edit: function(story) {
                //Request user in put using modal
                var editModal = $modal.open({
                    templateUrl: 'Areas/Dashboard/Views/Dashboard/app/project/story/edit/edit.html',
                    controller: 'storyEditController',
                    resolve: {
                        story: function() {
                            return story;
                        }
                    }
                });

                //Send to backend on submit
                editModal.result.then(function(story) {
                    Story.update(story);
                });
            },
            /**
             * @ngdoc method
             * @name  update
             * @param {Object} story Story data
             * @description Update story
             */
            update: function(story) {
                $http.put('/api/stories/' + story._id, story);
            },
            /**
             * @ngdoc object
             * @name  SprintBacklog
             * @type {Object}
             * @description Manages sprint backlog
             */
            SprintBacklog: {
                /**
                 * @ngdoc method
                 * @name  add
                 * @param {Object} story Story data
                 * @description Add story to Sprint backlog
                 */
                add: function (story) {
                    if (!story.points) {
                        Notify.warning('Points should be set for story before planning work on it.');
                        return;
                    }
                    story.sprintId = Sprint.activeSprintId;
                    Story.update(story);
                },
                /**
                 * @ngdoc method
                 * @name  remove
                 * @param {Object} story Story data
                 * @description Remove story from sprint backlog
                 */
                remove: function(story) {
                    delete story.sprintId;
                    Story.update(story);
                }
            },
            /**
             * @ngdoc object
             * @name  User
             * @type {Object}
             * @description Manages user operations
             */
            User: {
                /**
                 * @ngdoc method
                 * @name  setStory
                 * @description Sets current story for user
                 */
                setStory: function() {
                    //Fetch current story
                    Story.User.story = _.find(_backlog, {userId: _user._id});

                    //Get tasks associated with story if we found one
                    if(Story.User.story) {
                        Task.setAll(Story.User.story);
                    }
                },
                /**
                 * @ngdoc property
                 * @name  story
                 * @type {Object}
                 * @description Data for current story
                 */
                story: {},
                /**
                 * @ngdoc method
                 * @name  start
                 * @param {Object} story Story data
                 * @description Start working on story
                 */
                start: function (story) {
                    //Make sure there's not another active story or this one is already active
                    if (story.userId || Story.User.story) {
                        console.log(story);
                        Notify.warning('Somebody is already working on this task.');
                        return;
                    }
                    //Update status
                    story.status = 'in progress';
                    //We're using userId to see which task is active
                    story.userId = _user._id;

                    //update
                    Story.update(story);
                },
                /**
                 * @ngdoc method
                 * @name  stop
                 * @param {Object} story Story data
                 * @description Stop working on story (not done)
                 */
                stop: function(story) {
                    //Update status
                    story.status = 'not started';
                    //Remove userId (noone is working on it)
                    story.userId = null;
                    //update

                    Story.update(story);
                    //Remove tasks from ui
                    Task.all.length = 0;
                },
                /**
                 * @ngdoc method
                 * @name  finish
                 * @param {Object} story Story data
                 * @description Finish story (complete)
                 */
                finish: function(story) {
                    //Update status
                    story.status = 'completed';
                    //Remove userId (noone is working on it)
                    story.userId = null;

                    //Update (backend)
                    Story.update(story);
                    //Remove tasks from ui
                    Task.all.length = 0;
                }
            }
        };

    //Set current story for user
    //Story.User.setStory();

    //Is a watch really needed here? (should probably update this manually instead)
    $rootScope.$watch(function() {
        return _backlog;
    }, function() {
        Story.User.setStory();
    }, true);

    return Story;
}]);
