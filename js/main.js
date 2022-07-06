//Cronómetro
const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const sumarTiempo = document.getElementById('sumarTiempo');

let stopwatchInterval;
let runningTime = 0;

const playPause = () => {
    const isPaused = !playPauseButton.classList.contains('running');
    if (isPaused) {
        playPauseButton.classList.add('running');
        start();
    } else {
        playPauseButton.classList.remove('running');
        pause();
    }
}

const pause = () => {
    clearInterval(stopwatchInterval);
}

const stop = () => {
    playPauseButton.classList.remove('running');
    runningTime = 0;
    clearInterval(stopwatchInterval);
    stopwatch.textContent = '00:00';
}

const start = () => {
    let startTime = Date.now() - runningTime;

    stopwatchInterval = setInterval( () => {
        runningTime = Date.now() - startTime;
        stopwatch.textContent = calculateTime(runningTime);
    }, 1000)
}

const calculateTime = runningTime => {
    const total_seconds = Math.floor(runningTime / 1000);
    const total_minutes = Math.floor(total_seconds / 60);

    const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
    const display_minutes = total_minutes.toString().padStart(2, "0");

    return `${display_minutes}:${display_seconds}`
}



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

            //Si hace click sin agregar nada
            agregarProyecto.value === "" && Swal.fire('Tenés que agregar un proyecto');
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

            agregarCosto.value === "" && Swal.fire('Tenés que agregar tu costo por hora');
        });



//Tiempo total proyecto
const totalHoras = document.querySelector("#totalHoras");

//Costo total proyecto
const costoTotal = document.querySelector("#costoTotal");

    //Cálculo
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
    let proyectoLS = localStorage.getItem ("Nombre proyecto");
    console.log(proyectoLS)

    function recuperarDatos () {
        if (proyectoLS) {
            let recProyecto = document.createElement("p");
            recProyecto.innerHTML = proyectoLS;
            nomProyecto.append (recProyecto);
        } 
    };


//Desestructuración
let proyectoUser = {
    nombreProyecto: agregarProyecto.value,
    costoHoraProyecto: agregarCosto.value,
};

let {nombreProyecto, costoHoraProyecto} = proyectoUser;

console.log(nomProyecto);

//Spread
let proyectoUser1 = {
    ...proyectoUser,
    costoTotalProyecto: costoTotal.value
}

console.log(proyectoUser1);
