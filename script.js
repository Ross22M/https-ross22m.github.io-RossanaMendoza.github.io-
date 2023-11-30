
let intentos = 6;
let diccionario = ['PERLA', 'PERAS', 'CARRO', 'LUJOS', 'LOBOS', 'LUCIA', 'NICOL', 'AVION', 'VOLAR', 'JUEGO']

//La libreria Math sirve para contar cuantos elementos son los que estan 
//dentro del arreglo y comenzar a autoseleccionar cual de estas es la palabra oculta
let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
console.log(palabra);

//Aca utilizo una API para aleatorizar las palabras para el wordle (Las palabras estan en ingles)
// fetch('https://random-word-api.herokuapp.com/word?length=5&lang=en')
//  	.then(response => response.json())
//  	.then(response => {
//          console.log(response)
//          palabra = response[0].toUpperCase()
//      })
//  	.catch(err => console.error(err));

// window.addEventListener('load', init)
// function init(){
//     console.log('Esto se ejecuta solo cuando se carga la pagina web')
// }

//La funcion intentar aparece en el tutorial sin embargo
//le hice una serie de modificaciones para que funcione correctamente 
function intentar(){
    const INTENTO = leerIntento();
    if (INTENTO === palabra ) {
        terminar("<h1>GANASTE</h1>");
        //La funcion mostrarPalabraCorrecta(), esta para mostrar la palabra que escribiste y te dio la victoria
        mostrarPalabraCorrecta();
        return
    }
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i]===palabra[i]){
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green'
        } else if( palabra.includes(INTENTO[i]) ) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'red';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
		intentos--
    if (intentos==0){
        terminar("<h1>PERDISTE</h1>")
        button.style.display = "none";
        //La funcion mostrarPalabraCorrecta(), esta para mostrar la palabra que debiste haber escrito
        mostrarPalabraCorrecta();
    }
}

//Esta funcion fue agregada para digitar en la pantalla la frase 'la palabra correcta era [palabra]'
function mostrarPalabraCorrecta() {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<p>La palabra correcta era: ${palabra}</p>`;
}


const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);
const input = document.getElementById("guess-input");
const valor = input.value;

function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase(); 
    return intento;
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

//Esta linea de codigo fue implementada para el arreglo que contiene mas de un dato tipo texto
Math.floor(Math.random() * 10) + 1;

