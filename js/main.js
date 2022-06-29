//Cronómetro
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const sumar = document.getElementById("sumar");

let sec = 0;
let min = 0;
let hs = 0;



//Ingreso de datos
    //Nombre del proyecto
    const agregarProyecto = document.getElementById("agregarProyecto");
    const botonProyecto = document.getElementById("botonProyecto");
    const nomProyecto = document.getElementById("nomProyecto");

        //Agregar un nombre de proyecto nuevo
        botonProyecto.addEventListener ("click", () => {

            let proyectoAgr = document.createElement ("p");
            proyectoAgr.innerHTML = agregarProyecto.value;
            nomProyecto.append (proyectoAgr);
        });
    

    //Costo por hora
    const agregarCosto = document.getElementById('agregarCosto');
    const botonCosto = document.getElementById('botonCosto');
    const costoHora = document.getElementById('costoHora');

        //Agregar costo x hora nuevo
        botonCosto.addEventListener ("click", () => {

            let costoAgr = document.createElement ("p");
            costoAgr.innerHTML = "$" + agregarCosto.value;
            costoHora.append (costoAgr);

            //Costo por minuto de proyecto
            let costoMinuto = agregarCosto.value / 60;
            console.log(costoMinuto);

            let costoMinRed = Math.round(costoMinuto);
            console.log(costoMinRed);
        });



//Tiempo total proyecto
const totalHoras = document.querySelector("#totalHoras");

//Costo total proyecto
const costoTotal = document.querySelector("#costoTotal");

    //Cálculo e impresión
    botonCosto.addEventListener ("click", () => {

        let calcCostoTotal = totalHoras.innerHTML * agregarCosto.value;
        console.log(calcCostoTotal);

        let costoTotAgr = document.createElement ("p");
        costoTotAgr.innerHTML = "$" + calcCostoTotal;
        costoTotal.append (costoTotAgr);
    });





//Costo por hora calculado
const agregarSalario = document.getElementById('agregarSalario');
const botonSalario = document.getElementById('botonSalario');
const costoHoraCalculado = document.getElementById('costoHoraCalculado');

    //Cálculo
    botonSalario.addEventListener ("click", () => {
        
        //Sueldo pretendido mensual / días laborables = costo diario
        let costoDiario = agregarSalario.value / 22;
        console.log(costoDiario);

        //Costo diario / jornada la boral estandar = costo por hora
        let costoxHora = costoDiario / 8;
        console.log(costoxHora);
        
        let costoHoraRed = Math.round(costoxHora);
        console.log(costoHoraRed);

        costoHoraCalculado.innerText = "$" + costoHoraRed;
    });


//Almacenamiento de datos
function guardarProyecto () {
    localStorage.setItem ("Nombre proyecto", agregarProyecto.value);
};

function guardarCosto () {
    localStorage.setItem ("Costo x hora", agregarCosto.value);
};

    //Listeners
    botonProyecto.addEventListener ("click", guardarProyecto);
    botonCosto.addEventListener ("click", guardarCosto);

    //Recupero de datos
    let proyectoLS = JSON.stringify (localStorage.getItem ("Nombre proyecto"));

    function recuperarDatos () {
        if (proyectoLS) {
            //Aqui no sé como resolverlo
        }
    };



//Función constructora: proyecto
function proyecto (nombre, tiempoTrabajado, costoxHora, costoProyecto) {
    this.nombre = nombre;
    this.tiempoTrabajado = tiempoTrabajado;
    this.costoxHora = costoxHora;
    this.costoProyecto = costoProyecto;
};

//Nuevos proyectos
const proyecto1 = new proyecto ("Nombre del Proyecto", "10hs", "$500", "$1000");
console.log(proyecto1);

    //Agregar dato a nuevo proyecto
    let descripcion = "Esto es una descripción";
    proyecto1.descripcion = descripcion;
    console.log(proyecto1);

const proyecto2 = ["Nombre del Proyecto", "10hs", "$500", "$1000"];
console.log(proyecto2);

    //Agregar dato nuevo
    proyecto2.push (descripcion);
