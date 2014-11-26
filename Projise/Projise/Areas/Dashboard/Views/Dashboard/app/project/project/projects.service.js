/**
 * @ngdoc service
 * @name  Project
 * @description Service to manage projects
 */
angular.module('projiSeApp').factory('Project', function($http, $modal, $timeout, $rootScope, ProjectProvider, Session) {
    'use strict';

    var _user = Session.user(),
        _projects = ProjectProvider.projects,
        _activeProject,
        _activeProjectId,
        Project = {
            /**
             * @ngdoc function
             * @name  activeProject
             * @returns {object} Project data
             * @description Get data for currently active project
             */
            activeProject: function() {
                if (!_activeProject) {
                    return Project.find(_user.activeProject);
                }
                return _activeProject;
            },
            /**
             * @ngdoc function
             * @name  activeProjectId
             * @return {String} ProjectId
             * @description Get id of currently active project
             */
            activeProjectId: function() {
                if (!_activeProjectId) {
                    return _user.activeProject;
                }
                return _activeProjectId;
            },
            /**
             * @ngdoc function
             * @name  activate
             * @param {object} project Project data
             * @description Set project as active project locally and update in backend
             */
            activate: function(project) {
                _activeProjectId = project._id;
                _activeProject = project;
                $http.put('/api/projects/' + project._id + '/active');
            },
            /**
             * @ngdoc function
             * @name  all
             * @return {Array} Array of user objects
             * @description  Get users in current project
             */
            all: function() {
                return _projects;
            },
            /**
             * @ngdoc function
             * @name  create
             * @description Create project, opens a modal for user input and updates backend on submit
             */
            create: function() {
                //Open modal for user input
                var createModal = $modal.open({
                    templateUrl: 'app/manage/projects/create/create.html',
                    controller: 'projectCreateController'
                });

                //Save to backend on submit
                createModal.result.then(function(project) {
                    $http.post('/api/projects', {
                        name: project.name,
                        description: project.description,
                        users: [_user._id]
                    });
                });
            },
            /**
             * @ngdoc function
             * @name  delete
             * @param {object} project Project data
             * @description Deletes project
             */
            delete: function(project) {
                $http.delete('/api/projects/' + project._id);
            },
            /**
             * @ngdoc function
             * @name  find
             * @param {String} projectId Id of project to find
             * @returns {object} projectdata for found project
             * @description Find a project in the local array by id
             */
            find: function(projectId) {
                var _project = {};

                _project = _.find(_projects, {
                    _id: projectId
                });

                return _project;
            },
            /**
             * @ngdoc function
             * @name  update
             * @param {object} project Project data
             * @description Updates metadata of project by opening up a modal and then saving changes to backend on submit
             */
            update: function(project) {
                //Open up a modal for user input
                var editModal = $modal.open({
                    templateUrl: 'app/manage/projects/edit/edit.html',
                    controller: 'projectEditController',
                    resolve: {
                        project: function() {
                            return project;
                        }
                    }
                });

                //Save changes to backend on submit
                editModal.result.then(function(project) {
                    $http.put('/api/projects/' + project._id, project);
                });

            },
            /**
             * @ngdoc object
             * @name  Users
             * @description Manages users in project
             */
            Users: {
                /**
                 * @ngdoc function
                 * @name  add
                 * @description Adds user to project using modal for input
                 */
                add: function() {
                    //Open modal requesting user input
                    var addUserModal = $modal.open({
                        templateUrl: 'app/manage/projects/users/add/add.html',
                        controller: 'projectAddUserController'
                    });

                    //Send to backend on submit
                    addUserModal.result.then(function(user) {
                        $http.put('/api/projects/' + Project.activeProjectId() + '/users', user);
                    });
                },
                /**
                 * @ngdoc function
                 * @name  all
                 * @returns {Array} Array of user objects
                 * @description Get userlist in currently active project
                 */
                all: function() {
                    if (_activeProject) {
                        return _activeProject.users;
                    }
                },
                /**
                 * @ngdoc function
                 * @name remove
                 * @param {object} user User object
                 * @description Remove user from project
                 */
                remove: function(user) {
                    $http.delete('/api/projects/' + Project.activeProjectId() + '/users/' + user._id);
                }
            },
            Teams: {
                /**
                 * @ngdoc function
                 * @name  add
                 * @param {object} team Team of users
                 * @description Add team to project
                 */
                add: function(team) {
                    $http.put('/api/projects/' + Project.activeProjectId() + '/users/' + team._id);
                }
            },
            Sprints: {
                /**
                 * @ngdoc function
                 * @name  all
                 * @returns {Array} Array of sprint objects
                 * @description  Returns sprints in active project
                 */
                all: function() {
                    return Project.activeProject().sprints;
                }
            }
        };

    //Ugly code to keep sync working..
    //@todo figure out some better way to do this
    $rootScope.$watch(function() {
        var project = Project.find(Project.activeProjectId());
        return project;
    }, function() {
        var projectId = Project.activeProjectId(),
            project = Project.find(projectId);

        _activeProject = angular.copy(project);
    }, true);

    return Project;
});
