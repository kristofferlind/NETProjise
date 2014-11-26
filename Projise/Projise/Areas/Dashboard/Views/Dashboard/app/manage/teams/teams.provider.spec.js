describe('Service: TeamProvider', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var TeamProvider, $httpBackend,
        teams = ['team1', 'team2'];

      // Initialize the controller and a mock scope
    beforeEach(inject(function (_TeamProvider_, _$httpBackend_) {
        TeamProvider = _TeamProvider_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('/api/teams').respond(teams);
    }));

    it('should be defined', function() {
        expect(TeamProvider).toBeDefined();
    });

    it('should populate teams', function() {
        TeamProvider.promise.then(function() {
            expect(TeamProvider.teams).toEqual(teams);
        });
        $httpBackend.flush();
    });
});
