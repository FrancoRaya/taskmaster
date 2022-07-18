//Cronómetro
const stopwatch = document.getElementById("stopwatch");
const playPauseButton = document.getElementById("play-pause");
const sumarTiempo = document.getElementById("sumarTiempo");

let stopwatchInterval;
let runningTime = 0;
let marca = [];

    //Iniciar-pausar
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

    //Pausar
    const pause = () => {
        clearInterval(stopwatchInterval);
    }

    //Parar
    const stop = () => {
        playPauseButton.classList.remove('running');
        runningTime = 0;
        clearInterval(stopwatchInterval);
        stopwatch.textContent = '00:00';
    }

    //Iniciar
    const start = () => {
        let startTime = Date.now() - runningTime;

        stopwatchInterval = setInterval( () => {
            runningTime = Date.now() - startTime;
            stopwatch.textContent = calculateTime(runningTime);
        }, 1000);
    };

    //Cálculo del tiempo
    const calculateTime = runningTime => {
        const total_seconds = Math.floor(runningTime / 1000);
        const total_minutes = Math.floor(total_seconds / 60);

        const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
        const display_minutes = total_minutes.toString().padStart(2, "0");

        return `${display_minutes}:${display_seconds}`;
    };

    // Sumar tiempo al proyecto
    const totalHoras = document.getElementById("totalHoras");

    sumarTiempo.addEventListener ("click", () => {
        let tiempoAct = stopwatch.innerHTML;
        totalHoras.innerText = tiempoAct;

        //Guardo el tiempo en el local storage
        localStorage.setItem ("Tiempo invertido", tiempoAct);

        //Llamo a la función que multiplica el tiempo x el costo por hora
        calcCostoTot();
    });


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

            //Nombre almacenado
            localStorage.setItem ("Nombre proyecto", agregarProyecto.value);

            //Si hace click sin agregar nada
            agregarProyecto.value === "" && Swal.fire('Tenés que agregar un proyecto');
        });


    //Costo por hora
    const agregarCosto = document.getElementById("agregarCosto");
    const botonCosto = document.getElementById("botonCosto");
    const costoHora = document.getElementById("costoHora");

        //Agregar costo x hora nuevo
        botonCosto.addEventListener ("click", () => {

            let costoAgr = document.createElement ("p");
            costoAgr.innerHTML = "$" + agregarCosto.value;
            costoHora.append (costoAgr);

            //Costo almacenado
            localStorage.setItem ("Costo x hora", agregarCosto.value);

            //Costo por minuto de proyecto
            let costoMinuto = agregarCosto.value / 60;
            let costoMinRed = Math.round(costoMinuto);
            console.log(costoMinRed);

            //Si hace click sin agregar nada
            agregarCosto.value === "" && Swal.fire('Tenés que agregar tu costo por hora');
        });


//Costo total proyecto
const costoTotal = document.getElementById("costoTotal");

    function calcCostoTot() {
        let calTot = totalHoras.innerHTML * agregarCosto.value;
        console.log(calTot);

        let costoTotAgr = document.createElement ("p");
        costoTotAgr.innerHTML = "$" + calTot;
        costoTotal.append (costoTotAgr);
    }



//Recuperar datos del proyecto
let nomProyectoLS = localStorage.getItem("Nombre proyecto");
let costoHoraLS = localStorage.getItem("Costo x hora");
let tiempoInvertidoLS = localStorage.getItem("Tiempo invertido");

    //Pasando los datos al DOM
    function datosDOM (datoGuardado, insertarText) {
        if (datoGuardado == null) {
            insertarText = [];
        } else insertarText.append (datoGuardado);
    };

    datosDOM (nomProyectoLS, nomProyecto);
    datosDOM (costoHoraLS, costoHora);
    datosDOM (tiempoInvertidoLS, totalHoras);



//Costo por hora calculado
const agregarSalario = document.getElementById("agregarSalario");
const botonSalario = document.getElementById("botonSalario");
const costoHoraCalculado = document.getElementById("costoHoraCalculado");

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

        //Si hace click sin agregar nada
        agregarSalario.value === "" && Swal.fire('Tenés que agregar tu sueldo pretendido');
    });





