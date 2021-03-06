'use strict';

// CONTROLADOR de /battle.html
var PokemonBattleController = function ($scope, $location, PokemonFact){
	// ocultamos el preloader
	document.getElementsByClassName('preloaderPokemon')[0].style.visibility = 'hidden';
	
	$scope.userBattlePokemon = PokemonFact.listPokemonBattle.userPokemon;
	$scope.machineBattlePokemon = PokemonFact.listPokemonBattle.machinePokemon;


	console.log($scope.userBattlePokemon, $scope.machineBattlePokemon);
};

// SCOPE DE CONTROLADORES
angular.module('pokemonApp.controllers', []).
  controller( 'PokemonBattleCtrl', PokemonBattleController );

//INJECCION DE DEPENDENCIAS
PokemonBattleController.$inject = [ '$scope', '$location', 'PokemonFact' ];