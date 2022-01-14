import Batalla from "./batalla.js";

const batalla = new Batalla();

batalla.saludoBienvenida();

//Crear jugadores
await batalla.crearJugadores();

while (!batalla.juegoTerminado) {
  //crear jugador 2 en caso de que corresponda
  batalla.crearJugadorDos()
  //Mostrar Pokemones elegidos y pokemones del rival
  batalla.mostrarPokemones();

  //Ambos jugadores eligen el pokemon con el que se empezara a pelear
  await batalla.jugador1.elegirPokemon();
  await batalla.jugador2.elegirPokemon();

  let ganador = undefined;
  let perdedor = undefined;
  //Empieza la pelea
  while (!batalla.combateTerminado) {
    // Creo variables del jugador actual y del oponente
    let playerActual = undefined;
    let oponente = undefined;
    if (batalla.turnoActual === 1) {
      playerActual = batalla.jugador1;
      oponente = batalla.jugador2;
    } else {
      playerActual = batalla.jugador2;
      oponente = batalla.jugador1;
    }
    batalla.mostrarJugadorActual();

    // Si el pokemon actual muerte tiene que ser remplazado
    if (!playerActual.pokemonActual) {
      await playerActual.elegirPokemon();
    }
    // Se elige el ataque que se va a usar o cambiar de pokemon
    await batalla.menuAcciones(playerActual, oponente);

    if (!oponente.algunPokemonVivo()) {
      ganador = playerActual;
      batalla.jugador2 = undefined
      batalla.combateTerminado = true;
    } else {
      //cambiar de turno
      batalla.cambioTurno();
    }
  }
  //mostrar ganador
  batalla.mostrarGanador(ganador);
  // otorgar experiencia
  batalla.otorgarExpPok(ganador);
  // restaurar pokemones
  batalla.restaurarVidaPok(batalla.jugador1);
  await batalla.nuevaBatalla();
}
