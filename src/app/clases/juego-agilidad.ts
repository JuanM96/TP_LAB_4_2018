import { Juego } from '../clases/juego'
export class JuegoAgilidad extends Juego {
    numero1:number;
    numero2:number;
    operador:any;
    resultado:number;
    juegoEmpezado:boolean = false;
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super("Agilidad Aritmetica",gano,jugador);
    }
    Verificar(respuesta:number){
        if (this.resultado == respuesta) {
            this.gano = true;
            this.juegoEmpezado = false;
        }
        return this.gano;
    }
    NuevoJuego(){
        this.numero1 = this.ObtenerNumero();
        this.numero2 = this.ObtenerNumero();
        this.ObtenerOperador();
        this.juegoEmpezado = true;
        this.gano = false;
    }
    ObtenerNumero(){
        return Math.floor((Math.random() * 100) + 1);
    }
    ObtenerOperador(){
        let opcion:number = Math.floor((Math.random() * 2) + 1);
        switch (opcion) {
            case 1:
                this.operador = "+";
                this.resultado = this.numero1 + this.numero2;
                break;
            case 2:
                this.operador = "-";
                this.resultado = this.numero1 - this.numero2;
                break;
           /* case 3:
                this.operador = "*";
                this.resultado = this.numero1 * this.numero2;
                break;
            case 4:
                this.operador = "/";
                this.resultado = this.numero1 / this.numero2;
                break;*/
        }
    }
}
