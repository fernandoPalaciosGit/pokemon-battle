'use strict';

var Pokemon = function(n, num, url){
	this.pokeName = n;
	this.pokeNum = num;
	this.pokeUrl = url;
};

// Controlador de /selection.html
var PokemonSelectController = function ($scope, PokemonRest, PokemonFact){
	$scope.pokemonList = [];

	// cargar 10 pokemones más
	$scope.loadTenPokemon = function(){
		PokemonFact.loadPokemonAjax = [PokemonFact.loadPokemonAjax[1], PokemonFact.loadPokemonAjax[1] + 10];
		$scope.loadPokemonList( PokemonFact.loadPokemonAjax );
	};

	//recuperamos la lista de todos los pokemon (solo nombres)
	$scope.loadPokemonList = function (loadPokeAjax){ // [x, y]
		PokemonRest.getPokedex().
			$promise.then( function (data){ // [270 objetos]

				// desde el primero hasta el ultimo
				for (var i = loadPokeAjax[0]; i < loadPokeAjax[1]; i++) {
					
					var newPokemon = new Pokemon(	data.pokemon[i].name,
															data.pokemon[i].resource_uri.split('/')[3],
															data.pokemon[i].resource_uri );

					$scope.pokemonList.push( newPokemon );
					
					// var dataPokemon = {
					// 	pokeName: data.pokemon[i].name,
					// 	pokeNum : data.pokemon[i].resource_uri.split('/')[3],
					// 	pokeUrl : data.pokemon[i].resource_uri,
					// 	pokeImg : {
					// 		alt: 'imagen de '+data.pokemon[i].name,
					// 		src: ''
					// 	},
					// 	pokeDesc : 'descripcion de '+data.pokemon[i].name
					// };
				}

			}).
			then( function (data){
				// $scope.loadPokemonSprite(loadPokeAjax);				
			});
	};

	// imagen y descripcion de los pokemons (solo los 10 primeros)
	$scope.loadPokemonSprite = function (loadPokeAjax){

		// $scope.loadPokemonAjax = loadPokeAjax;
		var i = $scope.loadPokemonAjax[0];

		PokemonRest.getPokemon( $scope.pokemonList[ i ].pokeNum ).
			$promise.then( function (data){
							console.log(data);

				PokemonRest.getSprite( data.sprites[0].resource_uri ).
					$promise.then( function (data){

						$scope.pokemonList[i].pokeImg = {
							alt : data.name,
							src : 'http://pokeapi.co'+data.image
						};

						// comprobar que estamos iterando en el rango de $scope.loadPokemonAjax
						if( i < $scope.loadPokemonAjax[1] ){
							$scope.loadPokemonAjax[0] = i + 1;
							$scope.loadPokemonSprite( $scope.loadPokemonAjax );
						}
						
					});

			});

	};


	// recuperar de la factoria de pokemons, los que tenemos cargados con toda su informacion
	for (var i = 0; i < PokemonFact.loadPokemonAjax[1]; i++) { 
		$scope.pokemonList.push(PokemonFact.listPokemon[i]);
	};

	// si es la primera, añadimos 10 pokemon a la listavez que cargamos los pokemon
	if ( PokemonFact.loadPokemonAjax[1] === 0 ){
		PokemonFact.loadPokemonAjax = [0, 10];
		$scope.loadPokemonList( PokemonFact.loadPokemonAjax );
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