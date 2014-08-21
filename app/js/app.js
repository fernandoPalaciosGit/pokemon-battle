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
};

//resetear las dimensiones de canvas al de CSS
var resetCanvas = function (){
	canvas.height = 200;
	canvas.width = 200;
};

//inicializar preloader
var prepararCanvas = function (){
	resetCanvas();

	// dibujar arco de preloader sobre el lienzo
	var	radio = ( canvas.width/2 ) - 16, //reducimos el radio para que se vea nuestro circulo
			posX = (canvas.width/2), // centrado del circulo
			posY = (canvas.height/2);

	ctx.beginPath();
	ctx.arc(posX, posY, radio, 0, Math.PI * 2, true);
	ctx.strokeStyle = 'gray';
	ctx.lineWidth = 8;
	ctx.stroke();
};

// dibujar preloader, progreso de carga de un asset
var progresoCarga = function (init, end){
	var	canvasPreloader = document.getElementById('canvasPreloader'),
			porcentaje = document.getElementById('porcentaje'),

			//problem digest between constructor views
			btnLoadTenMore =	( !!document.getElementById('btnLoadTenMore') ) ?
									document.getElementById('btnLoadTenMore') :  "",
			numPokeSelect =	( !!document.getElementById('numPokeSelect') ) ?
									document.getElementById('numPokeSelect') :  "";
	
	canvasPreloader.style.display = 'block';
	porcentaje.style.display = 'block';

	// relacion porcentual de dos valores en unrango
	var	progress = (( init - end ) + 10) / 10,
			radio = ( canvas.width/2 ) - 16,
			posX	= ( canvas.width/2 ),
			posY	= ( canvas.height/2 ),
			endAngle = progress * (2 * Math.PI);

	// el arco que muestra la carga de la imagen es un trozo de radiovector.
	// igual al tamaño de carga : progress = decimal de la  carga : 0.0 -> 1.0
	ctx.beginPath();
	ctx.arc(posX, posY, radio, 1.5 * Math.PI, (1.5 * Math.PI) + endAngle, false);
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 20;
	ctx.stroke();

	// cuando lleguemos al final de la carga mostramos el wrapper de imagenes
	numPokeSelect.innerText = init;
	
	if ( init === end ) {
		btnLoadTenMore.disabled = false;
		porcentaje.innerText = 'listo';
		canvasPreloader.style.display = 'none';
		porcentaje.style.display = 'none';	
	} else {
		btnLoadTenMore.disabled = true;
		porcentaje.innerText = (progress*100) + "%" ;
	}
};

( function ( w, ng ){
	
	ng.module('pokemonApp', [
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
			$httpProvider.defaults.headers.common["Accept"]       = "application/json";
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
	
	//GLOBAL
	canvas = document.getElementById('canvasPreloader');
	ctx = canvas.getContext('2d');

}( window, window.angular ) );