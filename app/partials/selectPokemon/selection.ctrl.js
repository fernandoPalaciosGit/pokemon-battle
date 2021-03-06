'use strict';

// CONTROLADOR de /selection.html
var PokemonSelectController = function ($scope, PokemonRest, PokemonFact){
	//mostramos el preloader
	document.getElementsByClassName('preloaderPokemon')[0].style.visibility = 'visible';

	//lista de pokemon cargados en la vista
	$scope.pokemonList = PokemonFact.listPokemon;
	$scope.pokemonApiList = PokemonFact.listPokemonData;

	$scope.numPokeSelect = PokemonFact.listPokemon.length;
	$scope.allPokemonNum =  PokemonFact.listPokemonData.length;

	//valores predeterminados de filtros de ordenacion 'orderBy'
	$scope.orderProp = ''; // 'idList'
	$scope.reverse = 1;

	// Constructor de lista de Pokemon
	var loadPokemonList = function (){

		var i = PokemonFact.loadPokemonAjax[0];

		// proceso de carga de assets
		progresoCarga(i, PokemonFact.loadPokemonAjax[1]);

		// comprobar que estamos iterando en el rango de $scope.loadPokemonAjax
		if( i < PokemonFact.loadPokemonAjax[1] ){
			PokemonFact.loadPokemonAjax[0] = i + 1;

			var pokenum = PokemonFact.listPokemonData[ i ].resource_uri.split('/')[3];

			PokemonRest.getPokemon( pokenum ).
				$promise.then( function ( data ){

					// datos de interes a nuestros pokemon
					var	attack		 = data.attack,
							defense      = data.defense,
							desc         = data.descriptions,
							evol         = data.evolutions,
							speed        = data.speed,
							weight       = data.weight,
							moves        = data.moves;

					PokemonRest.getUri( data.sprites[0].resource_uri ).
						$promise.then( function ( data ){
							var	listApiPoke			= PokemonFact.listPokemonData,
									dataImg           = { alt: data.name, src: 'http://pokeapi.co'+data.image },
									name              = listApiPoke[i].name,
									pokeID            = listApiPoke[i].resource_uri.split('/')[3],
									uri               = listApiPoke[i].resource_uri;

							// seleccionamos una descripcion al azar
							var	randomDescription = Math.floor( (Math.random() * desc.length) ),
									descriptionUrl    = desc[randomDescription].resource_uri;

							PokemonRest.getUri( descriptionUrl ).
								$promise.then( function ( data ){
									var	descRandom = data.description,
											newPokemon = new Pokemon(	i, name, pokeID, uri, dataImg, attack,
																				defense, descRandom, evol, speed, weight, moves );
									
									// cargamos el pokemon en la factoria,
									// el digest de Angular se encargra de asignar los valores a $scope.pokemonList
									PokemonFact.listPokemon.push( newPokemon );
									
									loadPokemonList(); // RECURSIVIDAD
								} );

						});

				});
		} else {
			// finalizo la carga de la lista
		}

	};

	// cargar 10 pokemones más
	$scope.loadTenPokemon = function(){
		// document.getElementById('btnLoadTenMore').disabled = true;
		PokemonFact.loadPokemonAjax = [PokemonFact.loadPokemonAjax[1], PokemonFact.loadPokemonAjax[1] + 10];
		//inicializar preloader
		prepararCanvas();
		loadPokemonList();
	};

	/* si es la PRIMERA VEZ (tendremos vacia la lista de pokemon en la fatoia):
		Añadimos 10 pokemon a la lista de nuestra vista */
	if ( PokemonFact.loadPokemonAjax[1] === 0 ){
			PokemonFact.loadPokemonAjax = [0, 10];

		//recuperar una unica vez la lista de pokemon y almacenarlo en una variable de la factoria
		PokemonRest.getPokedex().
			$promise.then( function (data){

				PokemonFact.listPokemonData = data.pokemon; //LISTA DE POKEMON Y URL
				$scope.pokemonApiList = data.pokemon;

				$scope.allPokemonNum = PokemonFact.listPokemonData.length;
				//inicializar preloader
				prepararCanvas();
				loadPokemonList();

			});
	}
};

//INJECCION DE DEPENDENCIAS
window.angular.module('pokemonApp.controllers', []).
  controller( 'PokemonSelectCtrl', PokemonSelectController );

//INJECCION DE DEPENDENCIAS
PokemonSelectController.$inject = [ '$scope', 'PokemonRestFullFact', 'PokemonFact'];