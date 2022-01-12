import input from "input";
import Jugador from "./jugador.js";

class Batalla {
  jugador1 = undefined;
  jugador2 = undefined;
  turnoActual = 1;
  juegoTerminado = false;
  combateTerminado = false;

  saludoBienvenida = () => {
    console.log("=============================================");
    console.log("------Bienvenido a la batalla Pokemon-------");
    console.log("=============================================");
  };

  nuevaBatalla = async () => {
    const comienzo = await input.text(
      "¿Desea comenzar una nueva batalla?[S] para continuar[N] para salir"
    );
    if (comienzo === "S") {
      this.juegoTerminado = false;
      this.combateTerminado = false;
    } else {
      this.juegoTerminado = true;
    }
  };

  crearJugadores = async () => {
    const cantidadJugadores = await input.text(
      "Si desea 1 jugador escriba[1], si desea 2 jugadores escriba[2]"
    );
    if (cantidadJugadores === "1") {
      this.jugador1 = new Jugador();
      this.jugador2 = new Jugador("cpu");
    } else {
      this.jugador1 = new Jugador();
      this.jugador2 = new Jugador();
    }
    await this.jugador1.inicializar(1);
    await this.jugador2.inicializar(2);
  };

  mostrarJugadorActual = () => {
    if (this.turnoActual === 1) {
      console.log("=============================================");
      console.log(`            Es el turno de ${this.jugador1.nombre}`);
      console.log("=============================================");
    } else {
      console.log("=============================================");
      console.log(`            Es el turno de ${this.jugador2.nombre}`);
      console.log("=============================================");
    }
  };

  mostrarPokemones = () => {
    this.jugador1.mostrarPokemones();
    this.jugador2.mostrarPokemones();
  };

  cambioTurno = () => {
    if (this.turnoActual === 1) {
      this.turnoActual = 2;
    } else {
      this.turnoActual = 1;
    }
  };
  menuAcciones = async (jugador, oponente) => {
    let desicion = "";
    if (jugador.tipo !== "cpu") {
      const acciones = [
        {
          name: "Elegir ataque",
          value: "ataque",
        },
        {
          name: "Cambiar de pokemon",
          value: "cambio",
        },
      ];
      desicion = await input.select("Elija una accion", acciones);
    } else {
      desicion = "ataque";
    }

    switch (desicion) {
      case "ataque":
        await jugador.elegirAtaque();
        jugador.atacar(oponente);
        break;
      case "cambio":
        await jugador.elegirPokemon();
        break;
      default:
        console.log("Opción no válida");
        break;
    }
  };

  peleaTerminada = async () => (this.combateTerminado = true);
}

export default Batalla;
