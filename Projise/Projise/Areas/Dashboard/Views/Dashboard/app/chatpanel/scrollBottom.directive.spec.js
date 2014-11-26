describe('Directive: scrollBottom', function() {
    'use strict';

    var element, scope;

    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('<section scroll-bottom style="height:100px; overflow-y:scroll"><div style="height:200px"></div></section>');
        angular.element(document.body).append(element);
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should scroll element to bottom', function() {
        expect(element[0].scrollTop).toBe(100);
    });
});
