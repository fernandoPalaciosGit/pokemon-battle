'use strict';

var PokemonRestFullFactory = function ($resource){
	var	factory = {};

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

	// SPRITE DE POPKEMON
	factory.getSprite = function (uriSprite) {
		// JSONP (devolvemos una funcion que capturaremos con una promiso
		return $resource(	'http://pokeapi.co' + uriSprite,
								{callback: 'JSON_CALLBACK', alt: 'json'},
								{ get: { method:'JSONP' } } ).get();
	};

	// INFORMACION DE POPKEMON
	factory.getPokeInfo = function (pokeId) {
		// JSONP (devolvemos una funcion que capturaremos con una promiso
		return $resource(	'http://pokeapi.co/api/v1/pokemon/:query',
								{callback: 'JSON_CALLBACK', alt: 'json'},
								{ get: { method:'JSONP', params: {query: pokeId} } } ).get();
	};

	/*
	return $resource('http://pokeapi.co/api/v1/:query', {}, {
		getPokedex: { method: 'GET', params: {query: 'pokedex/1/'}, isArray: true }
	});
	 */
	return factory;
};

var PokemonFactory = function(){
	return {
		loadPokemonAjax : [0, 0],
		listPokemon : [],
		listPokemonData: []
	};
};

angular.module('pokemonApp.services', ['ngResource']).
// version de proyecto
	value('version', '0.1').
// factoria de servicio RESTfull: acceder a todos los datos del catalogo
	factory('PokemonRestFullFact', ['$resource', PokemonRestFullFactory]).
// almacenar permanentemente los pokemon para recuperarlos en sucesivas vistas
	factory('PokemonFact', PokemonFactory);