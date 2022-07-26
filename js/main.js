//Función se ejecuta al cargar la pág.
window.onload = () => {
    btnXAparece ();
}

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
        stopwatch.textContent = '00:00:00';
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
        let hs = parseInt(display_hours);

        //Si los campos no están vacíos, entonces, calcúlo.
        if (totalHs.innerText !="" && totalMin.innerText !="" && totalSeg.innerText !="") {
            //Parseo los datos de DOM
            let hsDOM = parseInt(totalHs.innerText);
            let segDOM = parseInt(totalSeg.innerText);
            let minDOM = parseInt(totalMin.innerText);

            //Sumo
            let totHs = hs + hsDOM;
            let totMin = min + minDOM;
            let totSeg = seg + segDOM;


/*             if (totSeg >= 60) {
                totSeg = 0;
                totMin++;
                if (totMin >= 60) {
                    totMin = 0;
                    totHs++
                }
            } */

            //Paso todo al DOM
            totalHs.innerText = totHs;
            totalMin.innerText = totMin;
            totalSeg.innerText = totSeg;

        //De lo contrario, si los campos están vacíos, entonces imprimo los valores del cronómetro
        } else {
            totalHs.innerText = hs;
            totalMin.innerText = min;
            totalSeg.innerText = seg;
        }

        localStorage.setItem ("Tiempo invertido (hs)", totalHs.innerText);
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

            //Agrego el nombre
            nomProyecto.innerText = agregarProyecto.value;

            //Código a futuro cuando para agregar más de un proyecto
/*             let proyectoAgr = document.createElement ("p");
            proyectoAgr.innerHTML = agregarProyecto.value;
            nomProyecto.append (proyectoAgr); */

            //Nombre almacenado
            localStorage.setItem ("Nombre proyecto", agregarProyecto.value);

            //Si hace click sin agregar nada
            agregarProyecto.value === "" && Swal.fire('Tenés que agregar un proyecto');

            //El input se limpia
            agregarProyecto.value = "";

            btnXAparece ();
        });


    //Costo por hora
    const agregarCosto = document.getElementById("agregarCosto");
    const botonCosto = document.getElementById("botonCosto");
    const costoHora = document.getElementById("costoHora");

    let costoMin;
    let costoSeg;

        //Agregar costo x hora y cálculo
        botonCosto.addEventListener ("click", () => {

            //Agrego costo x hora
            costoHora.innerText = "$" + agregarCosto.value;

            //Código a futuro cuando para agregar más de un proyecto
/*             let costoAgr = document.createElement ("p");
            costoAgr.innerHTML = "$" + agregarCosto.value;
            costoHora.append (costoAgr); */

            //Costo por minuto
            costoMin = agregarCosto.value / 60;

            //Costo por segundo 
            costoSeg = costoMin / 60;

            //Costo almacenado
            localStorage.setItem("Costo x hora", agregarCosto.value);
            localStorage.setItem("Costo x min", costoMin);
            localStorage.setItem("Costo x seg", costoSeg);

            //Si hace click sin agregar nada
            agregarCosto.value === "" && Swal.fire('Tenés que agregar tu costo por hora');

            //El input se limpia
            agregarCosto.value = "";

            btnXAparece ();
        });



//Recuperar datos del proyecto
let nomProyectoLS = localStorage.getItem("Nombre proyecto");
let tiempoInvHsLS = JSON.parse(localStorage.getItem("Tiempo invertido (hs)"));
let tiempoInvMinLS = JSON.parse(localStorage.getItem("Tiempo invertido (min)"));
let tiempoInvSegLS = JSON.parse(localStorage.getItem("Tiempo invertido (seg)")); 
let costoHoraLS = JSON.parse(localStorage.getItem("Costo x hora"));
let costoMinLS = JSON.parse(localStorage.getItem("Costo x min"));
let costoSegLS = JSON.parse(localStorage.getItem("Costo x seg"));

    //Pasando los datos al DOM
    function datosDOM (datoGuardado, insertarText) {
        if (datoGuardado == null) {
            insertarText = [];
        } 
        else {
            if (datoGuardado == costoHoraLS) {
                insertarText.append ("$" + datoGuardado);
            } else {
                insertarText.append (datoGuardado);
            }

        }
    };

    datosDOM (nomProyectoLS, nomProyecto);
    datosDOM (costoHoraLS, costoHora);

    //Pasando dato "tiempo invertido" al DOM
    if (tiempoInvHsLS != null && tiempoInvMinLS != null && tiempoInvSegLS != null) {
        totalHs.innerText = tiempoInvHsLS;
        totalMin.innerText = tiempoInvMinLS;
        totalSeg.innerText = tiempoInvSegLS;
    } else {
        totalHs.innerText,
        totalMin.innerText, 
        totalSeg.innerText = [];
    }



//Costo total proyecto
const costoTotal = document.getElementById("costoTotal");

    function calcCostoTot() {
        let calcSeg;
        let calcMin;
        let calcHs;
        let calcTot;
        let calcTotRed;

        // Calcúlo el costo total dependiendo de la fuente
        if (costoHoraLS != null && costoMinLS != null && costoSegLS != null) {
            calcHs = totalHs.innerText * costoHoraLS;
            calcMin = totalMin.innerText * costoMinLS;
            calcSeg = totalSeg.innerText * costoSegLS;

            //Cálculo total y paso al DOM
            calcTot = calcHs + calcSeg + calcMin;
            calcTotRed = Math.round (calcTot);

            costoTotal.innerText = "$" + calcTotRed;

        } else {
            calcHs = totalHs.innerText * agregarCosto.value;
            calcMin = totalMin.innerText * costoMin;
            calcSeg = totalSeg.innerText * costoSeg;

            //Cálculo total y paso al DOM
            calcTot = calcHs + calcSeg + calcMin;
            calcTotRed = Math.round (calcTot);

            costoTotal.innerText = "$" + calcTotRed;
        }
    }




//Limpiar campos
const botonLimpiar = document.getElementById("botonLimpiar");

    //Botón "x" aparece
    function btnXAparece () {
        if (nomProyecto.innerText != "" || totalSeg.innerText != "" || costoHora.innerText != "" || costoTotal.innerText != "") {
            botonLimpiar.style.visibility="visible";
        }
    }

    //Función limpiar
    botonLimpiar.addEventListener ("click", () => {
        nomProyecto.innerText = "";
        totalHs.innerText = "";
        totalMin.innerText = "";
        totalSeg.innerText = "";
        costoHora.innerText = "";
        costoTotal.innerText = "";
        localStorage.clear();
    });




//Costo por hora calculado
const agregarSalario = document.getElementById("agregarSalario");
const botonSalario = document.getElementById("botonSalario");
const costoHsResult = document.getElementById("costoHsResult");
const costoHsCalc = document.getElementById("costoHsCalc");

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

        //Muestro el resultado
        costoHsCalc.style.visibility="visible";
        costoHsResult.innerText ="$" + costoHoraRed;

        //Si hace click sin agregar nada
        agregarSalario.value === "" && Swal.fire('Tenés que agregar tu sueldo pretendido');

        //Limpiando campo
        agregarSalario.value = "";
    });





