import Batalla from "./batalla.js";

const batalla = new Batalla();

batalla.saludoBienvenida();

while (!batalla.juegoTerminado) {
  //Crear jugadores
  await batalla.crearJugadores();

  //Mostrar Pokemones elegidos y pokemones del rival
  batalla.mostrarPokemones();

  //Ambos jugadores eligen el pokemon con el que se empezara a pelear
  await batalla.jugador1.elegirPokemon();
  await batalla.jugador2.elegirPokemon();

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
    await batalla.menuAcciones(playerActual, oponente)

    //cambiar de turno
    batalla.cambioTurno();
  }
  //mostrar ganador
  // otorgar experiencia
  // restaurar pokemones
  await batalla.nuevaBatalla();
}
