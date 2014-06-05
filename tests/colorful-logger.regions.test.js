var _ = require('lodash');
var ColorfulLogger = require('../src/colorful-logger');
var fakeConsole = require('./fake-console');
var colorfulLogger = new ColorfulLogger.Logger({
	output: fakeConsole
});

module.exports = {
	setUp: function (callback) {
		colorfulLogger = new ColorfulLogger.Logger({
			output: fakeConsole
		});

		fakeConsole.logRecorder = [];

		callback();
	},
	
	tearDown: function (callback) {
		callback();		
	},

	'message size smaller add some pad strings': function(test) {
		colorfulLogger.log({
			message: '12345',
			size: 10,
			padString: ' '
		});

		test.equal('12345     ', fakeConsole.logRecorder[0].message);
		test.done();
	},

	'message size bigger make a cut with two dots': function(test) {
		colorfulLogger.log({
			message: '12345678901',
			size: 10,
			padString: ' '
		});

		test.equal('12345678..', fakeConsole.logRecorder[0].message);
		test.done();
	},

	'log two simple messages': function(test) {
		colorfulLogger.log(['ab','cd']);

		test.equal('abcd', fakeConsole.logRecorder[0].message);
		test.done();
	},

	'log various simple messages': function(test) {
		colorfulLogger.log(['a', 'b', 'c', 'd']);

		test.equal('abcd', fakeConsole.logRecorder[0].message);
		test.done();
	},

	'log two objects messages': function(test) {
		colorfulLogger.log(
		[
			{
				message: 'abc'
			},
			{
				message: 'def'
			}
		]);

		test.equal('abcdef', fakeConsole.logRecorder[0].message);
		test.done();
	},

	'log two objects messages with sizes': function(test) {
		colorfulLogger.log([
			{
				message: 'abc',
				size: 4
			},
			{
				message: 'def',
				size: 4
			}
		]);

		test.equal('abc def ', fakeConsole.logRecorder[0].message);
		test.done();
	},

	'must have %c with colors': function(test) {
		colorfulLogger.log([
			{
				message: 'abc',
				css: 'color: #12F'
			},
			{
				message: 'def',
				css: 'color: #F21'
			}
		]);

		test.equal('%cabc%cdef', fakeConsole.logRecorder[0].message);
		test.done();
	},

	'must correct color CSS': function(test) {
		colorfulLogger.log([
			{
				message: 'abc',
				css: 'color: #12F'
			},
			{
				message: 'def',
				css: 'color: #F21'
			}
		]);

		test.ok(_.isArray(fakeConsole.logRecorder[0].cssList));
		test.equal('color: #12F', fakeConsole.logRecorder[0].cssList[0]);
		test.equal('color: #F21', fakeConsole.logRecorder[0].cssList[1]);
		test.done();
	},

	'first message has CSS but not the second, ugly thing to do': function(test) {
		colorfulLogger.log([
			{
				message: 'SomeObj',
				css: 'color: blue',
				size: 10
			},
  		{
  			message: 'addNumbers'
  		}
  	]);

		test.equal('%cSomeObj   addNumbers', fakeConsole.logRecorder[0].message);
		test.equal('color: blue', fakeConsole.logRecorder[0].cssList[0]);
		test.done();
	},

};