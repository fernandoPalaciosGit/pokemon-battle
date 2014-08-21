'use strict';

// CONTROLADOR de /info.html
var PokemonInfoController = function ($scope, $location, $urlParams, PokemonRest, PokemonFact){
	// ocultamos el preloader
	document.getElementsByClassName('preloaderPokemon')[0].style.visibility = 'hidden';

	$scope.routeParam = {
		id : $urlParams.id, // si accedo a esta vista por un pokemon ya cargado en nuestra lista
		pokeUrl : window.decodeURIComponent( $urlParams.pokeId.replace(/\u0020/g, "/") )
	};

	if( isEmpty($scope.routeParam.id) ){
		// Ajax to ApiRest for search pokemon
		PokemonRest.getPokemon( $scope.routeParam.pokeUrl.split('/')[3] ).
				$promise.then( function ( data ){

					// datos de interes a nuestros pokemon
					var	attack		= data.attack,
							defense      = data.defense,
							desc         = data.descriptions,
							evol         = data.evolutions,
							speed        = data.speed,
							weight       = data.weight,
							moves        = data.moves,
							name         = data.name;

					PokemonRest.getUri( data.sprites[0].resource_uri ).
						$promise.then( function ( data ){
							var	dataImg = { alt: data.name, src: 'http://pokeapi.co'+data.image },
									pokeID = $scope.routeParam.pokeUrl.split('/')[3],
									uri = $scope.routeParam.pokeUrl;

							// seleccionamos una descripcion al azar
							var	randomDescription = Math.floor( (Math.random() * desc.length) ),
									descriptionUrl    = desc[randomDescription].resource_uri;

							PokemonRest.getUri( descriptionUrl ).
								$promise.then( function ( data ){
									var	descRandom = data.description,
											newPokemon = angular.copy( new Pokemon(	'no', name, pokeID, uri, dataImg, attack,
																									defense, descRandom, evol, speed, weight, moves ));
									$scope.userPokemon = newPokemon;
									PokemonFact.listPokemonBattle.userPokemon = newPokemon;
								} );

						});

				});
	}else{
		var newPokemon = angular.copy( PokemonFact.listPokemon[$scope.routeParam.id] );
		$scope.userPokemon = newPokemon;
		PokemonFact.listPokemonBattle.userPokemon = newPokemon;
	}

	var randomPokemon = Math.floor( (Math.random() * PokemonFact.listPokemon.length) );
	var newPokemon = angular.copy( PokemonFact.listPokemon[randomPokemon] );
	$scope.machinePokemon = newPokemon;
	PokemonFact.listPokemonBattle.machinePokemon = newPokemon;
	
	$scope.loadBattle = function (){
		if( isEmpty($scope.userPokemon) || isEmpty($scope.machinePokemon) ){
			window.alert('Falta algun contrincario para la batalla\nSelecciona otro pokemon');
			$location.path('/selection').replace();
		}else{
			$location.path('/battle').replace();
		}
	};
};

// SCOPE DE CONTROLADORES
angular.module('pokemonApp.controllers', []).
  controller( 'PokemonInfoCtrl', PokemonInfoController );

//INJECCION DE DEPENDENCIAS
PokemonInfoController.$inject = [ '$scope', '$location', '$routeParams', 'PokemonRestFullFact', 'PokemonFact' ];