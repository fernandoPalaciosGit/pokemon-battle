'use strict';


window.angular.
	module('pokemonApp', [
		'ngRoute',
		'pokemonApp.filters',
		'pokemonApp.services',
		'pokemonApp.directives',
		'pokemonApp.controllers'
	]).
	config( ['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
		//CROSS DOMAIN ORIGIN
		// anulamos todos los encabezados depeticion http para que no piense que sooms un host de otro dominio (luego JSONP)
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
		$httpProvider.defaults.headers.common["Accept"] = "application/json";
		$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
		
		$routeProvider.
			when('/selection', {
				templateUrl: 'partials/selectPokemon/selection.html',
				controller: 'PokemonSelectCtrl'
			}).
			when('/info/:pokeId', {
				templateUrl: 'partials/viewPokemon/info.html',
				controller: 'PokemonInfoCtrl'
			}).
			when('/battle', {
				templateUrl: 'partials/battlePokemon/battle.html',
				controller: 'PokemonBattleCtrl'
			}).
			otherwise({redirectTo: '/selection'});
	}]);
