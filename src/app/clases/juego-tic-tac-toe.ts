import { Juego } from '../clases/juego'
export class JuegoTicTacToe extends Juego{
    jugador1:number = 1;
    jugador2:number = 2;
    turno:number = 0;
    juegoEmpezado:boolean = false;
    empate:boolean = false;
    matriz:any = 
    [
        {
            lugar: 1,
            jugado: 0
        },
        {
            lugar: 2,
            jugado: 0
        },
        {
            lugar: 3,
            jugado: 0
        },
        {
            lugar: 4,
            jugado: 0
        },
        {
            lugar: 5,
            jugado: 0
        },
        {
            lugar: 6,
            jugado: 0
        },
        {
            lugar: 7,
            jugado: 0
        },
        {
            lugar: 8,
            jugado: 0
        },
        {
            lugar: 9,
            jugado: 0
        }
    ]
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super("Tic Tac Toe",gano,jugador);
    }
    public Verificar(){
        let ret:string = "Nadie";
        //Jugador 1
        if (this.matriz[0]['jugado'] == 1 && this.matriz[1]['jugado'] == 1 && this.matriz[2]['jugado'] == 1) {
            ret = "Jugador 1 GANA!"
            //this.juegoEmpezado = false;
            this.gano = true;
        }
        else if (this.matriz[3]['jugado'] == 1 && this.matriz[4]['jugado'] == 1 && this.matriz[5]['jugado'] == 1) {
            ret = "Jugador 1 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[6]['jugado'] == 1 && this.matriz[7]['jugado'] == 1 && this.matriz[8]['jugado'] == 1) {
            ret = "Jugador 1 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[0]['jugado'] == 1 && this.matriz[3]['jugado'] == 1 && this.matriz[6]['jugado'] == 1) {
            ret = "Jugador 1 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[1]['jugado'] == 1 && this.matriz[4]['jugado'] == 1 && this.matriz[7]['jugado'] == 1) {
            ret = "Jugador 1 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[2]['jugado'] == 1 && this.matriz[5]['jugado'] == 1 && this.matriz[8]['jugado'] == 1) {
            ret = "Jugador 1 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[0]['jugado'] == 1 && this.matriz[4]['jugado'] == 1 && this.matriz[8]['jugado'] == 1) {
            ret = "Jugador 1 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[2]['jugado'] == 1 && this.matriz[4]['jugado'] == 1 && this.matriz[6]['jugado'] == 1) {
            ret = "Jugador 1 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        //Jugador 2
        else if (this.matriz[0]['jugado'] == 2 && this.matriz[1]['jugado'] == 2 && this.matriz[2]['jugado'] == 2) {
            ret = "Jugador 2 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[3]['jugado'] == 2 && this.matriz[4]['jugado'] == 2 && this.matriz[5]['jugado'] == 2) {
            ret = "Jugador 2 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[6]['jugado'] == 2 && this.matriz[7]['jugado'] == 2 && this.matriz[8]['jugado'] == 22) {
            ret = "Jugador 2 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[0]['jugado'] == 2 && this.matriz[3]['jugado'] == 2 && this.matriz[6]['jugado'] == 2) {
            ret = "Jugador 2 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[1]['jugado'] == 2 && this.matriz[4]['jugado'] == 2 && this.matriz[7]['jugado'] == 2) {
            ret = "Jugador 2 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[2]['jugado'] == 2 && this.matriz[5]['jugado'] == 2 && this.matriz[8]['jugado'] == 2) {
            ret = "Jugador 2 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[0]['jugado'] == 2 && this.matriz[4]['jugado'] == 2 && this.matriz[8]['jugado'] == 2) {
            ret = "Jugador 2 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        else if (this.matriz[2]['jugado'] == 2 && this.matriz[4]['jugado'] == 2 && this.matriz[6]['jugado'] == 2) {
            ret = "Jugador 2 GANA!"
            this.gano = true;
            //this.juegoEmpezado = false;
        }
        if(this.matriz[0]['jugado'] != 0 && this.matriz[1]['jugado'] != 0 && this.matriz[2]['jugado'] != 0 && this.matriz[3]['jugado'] != 0 && this.matriz[4]['jugado'] != 0 && this.matriz[5]['jugado'] != 0 && this.matriz[6]['jugado'] != 0 && this.matriz[7]['jugado'] != 0 && this.matriz[8]['jugado'] != 0){
            this.empate = true;
            ret = "Empate";
            this.gano = true;
        }
        return ret;
    }
    public NuevoJuego(){
        for (var i = 0; i < this.matriz.length; i++) {
            this.matriz[i]['jugado'] = 0;
        }
        this.turno = 1;
        this.juegoEmpezado = true;
        this.gano = false;
        this.empate = false;
    }
    public TurnoJugado(lugar:number){
        this.matriz[lugar]['jugado'] = this.turno;        
        if (this.turno == 0) {
            this.turno = 1;
        }
        else if(this.turno == 1){
            this.turno = 2;
        }
        else if(this.turno == 2){
            this.turno = 1;
        }
    }
}
