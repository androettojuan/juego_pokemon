import input from "input";
import Jugador from "./jugador.js";

class Batalla {
  jugador1 = undefined;
  jugador2 = undefined;
  turnoActual = 1;
  juegoTerminado = false;

  inicioPelea = async () => {
    const comienzo = await input.text(
      "¿Desea comenzar una nueva batalla?[S] para continuar[N] para salir"
    );
    if (comienzo === "S") {
      this.juegoTerminado = false;
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
    await this.jugador1.inicializar(1)
    await this.jugador2.inicializar(2)
  };

  mostrarPokemones = () =>{

  }

  cambioTurno = () => {
    if (this.turnoActual === 1) {
      this.turnoActual = 2;
    } else {
      this.turnoActual = 1;
    }
  };
}

export default Batalla;
