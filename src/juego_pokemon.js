import Jugador from "./jugador.js";
import Pokemon from "./pokemon.js";


            
const jugador1 = new Jugador()
jugador1.tipo = "jugador"
await jugador1.inicializar()
await jugador1.elegirPokemon()
const jugador2 = new Jugador()
await jugador2.inicializar()
await jugador2.elegirPokemon()
console.log(jugador2.pokemonActual)