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
  ataqueActual = undefined;

  _inicializarCpu = () => {
    //inicializa un jugador automatico
    this.nombre = "cpu";
    for (let i = 0; i < 3; i += 1) {
      const datosPokemon = lodash.sample(listaPokemones.lista);
      const pokemon = new Pokemon();
      pokemon.rellenar(datosPokemon);
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

    for (const datosPokemon of pokemonesElegidos) {
      const pokemon = new Pokemon();
      pokemon.rellenar(datosPokemon);
      this.pokedex.push(pokemon);
    }
  };

  inicializar = async () => {
    if (this.tipo === "cpu") {
      this._inicializarCpu();
    } else {
      await this._inicializarJugador();
    }
  };
  obtenerPokemonesVivos = () =>
    this.pokedex.filter((pokemon) => pokemon.vida > 0);

  _elegirPokemonCpu = () => {
    this.pokemonActual = lodash.sample(this.obtenerPokemonesVivos());
  };

  _elegirPokemonJugador = async () => {
    const opcionesPokemon = this.obtenerPokemonesVivos().map((pokemon) => ({
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

  obtenerAtaquesValidos = () =>
    this.pokemonActual.ataques.filter(
      (ataque) => ataque.nivelMin <= this.pokemonActual.nivel
    );

  _elegirAtaqueCpu = () => {
    this.ataqueActual = lodash.sample(this.obtenerAtaquesValidos());
  };

  _elegirAtaqueJugador = async () => {
    console.log("Seleccione un ataque");
    const opcionesAtaques = this.obtenerAtaquesValidos().map(
      (ataqueElegido) => ({
        name: ataqueElegido.nombre,
        value: ataqueElegido,
      })
    );
    this.ataqueActual = await input.select(
      "Seleccione un ataque",
      opcionesAtaques
    );
  };

  elegirAtaque = async () => {
    if (this.tipo === "cpu") {
      this._elegirAtaqueCpu();
    } else {
      await this._elegirAtaqueJugador();
    }
  };

  atacar = (jugadorAtacado) => {
    const damage = this.ataqueActual.damage;
    console.log("=============================================");
    console.log(
      `${this.pokemonActual.nombre} ataca a ${jugadorAtacado.pokemonActual.nombre} y le causa ${damage} de daño`
    );
    jugadorAtacado.pokemonActual.vida -= damage;

    if (jugadorAtacado.pokemonActual.vida <= 0) {
      jugadorAtacado.pokemonActual.vida = 0;
      console.log(`${jugadorAtacado.pokemonActual.nombre} quedo debilitado`);
      jugadorAtacado.pokemonActual = undefined;
    }
    console.log("=============================================");
  };
}

export default Jugador;
