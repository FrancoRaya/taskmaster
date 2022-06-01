//Ingreso de dato
let numero = parseInt(prompt("Ingresá un número para multiplicar. De lo contrario, ingresá: 0"));

//Operación
do {
    //Si el número ingresado es <= 20, se multiplica
    for (let i = 0; i <= 30; i++) {
        let resultado = numero * i
        console.log (i + " x " + numero + " = " + resultado)
    }

    //Condición de salida
    numero =prompt("Multiplicación terminada. Ingresá un número para multiplicar. De lo contrario, ingresá: 0");
} while (numero != 0)

