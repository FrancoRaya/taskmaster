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
            let ingresoCosto = prompt ("Ingresá tu costo por hora");
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


