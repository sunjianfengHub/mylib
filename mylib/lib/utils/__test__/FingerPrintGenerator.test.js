'use strict';

// jest.mock('../Des.js');

var Fp = void 0;
beforeEach(function () {
	Fp = require('../FingerPrintGenerator.js');
});

describe('FingerPrint TestCase', function () {
	test('should work with des Properly', function () {
		expect(Fp.getFP('a')).toMatchSnapshot();
	});
	test('should not change for different import', function () {
		expect(Fp.getFP('a')).toMatchSnapshot();
	});
});