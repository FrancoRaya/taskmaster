//Ingreso de datos
    //Nombre del proyecto
    let nomProyecto = prompt ("Ingresá el nombre del proyecto que querés trackear");
    console.log (nomProyecto);

    //Costo por hora
    let costo = prompt ("Ahora, definamos tu costo por hora. Ingresá una de las siguientes opciones: \n 1- Conozco mi costo por hora \n 2- No conozco mi costo por hora");
    console.log (costo);

    //Cálculo del costo por hora
    switch (costo) {
        //Conoce el costo por hora = ingreso del costo
        case "1":
            let ingresoCosto = prompt ("Ingresá tu costo por hora")
            console.log ("El costo ingresado es: " + "$" +  ingresoCosto + ", para el proyecto: " + nomProyecto);
            break;

        //NO conoce el costo por hora = cálculo del costo
        case "2":
            let calculoCosto = parseInt (prompt ("Ingresá tu sueldo/honorarios pretendido MENSUAL aproximado tomando como referencia una jornada laboral de 8hs."));

            //Sueldo pretendido mensual / días laborables = costo diario
            let costoDiario = calculoCosto / 22;
            console.log ("El costo diario es: " + "$" + costoDiario);

            //Costo diario / jornada la boral estandar = costo por hora
            let costoHora = costoDiario / 8;
            console.log ("El costo por hora es: " + "$" +  costoHora + ", para el proyecto: " + nomProyecto);
            break;
    
        default:
            alert ("Opción no válida");
            break;
    }

//Condicional: selección de "ingresoCosto" o "costoHora"
/* function elegirVariable (costoIngr, costoCalc) {

    if (costoIngr !="") {
        console.log (costoIngr);
    } else console.log (costoCalc);

} 
console.log (elegirVariable (ingresoCosto, costoHora)); */


//Función constructora: proyecto
function proyecto (nombre, tiempoTrabajado, costoxHora, costoTotal) {
    this.nombre = nombre;
    this.tiempoTrabajado = tiempoTrabajado;
    this.costoxHora = costoxHora;
    this.costoTotal = costoTotal;
}

//Nuevos proyectos
const proyecto1 = new proyecto (nomProyecto, "10hs", "$500", "$1000")
console.log (proyecto1)

    //Agregar dato a nuevo proyecto
    let descripcion = "Esto es una descripción"
    proyecto1.descripcion = descripcion
    console.log (proyecto1)

const proyecto2 = [nomProyecto, "10hs", "$500", "$1000"]
console.log (proyecto2)

    //Agregar dato nuevo
    proyecto2.push (descripcion)