/**
 * 2C=Two of Clubes(Tréboles)
 * 2D=Two of Diamonds(Tréboles)
 * 2H=Two of Hearts(Tréboles)
 * 2S=Two of Spades(Tréboles)
 */
let deck=[];
const tipos     =['C','D','H','S'];
const especiales=['A','J','Q','K'];
let puntosJugador=0,
    puntosComputadora=0;
//Referencias del HTML
const puntosHTML=document.querySelectorAll('small');
const divCartasJugador=document.querySelector('#jugador-cartas');
const divCartasComputadora=document.querySelector('#computadora-cartas');
const btnPedir= document.querySelector('#btnPedir');
const btnDetener=document.querySelector('#btnDetener');

console.log(btnPedir);
// esta funcion crea una baraja aleatoria
const crearDeck=()=>{
    for (let i = 2; i <=10; i++) {
         for (let tipo of tipos) {
             deck.push(i+tipo);
         }     
    }
    //esta parte toma los especiales por ejemplo AH As de hearts (Corazones)
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp+tipo);
        }
    }
    
    deck=_.shuffle(deck);
   // console.log(deck);
    return deck;
}
// crear una funcion para pedir cartas

crearDeck();
//esta funcion me permite tomar una carta
const pedirCarta= ()=>{
    if(deck.length===0){
     throw 'No hay cartas en el deck';
    }
    const carta=deck.pop();
   // console.log(deck);
   // console.log(carta);
    return carta; 
}
//Esta funcion nos permite sacar el valor de la carta
pedirCarta();
const valorCarta=(carta)=> {

    const valor=carta.substring(0,carta.length-1);
   // console.log(valor);
    //si es un numero ya que puede ser un caracter especial
    return ( isNaN(valor) )?
           ( valor=='A'   )? 11:10
           :valor*1;
}
//Turno de la computadora
const turnoComputadora=(puntosMinimos)=>{
    do{
        const carta=pedirCarta();
        //sumar cada valor de las cartas
        puntosComputadora=puntosComputadora+valorCarta( carta );
        puntosHTML[1].innerText=puntosComputadora;   
        // console.log(carta);
        const imgCarta=document.createElement('img');
        //<img class="carta" src="assets/cartas/2C.png"></img>
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');//--->agregarle estilos
        divCartasComputadora.append(imgCarta);
        if(puntosMinimos>21){
            break;
        }


    }while((puntosComputadora<puntosMinimos)&&(puntosMinimos<=21));
}
const valor=valorCarta(pedirCarta());
btnDetener.addEventListener('click',()=>{

    btnPedir.disabled=true;
    btnDetener.disabled=true;
    turnoComputadora(puntosJugador);
});


//eventos
btnPedir.addEventListener('click',()=>{
    const carta=pedirCarta();
    //sumar cada valor de las cartas
    puntosJugador=puntosJugador+valorCarta( carta );
    puntosHTML[0].innerText=puntosJugador;   
   // console.log(carta);
    const imgCarta=document.createElement('img');
    // <img class="carta" src="assets/cartas/2C.png"></img>
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);
    if(puntosJugador>21){
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled=true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador===21){
        console.warn('21, genial'); 
        turnoComputadora(puntosJugador);
    }
});
