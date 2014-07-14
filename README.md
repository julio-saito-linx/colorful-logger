by: [saitodisse](http://saitodisse.github.io/)

#colorful-logger 
###[0.1.1 (beta)]
colorful console.log

###bower
```
bower install colorful-logger --save
```
###npm
```
npm install colorful-logger --save
```

###configure on AMD
```javascript
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		ColorfulLogger: {
			deps: ['lodash']
		}
	},
	paths: {
		lodash: '../bower_components/lodash/dist/lodash',
		ColorfulLogger: '../bower_components/colorful-logger/src/colorful-logger'
	}
});
```

####call
```javascript
define([
	'ColorfulLogger'
], function (ColorfulLogger) {
	var logger = new ColorfulLogger.Logger();

	// a simple usage, not fun
	logger.log('Welcome to Meld Trace Logger');

	// here it is a green colored message
	logger.log({
		message: 'this message must be green',
		css: 'color: #0A0'
	});
});
```

##tests
###pre-requirements
```
sudo npm i jshint nodeunit supervisor grunt-cli -g
```

###test + jshint
```
grunt
```

###watch for changes: test + jshint
```
grunt test
```

###debuging 


nodeunit + node-debug


from: http://stackoverflow.com/questions/16652358/how-to-debug-nodeunit-using-node-inspector


```shell
npm -g install supervisor node-inspector

# console 1: supervisor restarts node-inspector when it quits, ignores file changes
supervisor -i . -x node-inspector .

# console 2
supervisor --debug-brk -- `which nodeunit` tests/
```


