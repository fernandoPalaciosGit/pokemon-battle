'use strict';

var isEmpty = function (str) {
  return (!str || 0 === str.length);
};

var Pokemon = function(i, n, num, url, dataImg, attack, defense, desc, arrEvol, speed, weight, arrMoves){
	this.idList = i;
	this.pokeName = n;
	this.pokeNum = parseInt(num, 10);
	this.pokeUrl = url;
	this.pokeImg = dataImg;
	this.attack = parseInt(attack, 10);
	this.defense = parseInt(defense, 10);
	this.evolutions = arrEvol; // [ objects ]
	this.speed = parseInt(speed, 10);
	this.weight = parseInt(weight, 10);
	this.moves = arrMoves; // [ objects ]
	this.pokeDesc = desc;
	// console.log(this);
};
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
				controller: PokemonSelectController
			}).
			when('/info/:pokeId', {
				templateUrl: 'partials/viewPokemon/info.html',
				controller: PokemonInfoController
			}).
			when('/battle', {
				templateUrl: 'partials/battlePokemon/battle.html',
				controller: PokemonBattleController
			}).
			otherwise({redirectTo: '/selection'});
	}]);