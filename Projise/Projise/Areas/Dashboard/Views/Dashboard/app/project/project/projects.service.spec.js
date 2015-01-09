describe('Service: Project', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));
    // beforeEach(module('uiRouterMock'));

    beforeEach(module(function($provide) {
        $provide.value('Session', Session);
        $provide.value('ProjectProvider', ProjectProvider);
    }));

    var Project, $httpBackend,
        $modal = {
            open: function() {}
        },
        fakeModal = {
            result: {
                then: function(confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function( item ) {
                //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
                this.result.confirmCallBack( item );
            },
            dismiss: function( type ) {
                //The user clicked cancel on the modal dialog, call the stored cancel callback
                this.result.cancelCallback( type );
            }
        },
        project = {
            _id: 'id',
            name: 'name',
            description: 'description',
            users: ['1', '2', '3'],
            sprints: ['1', '2']
        },
        projects = [project, {_id: 'id2', name: 'name2', description: 'description2'}],
        ProjectProvider = {
            projects: projects
        },
        Session = {
            user: function() {
                return {
                    _id: 'id',
                    activeProject: project._id
                };
            }
        },
        user = {
            _id: 'id',
            name: 'name'
        };

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_Project_, _$httpBackend_, _$modal_) {
        Project = _Project_;
        $httpBackend = _$httpBackend_;
        $modal = _$modal_;
        fakeModal = fakeModal;
    }));


    it('should be defined', function() {
        expect(Project).toBeDefined();
    });

    describe('Method: activeProject', function() {
        it('should return active project', function() {
            expect(Project.activeProject()).toEqual(project);
        });
    });

    describe('Method: activeProjectId', function() {
        it('should return active projectId', function() {
            expect(Project.activeProjectId()).toEqual(project._id);
        });
    });

    //Skipped because page reload crashes tests
    xdescribe('Method: activate', function() {
        it('should set active project on backend', function() {
            $httpBackend.expectPUT('/api/users/me/activate/project/id').respond(201);
            Project.activate(project);
            $httpBackend.flush();
        });
    });

    describe('Method: all', function() {
        it('should return projects', function() {
            expect(Project.all()).toEqual(projects);
        });
    });

    describe('Method: create', function() {
        it('should request user input and save to backend', function() {
            var insertProject = {
                name:'name',
                description:'description',
                users: [{_id: 'id', activeProject: 'id'}]
            };

            spyOn($modal, 'open').and.returnValue(fakeModal);
            $httpBackend.expectPOST('/api/projects', insertProject).respond(201);
            Project.create();
            fakeModal.close(project);
            $httpBackend.flush();
        });
    });

    describe('Method: delete', function() {
        it('should delete document on backend', function() {
            $httpBackend.expectDELETE('/api/projects/id').respond(204);
            Project.delete(project);
            $httpBackend.flush();
        });
    });

    describe('Method: find', function() {
        it('should find the correct project', function() {
            expect(Project.find('id')).toEqual(project);
        });
    });

    describe('Method: update', function() {
        it('should request user input and save to backend', function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            $httpBackend.expectPUT('/api/projects/id', project).respond(null);
            Project.update();
            fakeModal.close(project);
            $httpBackend.flush();
        });
    });

    describe('Users: ', function() {
        describe('Method: add', function() {
            it('should request user input and save to backend', function() {
                var insertUser = {
                    name:'name',
                    description:'description',
                };

                spyOn($modal, 'open').and.returnValue(fakeModal);
                $httpBackend.expectPUT('/api/projects/id/users', insertUser).respond(201);
                Project.Users.add();
                fakeModal.close(insertUser);
                $httpBackend.flush();
            });
        });

        describe('Method: all', function() {
            it('should return list of users', function() {
                Project.activate(project);
                expect(Project.Users.all()).toEqual(project.users);
            });
        });

        describe('Method: remove', function() {
            it('should send request to remove on backend', function() {
                $httpBackend.expectDELETE('/api/projects/id/users/id').respond(204);
                Project.Users.remove(user);
                $httpBackend.flush();
            });
        });
    });

    describe('Teams: ', function() {
        describe('Method: add', function() {
            it('should add team to project', function() {
                var team = {
                    _id: 'id'
                };

                $httpBackend.expectPUT('/api/projects/id/users/id').respond(201);
                Project.Teams.add(team);
                $httpBackend.flush();
            });
        });
    });

    describe('Sprints: ', function() {
        describe('Method: aall', function() {
            it('should return sprints in project', function() {
                expect(Project.Sprints.all()).toEqual(project.sprints);
            });
        });
    });
});
