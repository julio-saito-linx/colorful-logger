(function(root, factory) {

  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['lodash', 'exports'], function (_, exports) {
      factory(root, exports, _);
    });

  // Node.js
  } else if (typeof exports !== 'undefined') {
    var _ = require('lodash');
    factory(root, exports, _);
  }

}(this, function(root, ColorfulLogger, _) {

	/*******************************
		string utilities
	*******************************/
	ColorfulLogger.stringUtility = {
		rpad: function (str, padString, length) {
	    while (str.length < length) {
	        str = str + padString;
	    }
	    return str;
		},
		truncate: function (str, length, truncateStr) {
	    if (str === null) {
	        return '';
	    }
	    str = String(str);
	    truncateStr = truncateStr || '..';
	    length = ~~length;
	    return str.length > length ? str.slice(0, length-2) + truncateStr : str;
		}
	};

	/*******************************
		ColorfulLogger
	*******************************/
	ColorfulLogger.create = function (config){
		var stringUtility = ColorfulLogger.stringUtility;

		config = config || {};

		var defaults = _.partialRight(_.assign, function(a, b) {
		  return typeof a == 'undefined' ? b : a;
		});

		var defaultConfig = {
			'enabled': true,
			'output': console
		};

		defaults(config, defaultConfig);
		this.config = config;

		this.configure = function(config) {
			defaults(config, this.config);
			this.config = config;
		};

		this.log = function(opt) {
			var fullMessage = '',
				message = '',
				cssList = [],
				optItem,
				i
			;

			if(this.config.enabled === false){
				//disabled, do nothing
				return false;
			}

			if(_.isArray(opt)){
				for (i = 0; i < opt.length; i++) {
					optItem = opt[i];

					message = this.getMessage(optItem);
					message = this.truncOrPadMessage(optItem, message);
					fullMessage += message;
					cssList.push('color: ' + optItem.color);
				}
			}
			else{
				message = this.getMessage(opt);
				message = this.truncOrPadMessage(opt, message);
				fullMessage = message;
				cssList.push('color: ' + opt.color);
			}

			this.sendToOutput(opt, fullMessage, cssList);
			
			return true;
		};

		this.getMessage = function(opt) {
			var message = '';
			if(_.isObject(opt)){
				message = opt.message;
			}
			else if(_.isString(opt)){
				message = opt;
			}

			if(!_.isUndefined(opt.color)){
				message = '%c' + message;
			}

			return message;
		};

		this.truncOrPadMessage = function(opt, message) {
			if(opt.size && opt.padString){
				var isSmaller = message.length <= opt.size;
				if(isSmaller){
					return stringUtility.rpad(message, opt.padString, opt.size);
				}
				else{
					return stringUtility.truncate(message, opt.size);
				}
			}
			return message;
		};

		this.sendToOutput = function(opt, message, cssList) {
			if(!cssList){
				this.config.output.log(message);
			}
			else{
				var params = [message].concat(cssList);
				this.config.output.log.apply(this.config.output, params);
			}
		};

	};

  return ColorfulLogger;

}));

