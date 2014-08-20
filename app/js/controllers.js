'use strict';

var Pokemon = function(i, n, num, url, dataImg, attack, defense, desc, evol, speed, weight, moves){
	this.idList = i;
	this.pokeName = n;
	this.pokeNum = num;
	this.pokeUrl = url;
	this.pokeImg = dataImg;
	this.attack = attack;
	this.defense = defense;
	this.descriptions = desc; // [ objects ]
	this.evolutions = evol; // [ objects ]
	this.speed = speed;
	this.weight = weight;
	this.moves =moves; // [ objects ]
};

// Controlador de /selection.html
var PokemonSelectController = function ($scope, PokemonRest, PokemonFact){
	//lista de pokemon cargados en la vista
	$scope.pokemonList = PokemonFact.listPokemon;
	$scope.numPokeSelect = PokemonFact.listPokemon.length;

	// Constructor de lista de Pokemon
	var loadPokemonList = function (){

		var i = PokemonFact.loadPokemonAjax[0];
							
		// comprobar que estamos iterando en el rango de $scope.loadPokemonAjax
		if( i < PokemonFact.loadPokemonAjax[1] ){
			PokemonFact.loadPokemonAjax[0] = i + 1;

			var pokenum = PokemonFact.listPokemonData[ i ].resource_uri.split('/')[3];

			PokemonRest.getPokemon( pokenum ).
				$promise.then( function (data){

					// datos de interes a nuestros pokemon
					var	attack = data.attack,
							defense = data.defense,
							desc = data.descriptions,
							evol = data.evolutions,
							speed = data.speed,
							weight = data.weight,
							moves = data.moves;

					PokemonRest.getSprite( data.sprites[0].resource_uri ).
						$promise.then( function (data){
							var	dataImg = { alt: data.name, src: 'http://pokeapi.co'+data.image },
									listApiPoke = PokemonFact.listPokemonData,
									newPokemon = new Pokemon(	i,
																		listApiPoke[i].name,
																		listApiPoke[i].resource_uri.split('/')[3],
																		listApiPoke[i].resource_uri,
																		dataImg, attack, defense, desc, evol, speed, weight, moves );

							// cargamos el pokemon en la factoria,
							// el digest de Angular se encargra de asignar los valores a $scope.pokemonList
							PokemonFact.listPokemon.push( newPokemon );

							// contador de pokemon en lista
							$scope.numPokeSelect = PokemonFact.listPokemon.length;
							
							loadPokemonList(); // RECURSIVIDAD
						});

				});
		}

	};

	// cargar 10 pokemones más
	$scope.loadTenPokemon = function(){
		PokemonFact.loadPokemonAjax = [PokemonFact.loadPokemonAjax[1], PokemonFact.loadPokemonAjax[1] + 10];
		loadPokemonList();
	};

	/* si es la primera vez (tendremos vacia la lista de pokemon en la fatoia):
		Añadimos 10 pokemon a la lista de nuestra vista */
	if ( PokemonFact.loadPokemonAjax[1] === 0 ){
		PokemonFact.loadPokemonAjax = [0, 10];

		//recuperar una unica vez la lista de pokemon y almacenarlo en una variable de la factoria
		PokemonRest.getPokedex().
			$promise.then( function (data){

				PokemonFact.listPokemonData = data.pokemon; //LISTA DE POKEMON Y URL
				loadPokemonList();

			});
	}


};

// Controlador de /info.html
var PokemonInfoController = function ($scope){};

// Controlador de /battle.html
var PokemonBattleController = function ($scope){};

// SCOPE DE CONTROLADORES
angular.module('pokemonApp.controllers', []).
  controller( 'PokemonSelectCtrl', PokemonSelectController ).
  controller( 'PokemonInfoCtrl', PokemonInfoController ).
  controller( 'PokemonBattleCtrl', PokemonBattleController );

//INJECCION DE DEPENDENCIAS
PokemonSelectController.$inject = [ '$scope', 'PokemonRestFullFact', 'PokemonFact'];
PokemonInfoController.$inject = [ '$scope' ];
PokemonBattleController.$inject = [ '$scope' ];