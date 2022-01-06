import Jugador from "./jugador.js";
import Pokemon from "./pokemon.js";


            
const jugador1 = new Jugador()
jugador1.tipo = "cpu"
await jugador1.inicializar()
await jugador1.elegirPokemon()
await jugador1.elegirAtaque()
const jugador2 = new Jugador()
await jugador2.inicializar()
await jugador2.elegirPokemon()
await jugador2.elegirAtaque()
