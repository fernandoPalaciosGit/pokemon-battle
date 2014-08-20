'use strict';

var PokemonRestFullFactory = function ($resource){
	var factory = {};

	// LISTA DE POKEMON
	factory.getPokedex = function () {
		// JSONP (devolvemos una funcion que capturaremos con una promiso
		return $resource(	'http://pokeapi.co/api/v1/pokedex/1',
								{callback: 'JSON_CALLBACK', alt: 'json'},
								{ get: {method:'JSONP'} } ).get();
	};


	// POPKEMON
	factory.getPokemon = function (pokeId) {
		// JSONP (devolvemos una funcion que capturaremos con una promiso
		return $resource(	'http://pokeapi.co/api/v1/pokemon/'+pokeId,
					{callback: 'JSON_CALLBACK', alt: 'json'},
					{ get: { method:'JSONP' } } ).get();
	};

	// CUALQUIER URI DE LA API //pokeapi.co
	factory.getUri = function (uri) {
		// JSONP (devolvemos una funcion que capturaremos con una promiso
		return $resource(	'http://pokeapi.co' + uri,
								{callback: 'JSON_CALLBACK', alt: 'json'},
								{ get: { method:'JSONP' } } ).get();
	};

	return factory;
};

var PokemonFactory = function(){
	var factory = {};

	// contador de pokemon construidos
	factory.loadPokemonAjax = [0, 0];
	
	// lista de Pokemon construidos por nosotros
	factory.listPokemon = [];

	// lista de pokemon y su API URL
	factory.listPokemonData = [];

	return factory;
};

angular.module('pokemonApp.services', ['ngResource']).
// version de proyecto
	value('version', '0.1').
// factoria de servicio RESTfull: acceder a todos los datos del catalogo
	factory('PokemonRestFullFact', ['$resource', PokemonRestFullFactory]).
// almacenar permanentemente los pokemon para recuperarlos en sucesivas vistas
	factory('PokemonFact', PokemonFactory);