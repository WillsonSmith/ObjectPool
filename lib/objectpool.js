(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("objectpool", [], factory);
	else if(typeof exports === 'object')
		exports["objectpool"] = factory();
	else
		root["objectpool"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ObjectPool = function () {
	  function ObjectPool() {
	    var objects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	    _classCallCheck(this, ObjectPool);

	    this._objectPool = [];
	    this.status = {
	      totalAllocated: objects,
	      totalFree: objects
	    };

	    for (var i = 0; i < objects; i++) {
	      this._objectPool.push({});
	    }
	  }

	  _createClass(ObjectPool, [{
	    key: "alloc",
	    value: function alloc() {
	      if (this._objectPool.length === 0) {
	        this.status.totalAllocated++;
	        return {};
	      }
	      this.status.totalFree--;
	      return this._objectPool.pop();
	    }
	  }, {
	    key: "free",
	    value: function free(obj) {
	      this.status.totalFree++;
	      this._objectPool.push(obj);
	    }
	  }, {
	    key: "collect",
	    value: function collect() {
	      this._objectPool.length = 0;
	      this._clearStatus();
	    }
	  }, {
	    key: "_clearStatus",
	    value: function _clearStatus() {
	      var allocated = this.status.totalAllocated - this.status.totalFree;
	      this.status.totalAllocated = allocated || 0;
	      this.status.totalFree = 0;
	    }
	  }]);

	  return ObjectPool;
	}();

	exports.default = ObjectPool;

/***/ }
/******/ ])
});
;