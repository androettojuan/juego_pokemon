import Batalla from "./batalla.js";

const batalla = new Batalla();

while (!batalla.juegoTerminado) {
  batalla.saludoBienvenida();
  await batalla.inicioBatalla();

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
    const playerActual = undefined;
    const oponente = undefined;
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
    await batalla.playerActual.elegirAtaque();

    // Se ejecuta el ataque
    batalla.playerActual.atacar(oponente);
  }
}

