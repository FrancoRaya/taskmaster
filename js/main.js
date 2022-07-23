//Cronómetro
const stopwatch = document.getElementById("stopwatch");
const playPauseButton = document.getElementById("play-pause");
const tiempoParcial = document.getElementById("tiempoParcial");

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
                sumarTiempo();
                stop ();
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
    let display_seconds
    let display_minutes

    const calculateTime = runningTime => {
        const total_seconds = Math.floor(runningTime / 1000);
        const total_minutes = Math.floor(total_seconds / 60);
        const total_hours = Math.floor(total_minutes / 60);

        display_seconds = (total_seconds % 60).toString().padStart(2, "0");
        display_minutes = (total_minutes % 60).toString().padStart(2, "0");
        display_hours = total_hours.toString().padStart(2, "0");

        return `${display_hours}:${display_minutes}:${display_seconds}`;
    };

    // Sumar tiempo al proyecto
    const totalHs = document.getElementById("totalHs");
    const totalMin = document.getElementById("totalMin");
    const totalSeg = document.getElementById("totalSeg");

    //Función
    function sumarTiempo () {
        //Al darle "click" parseo los valores del cronómetro para poder sumar y pregunto...
        let seg = parseInt(display_seconds);
        let min = parseInt(display_minutes);

        //Si los campos no están vacíos, entonces, calcúlo.
        if (totalMin.innerText != "" && totalSeg.innerText != "") {
            //Parseo los datos de DOM
            let segDOM = parseInt(totalSeg.innerText);
            let minDOM = parseInt(totalMin.innerText);

            //Sumo
            let totMin = min + minDOM;
            let totSeg = seg + segDOM;

            //Paso todo al DOM
            totalMin.innerText = totMin;
            totalSeg.innerText = totSeg;

        //De lo contrario, si los campos están vacíos, entonces imprimo los valores del cronómetro
        } else {
            totalMin.innerText = min;
            totalSeg.innerText = seg;
        }

        localStorage.setItem ("Tiempo invertido (min)", totalMin.innerText);
        localStorage.setItem ("Tiempo invertido (seg)", totalSeg.innerText);

        calcCostoTot();
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

            //Nombre almacenado
            localStorage.setItem ("Nombre proyecto", agregarProyecto.value);

            //Si hace click sin agregar nada
            agregarProyecto.value === "" && Swal.fire('Tenés que agregar un proyecto');
        });


    //Costo por hora
    const agregarCosto = document.getElementById("agregarCosto");
    const botonCosto = document.getElementById("botonCosto");
    const costoHora = document.getElementById("costoHora");

    let costoMin;
    let costoSeg;

        //Agregar costo x hora y cálculo
        botonCosto.addEventListener ("click", () => {

            let costoAgr = document.createElement ("p");
            costoAgr.innerHTML = "$" + agregarCosto.value;
            costoHora.append (costoAgr);

            //Costo almacenado
            localStorage.setItem ("Costo x hora", agregarCosto.value);

            //Costo por minuto
            costoMin = agregarCosto.value / 60;

            //Costo por segundo 
            costoSeg = costoMin / 60;

            //Si hace click sin agregar nada
            agregarCosto.value === "" && Swal.fire('Tenés que agregar tu costo por hora');
        });


//Costo total proyecto
const costoTotal = document.getElementById("costoTotal");

    function calcCostoTot() {
        let calcSeg;
        let calcMin;
        // Calculo del costo total dependiendo de la fuente
        if (costoSeg != "" && costoMin != "") {
            //Si el costo por hora es calculado dentro de la sesión
            calcSeg = parseInt(totalSeg.innerText) * costoSeg;
            calcMin = parseInt(totalMin.innerText) * costoMin;
        } else {
            //De lo contrario, extraerá el dato del local storage y hará el cálculo
            let calcCostMin = costoHoraLS / 60;
            let calcCostSeg = calcCostMin / 60;

            calcSeg = parseInt(totalSeg.innerText) * calcCostSeg;
            calcMin = parseInt(totalMin.innerText) * calcCostMin;
        }

/*         let calcHor = (falta valor "hora")  * agregarCosto.value; */
        //Cálculo total y paso al DOM
        let calcTot = calcSeg + calcMin;
        let calcTotRed = Math.round (calcTot);

        costoTotal.innerText = "$" + calcTotRed;
    }


    
    

//Recuperar datos del proyecto
let nomProyectoLS = localStorage.getItem("Nombre proyecto");
let tiempoInvMinLS = localStorage.getItem("Tiempo invertido (min)");
let tiempoInvSegLS = localStorage.getItem("Tiempo invertido (seg)"); 
let costoHoraLS = localStorage.getItem("Costo x hora");

    //Pasando los datos al DOM
    function datosDOM (datoGuardado, insertarText) {
        if (datoGuardado == null) {
            insertarText = [];
        } else {
            insertarText.append (datoGuardado);
        }
    };

    datosDOM (nomProyectoLS, nomProyecto);
    datosDOM (costoHoraLS, costoHora);

    //Pasando dato "tiempo invertido" al DOM
    if (tiempoInvMinLS != null && tiempoInvSegLS != null) {
        totalMin.innerText = tiempoInvMinLS;
        totalSeg.innerText = tiempoInvSegLS;
    } else {
        totalMin.innerText, 
        totalSeg.innerText = [];
    }



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





