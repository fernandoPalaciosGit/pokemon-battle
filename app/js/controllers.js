'use strict';

var Pokemon = function(n, num, url){
	this.pokeName = n;
	this.pokeNum = num;
	this.pokeUrl = url;
};

// Controlador de /selection.html
var PokemonSelectController = function ($scope, PokemonRest, PokemonFact){
	//lista de pokemon cargados en la vista
	$scope.pokemonList = PokemonFact.listPokemon;
	$scope.numPokeSelect = PokemonFact.listPokemon.length;

	// recuperar la cantidad de objetos pokemon creados
	$scope.$watch('pokemonList.length', function(newValue, oldValue) {
		$scope.numPokeSelect = newValue;
	});

	//recuperamos la lista de todos los pokemon (solo nombres)
	$scope.loadPokemonList = function (){

		// desde el primero hasta el ultimo (indices en factoria)
		for (var i = PokemonFact.loadPokemonAjax[0]; i < PokemonFact.loadPokemonAjax[1]; i++) {
			var	listApiPoke = PokemonFact.listPokemonData,
					newPokemon = new Pokemon(	listApiPoke[i].name,
														listApiPoke[i].resource_uri.split('/')[3],
														listApiPoke[i].resource_uri );

			$scope.pokemonList.push( newPokemon );
		}

		$scope.loadPokemonSprite();
	};

	// imagen y descripcion de los pokemons (solo los 10 primeros)
	$scope.loadPokemonSprite = function (){

		// $scope.loadPokemonAjax = loadPokeAjax;
		var i = PokemonFact.loadPokemonAjax[0];
							
		// comprobar que estamos iterando en el rango de $scope.loadPokemonAjax
		if( i < PokemonFact.loadPokemonAjax[1] ){
			PokemonFact.loadPokemonAjax[0] = i + 1;

			PokemonRest.getPokemon( $scope.pokemonList[ i ].pokeNum ).
				$promise.then( function (data){
					console.log(data);

					PokemonRest.getSprite( data.sprites[0].resource_uri ).
						$promise.then( function (data){

							//añadimos nuevas propiedades a cada pokemon
							$scope.pokemonList[ i ].pokeImg = {
								alt : data.name,
								src : 'http://pokeapi.co'+data.image
							};

							$scope.loadPokemonSprite( );
							
						});

				});
		}

	};

	// cargar 10 pokemones más
	$scope.loadTenPokemon = function(){
		PokemonFact.loadPokemonAjax = [PokemonFact.loadPokemonAjax[1], PokemonFact.loadPokemonAjax[1] + 10];
		// $scope.loadPokemonList( PokemonFact.loadPokemonAjax );
		$scope.loadPokemonList();
	};

	/* si es la primera vez (tendremos vacia la lista de pokemon en la fatoia):
		Añadimos 10 pokemon a la lista de nuestra vista */
	if ( PokemonFact.loadPokemonAjax[1] === 0 ){
		PokemonFact.loadPokemonAjax = [0, 10];

		//recuperar una unica vez la lista de pokemon y almacenarlo en una variable de la factoria
		PokemonRest.getPokedex().
			$promise.then( function (data){

				PokemonFact.listPokemonData = data.pokemon; //LISTA DE POKEMON Y URL
				$scope.loadPokemonList();

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