import input from "input";
import lodash from "lodash";
import { createRequire } from "module";
import Pokemon from "./pokemon.js";
const require = createRequire(import.meta.url);
const listaPokemones = require("./listaPokemon.json");

class Jugador {
  nombre = "";
  pokedex = [];
  pokemonActual = undefined;
  tipo = "cpu";

  _inicializarCpu = () => {
    //inicializa un jugador automatico
    this.nombre = "cpu";
    for (let i = 0; i < 3; i += 1) {
      const datosPokemon = lodash.sample(listaPokemones.lista)      
      const pokemon = new Pokemon();
      pokemon.nombre = datosPokemon.nombre;
      pokemon.vida = datosPokemon.vidaBase;
      pokemon.vidaBase = datosPokemon.vidaBase;
      pokemon.tipos = datosPokemon.tipos;
      this.pokedex.push(pokemon);
      
    }
  };

  _inicializarJugador = async () => {
    //inicializar jugador manual
    // Elegimos el nombre
    this.nombre = await input.text("¿Cual es tu nombre?", {
      default: "Player",
    });

    // Mapeamos la lista de pokemones para preguntarle al usuario
    const opciones = listaPokemones.lista.map((pokemon) => ({
      name: pokemon.nombre,
      value: pokemon,
    }));

    // Elegimos 3 pokemones
    const pokemonesElegidos = await input.checkboxes(
      "Elige 3 pokemones",
      opciones,
      {
        validate: (resp) => {
          if (resp.length === 3) {
            return true;
          } else {
            return "No elegiste la cantidad correcta";
          }
        },
      }
    );

    for (const pokemon of pokemonesElegidos) {
      const nuevoPokemon = new Pokemon();
      nuevoPokemon.nombre = pokemon.nombre;
      nuevoPokemon.vida = pokemon.vidaBase;
      nuevoPokemon.vidaBase = pokemon.vidaBase;
      nuevoPokemon.tipos = pokemon.tipos;
      this.pokedex.push(nuevoPokemon);
    }
  };

  inicializar = async () => {
    if (this.tipo === "cpu") {
      this._inicializarCpu();
    } else {
      await this._inicializarJugador();
    }
  };

  _elegirPokemonCpu = () => {
    this.pokemonActual = lodash.sample(this.pokedex);
  };

  _elegirPokemonJugador = async () => {
    const pokemonesVivos = this.pokedex.filter((pokemon) => pokemon.vida > 0);
    const opcionesPokemon = pokemonesVivos.map((pokemon) => ({
      name: pokemon.nombre,
      value: pokemon,
    }));
    this.pokemonActual = await input.select(
      "Seleccione un Pokemon",
      opcionesPokemon
    );
  };

  elegirPokemon = async () => {
    if (this.tipo === "cpu") {
      this._elegirPokemonCpu();
    } else {
      await this._elegirPokemonJugador();
    }
  };
}
export default Jugador;
