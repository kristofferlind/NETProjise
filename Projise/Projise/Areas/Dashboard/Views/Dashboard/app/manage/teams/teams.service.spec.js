describe('Service: Team', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));
    // beforeEach(module('uiRouterMock'));

    beforeEach(module(function($provide) {
        $provide.value('Session', Session);
        $provide.value('TeamProvider', TeamProvider);
    }));

    var Team, $httpBackend,
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
        team = {
            _id: 'id',
            name: 'name',
            description: 'description',
            users: ['1', '2', '3']
        },
        teams = [team, {_id: 'id2', name: 'name2', description: 'description2'}],
        TeamProvider = {
            teams: teams
        },
        Session = {
            user: function() {
                return {
                    _id: 'id',
                    activeTeam: team._id
                };
            }
        },
        user = {
            _id: 'id',
            name: 'name'
        };

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_Team_, _$httpBackend_, _$modal_) {
        Team = _Team_;
        $httpBackend = _$httpBackend_;
        $modal = _$modal_;
        fakeModal = fakeModal;
    }));


    it('should be defined', function() {
        expect(Team).toBeDefined();
    });

    describe('Method: active', function() {
        it('should return activeTeam (id) from user', function() {
            expect(Team.active()).toEqual(team._id);
        });
    });

    describe('Method: activate', function() {
        it('should set active team on backend', function() {
            $httpBackend.expectPUT('/api/users/me/activate/team/id').respond(201);
            Team.activate(team);
            $httpBackend.flush();
        });
    });

    describe('Method: activeTeam', function() {
        it('should return active team', function() {
            expect(Team.activeTeam()).toEqual(team);
        });
    });

    describe('Method: all', function() {
        it('should return teams', function() {
            expect(Team.all()).toEqual(teams);
        });
    });

    describe('Method: create', function() {
        it('should request user input and save to backend', function() {
            var insertTeam = {
                name:'name',
                description:'description',
                users:['id']
            };

            spyOn($modal, 'open').and.returnValue(fakeModal);
            $httpBackend.expectPOST('/api/teams', insertTeam).respond(201);
            Team.create();
            fakeModal.close(team);
            $httpBackend.flush();
        });
    });

    describe('Method: delete', function() {
        it('should delete document on backend', function() {
            $httpBackend.expectDELETE('/api/teams/id').respond(204);
            Team.delete(team);
            $httpBackend.flush();
        });
    });

    describe('Method: find', function() {
        it('should find the correct team', function() {
            expect(Team.find('id')).toEqual(team);
        });
    });

    describe('Method: update', function() {
        it('should request user input and save to backend', function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            $httpBackend.expectPUT('/api/teams/id', team).respond(null);
            Team.update();
            fakeModal.close(team);
            $httpBackend.flush();
        });
    });

    describe('Users:', function() {
        describe('Method: add', function() {
            it('should make a request to add user', function() {
                $httpBackend.expectPUT('/api/teams/users', user).respond(201);
                Team.Users.add(user);
                $httpBackend.flush();
            });
        });

        describe('Method: all & setAll', function() {
            it('should return list of users', function() {
                Team.Users.setAll();
                expect(Team.Users.all()).toEqual(team.users);
            });
        });

        describe('Method: remove', function() {
            it('should send request to remove on backend', function() {
                $httpBackend.expectDELETE('/api/teams/users/id').respond(204);
                Team.Users.remove(user);
                $httpBackend.flush();
            });
        });
    });
});
