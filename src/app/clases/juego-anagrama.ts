import { Juego } from '../clases/juego'
export class JuegoAnagrama extends Juego{
    palabraSecreta:string;
    palabraMezclada:string;
    juegoEmpezado:boolean;
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super("Anagrama",gano,jugador);
    }
    public ObtenerPalabra(){
        let palabras:any = [
            {
                palabra:"anagrama",
                anagrama:"amagaran"
            },
            {
                palabra:"simple",
                anagrama:"pilmes"
            },
            {
                palabra:"sermon",
                anagrama:"normes"
            },
            {
                palabra:"pariente",
                anagrama:"aprieten"
            },
            {
                palabra:"ventanal",
                anagrama:"levantan"
            },
            {
                palabra:"colchon",
                anagrama:"choclon"
            },
            {
                palabra:"india",
                anagrama:"nidia"
            },
            {
                palabra:"permanente",
                anagrama:"emparenten"
            },
            {
                palabra:"enfermos",
                anagrama:"frenemos"
            },
            {
                palabra:"mesa",
                anagrama:"ames"
            },
            {
                palabra:"silla",
                anagrama:"lilas"
            },
            {
                palabra:"celular",
                anagrama:"curalle"
            },
            {
                palabra:"riesgo",
                anagrama:"sergio"
            },
            {
                palabra:"camino",
                anagrama:"monica"
            },
            {
                palabra:"micaela",
                anagrama:"camelia"
            },
            {
                palabra:"roma",
                anagrama:"mora"
            }];
        let numRandom:number = Math.floor((Math.random() * 16));
        console.log(numRandom);
        this.palabraSecreta = palabras[numRandom]['palabra'];
        this.palabraMezclada = palabras[numRandom]['anagrama'];
    }
    public NuevoJuego(){
        this.ObtenerPalabra();
        console.log(this.palabraMezclada);
        console.log(this.palabraSecreta);
        this.gano = false;
        this.juegoEmpezado = true;
    }
    public Verificar(respuesta:string){
        if (this.palabraSecreta == respuesta) {
            this.gano = true;
            this.juegoEmpezado = false;
        }
        else{
            this.gano = false;
            this.juegoEmpezado = false;
        }
    }
}
