'use strict';

/* Filters */

angular.module('pokemonApp.filters', []).
	filter('escapedUri', function(){
		return function ( uri ){
			return window.encodeURIComponent( uri.replace(/\//g, " ") );
		};
	});