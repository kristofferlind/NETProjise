describe('Filter: toCSSName', function () {
    'use strict';

    var $filter;

    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    beforeEach(function () {
        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it('should do nothing if input is undefined', function() {
        var string, result;

        result = $filter('toCSSName')(string);

        expect(result).toEqual(undefined);
    });

    it('should replace spacebar with dash', function () {
        var string = 'css class', result;

        result = $filter('toCSSName')(string);

        expect(result).toEqual('css-class');
    });
});
