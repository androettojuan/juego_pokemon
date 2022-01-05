const EXP_LEVEL = [150, 200, 250];

class Pokemon {
  nombre = "";
  vida = 100;
  vidaBase = 100;
  nivel = 1;
  tipos = [];
  exp = 0;
  ataques = []
  
  mostrar = () => {
    console.log("==========================================");
    console.log(`Estadisticas de ${this.nombre} (tipo ${this.tipo})`);
    console.log(
      `Vida: ${this.vida}/${this.vidaBase} - Nivel: ${this.nivel}, Experiencia: ${this.exp}`
    );
    console.log("==========================================");
  };

  otorgarExp = (cantidadExp) => {
    if (this.vida > 0) {
      let exp_necesaria = 0;
      if (this.nivel > EXP_LEVEL.length) {
        exp_necesaria = EXP_LEVEL[EXP_LEVEL.length - 1];
      } else {
        exp_necesaria = EXP_LEVEL[this.nivel - 1];
      }

      this.exp += cantidadExp;
      console.log("==========================================");
      console.log(`${this.nombre} recibe ${cantidadExp} de experiencia`);
      if (this.exp >= exp_necesaria) {
        this.nivel += 1;
        this.exp -= exp_necesaria;
        console.log(
          `${this.nombre} Subio al nivel ${this.nivel} felicitaciones!!!`
        );
      }
      console.log("==========================================");
    }
  };

  restaurarVida = () => {
    this.vida = this.vidaBase;
    console.log("==========================================");
    console.log(`La vida de ${this.nombre} fue restaurada`);
    console.log("==========================================");
  };


}

export default Pokemon;
